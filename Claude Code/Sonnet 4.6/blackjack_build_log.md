# Blackjack Game — Build Log

**Model:** Claude Sonnet 4.6  
**Date:** May 10, 2026  
**Output file:** `blackjack.html`  
**Output size:** 1,383 lines · 46,947 bytes (~46 KB)

---

## Prompt

> Build a single-file browser-based blackjack game.
> Deliver the complete application as one self-contained .html file. Use only vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no external dependencies except a Google Font loaded via CDN link tag if desired. No image assets; represent cards entirely in HTML/CSS using Unicode suit symbols (♠ ♥ ♦ ♣) and styled card elements.
>
> **Game rules — implement all of the following exactly:**
> * 6-deck shoe; reshuffle when approximately 75% of cards have been dealt
> * Dealer hits on soft 17
> * Blackjack pays 3:2; push on tied blackjack
> * Player may double down on any first two cards
> * Player may double after split (DAS)
> * Player may split up to 3 times, creating up to 4 hands
> * Split aces receive exactly one card each; no resplit of aces
> * Late surrender available before any other action (except when dealer shows ace and has checked for blackjack)
> * Insurance offered when dealer shows ace (pays 2:1)
> * Dealer peeks for blackjack when showing ace or ten-value card; round ends immediately if dealer has blackjack (player blackjack results in push)
>
> **Player economy:**
> * Starting balance: $1,000
> * Minimum bet: $10
> * Maximum bet: $500
> * Provide a chip UI for common denominations ($10, $25, $50, $100) plus a manual input field
> * Display current balance, current bet, and net session profit/loss at all times
> * On bust, natural blackjack, or win/loss/push — briefly animate or visually highlight the result before clearing the hand
>
> **Basic strategy hint system — this is important:**
> Implement a complete basic strategy lookup for a 6-deck, dealer-hits-soft-17, DAS, late-surrender ruleset. The strategy must cover hard totals, soft totals, and pairs.
> * Add a "Hint" button visible during the player's turn. When clicked, display the correct basic strategy action for the current hand vs. the dealer's upcard (e.g. "Basic strategy: Double Down"). Do not auto-show the hint — it must be player-requested.
> * Deviation warning: If the player clicks an action button (Hit, Stand, Double, Split, Surrender) that differs from the basic strategy recommendation, immediately show a non-blocking warning (a dismissible banner or modal is fine) that names both the action taken and what basic strategy recommends, before the action executes. The player can dismiss and proceed — this is educational, not a blocker.
> * The deviation warning should only fire when the player has not already requested a hint for that decision (no need to warn twice).
>
> **Visual design:**
> * Dark casino aesthetic: deep green felt background, dark navy or charcoal UI chrome, gold or cream accent colors for text and borders
> * Cards should look like real cards: white face, red for hearts/diamonds, black for spades/clubs, clear rank and suit, rounded corners
> * Dealer's hole card face-down until dealer's turn; use a card-back design in CSS (dark pattern or solid color, no image)
> * Action buttons (Hit, Stand, Double, Split, Surrender, Insurance) should only be visible and enabled when that action is legally available for the current state
> * Clean readable layout: dealer area top, player area bottom, bet/balance panel clearly visible, action buttons grouped logically
> * Works at 1280px desktop width minimum; does not need to be mobile-optimized
>
> **Code quality expectations:**
> * Organize code into clearly named functions — game state management, deck/shoe logic, basic strategy lookup, UI rendering, and event handling should be meaningfully separated
> * Use comments to delineate major sections
> * All game state should live in a single plain JS object or a small set of clearly named variables — avoid tangled globals
> * The basic strategy table should be represented as a data structure (object or array), not buried in conditional logic
>
> **Nice to have (implement if it fits cleanly, skip if it clutters):**
> * Running count display (Hi-Lo) as a toggle the player can turn on — useful for learning purposes
> * A small "last hand" summary in the corner showing what happened
> * Keyboard shortcuts: H = hit, S = stand, D = double, P = split, Q = surrender
>
> **Do not include:**
> * Any backend, server calls, or localStorage persistence
> * Sound effects or external media
> * Multiplayer or side bets beyond insurance
> * A tutorial walkthrough or lengthy onboarding — the hint system covers education
>
> This is a self-contained deliverable. Output the complete .html file with no placeholders, no "add your logic here" stubs, and no incomplete sections. The game should be fully playable from the first load.

---

## Execution Time

**Approximate total time:** ~3–4 minutes (single-turn generation, no iteration)

The entire game was produced in one response with no follow-up corrections required. The model spent planning time internally before writing the file.

---

## Steps Taken

### 1. Requirements Analysis
Parsed all game rules, economy rules, BS hint system requirements, visual design constraints, and code quality expectations before writing a single line. Identified key implementation challenges:
- Split hand state management (up to 4 concurrent hands)
- Basic strategy compound action codes (`D`, `Ds`, `Ph`, `Rp`, `Rs`, etc.)
- Deviation warning timing (before execution, suppress if hint already shown)
- Insurance → peek → player turn flow ordering
- Surrender availability rule (blocked when dealer shows Ace, per spec)

### 2. Basic Strategy Table Design
Constructed three lookup tables as plain JS objects, each indexed `[0..9]` for dealer upcards 2–A:

| Table | Coverage | Rows |
|---|---|---|
| `BS_PAIR` | All 10 pair types (2–9, 10-value, Ace) | 10 |
| `BS_SOFT` | Soft 13 through Soft 20 (A,2 through A,9) | 8 |
| `BS_HARD` | Hard 4 through Hard 21 | 18 |

Compound action codes implemented with a `resolveBS()` function that maps raw codes to concrete actions given what's currently available (e.g., `D` → `'double'` if doubling is allowed, else `'hit'`).

Notable ruleset-specific entries:
- Hard 11 vs Ace: **Double** (H17 rule; S17 would be Hit)
- Hard 17 vs Ace: **Rs** (Surrender or Stand; H17 rule)
- Hard 16 vs 9/10/A: **R** (Surrender or Hit)
- Hard 15 vs 10/A: **R** (Surrender or Hit)
- 8,8 vs Ace: **Rp** (Surrender or Split — resolves to Split since surrender blocked vs Ace)
- Soft 18 (A,7) vs 2: **Ds** (Double or Stand)

### 3. Game State Architecture
Single `G` object holds all mutable state:

```
G = {
  shoe, dealtCt, runCount,       // shoe management
  phase,                          // bet | ins | play | dealer | done
  dCards, dealerBJ, holeUp,      // dealer state
  hands[], hIdx,                  // player hands & active index
  stagedBet, roundBet, insBet,   // bets
  balance, sessionStart,          // economy
  hintShown, showCount,           // UI toggles
  pending,                        // queued action for deviation modal
  lastSummary,                    // last hand result text
}
```

Each player hand object:
```
{ cards, bet, status, fromSplit, fromAce, doubled, acted, result, anim }
```

### 4. Game Flow Implementation
Mapped the full round lifecycle:

```
newRound()
  ├─ dealer shows A  →  phase: 'ins'  →  handleIns()
  │     ├─ dealer has BJ  →  resolveDealerBJ()
  │     └─ no BJ         →  afterInsResolvedNoBJ()  [surrender blocked]
  ├─ dealer shows 10 →  peek
  │     ├─ dealer has BJ  →  resolveDealerBJ()
  │     └─ no BJ         →  afterPeekNoBJ()
  └─ dealer shows 2–9  →  afterPeekNoBJ()  [no peek needed]

afterPeekNoBJ()
  ├─ player has natural BJ  →  settle()  →  phase: 'done'
  └─ otherwise             →  phase: 'play'

phase: 'play'  →  tryAction(action)
  ├─ check availability
  ├─ check deviation (if hint not shown)  →  modal if deviating
  └─ doAction()  →  doHit | doStand | doDouble | doSplit | doSurrender
       └─ nextHand()
            ├─ auto-complete ace-split hands and 21s
            └─ all done  →  startDealerTurn()

startDealerTurn()  →  dealerStep() [recursive, 580ms delay]
  └─ endRound()  →  settle()  →  setAnims()  →  phase: 'done'
```

### 5. Split Hand Logic
Splitting creates a new hand object inserted immediately after the current hand index (`splice(hIdx + 1, 0, newHand)`). Both split hands receive their second card at split time (common casino convention). `nextHand()` iterates left-to-right, auto-standing ace-split hands and any hand that reaches 21 immediately.

Guard conditions:
- `fromAce = true` → blocks Hit, Double, Split, and Surrender on that hand
- `fromSplit = true` → blocks Surrender
- `nSpl = G.hands.length - 1 >= MAX_SPLITS` → blocks further splits

### 6. Deviation Warning System
- `tryAction(action)` calls `getBSRec(hIdx)` to get the resolved BS recommendation
- If `bs.resolved !== action` AND `G.hintShown === false`: store `G.pending = action`, show modal
- Modal buttons: **Reconsider** (clears pending, player chooses again) or **Proceed Anyway** (executes pending action)
- `G.hintShown` resets to `false` on every new decision point (new hand, after hit, after split advance)
- Keyboard shortcuts check `dev-ov.classList.contains('open')` to block input while modal is visible

### 7. CSS & Visual Design
- CSS custom properties (`--felt`, `--chrome`, `--gold`, `--cream`, `--red`) for the color system
- Felt: `#1a5c35` / `#123d24` (two-tone depth)
- Chrome: `#131820` / `#1b2232` / `#212d40`
- Card face: white `#fff`, red suits `#c8000a`, black suits `#111`, rounded corners, `box-shadow`
- Card back: repeating diagonal CSS gradient (`135deg`, `#0d2d6e` / `#1848a0`) with an inset border overlay via `::after`
- Result animations: `@keyframes fw/fl/fp/fb` (win/lose/push/blackjack) applied as CSS classes to `.hbox`
- Chip buttons: colored circles with matching border rings ($10=blue, $25=green, $50=red, $100=purple)
- Google Fonts: Playfair Display (header) + Inter (UI)

### 8. Hi-Lo Count
`countCard(card)` increments `G.runCount` using the `HI_LO` lookup table (`+1` for 2–6, `0` for 7–9, `−1` for 10-value and Ace). Hole card is counted at reveal time, not at draw time, matching real-play visibility. True count = `runCount / decksRemaining`, displayed when toggled on.

---

## Output Summary

| Feature | Status |
|---|---|
| 6-deck shoe, 75% reshuffle | ✅ |
| Dealer hits soft 17 | ✅ |
| Blackjack pays 3:2 | ✅ |
| Double on any first 2 cards | ✅ |
| Double after split (DAS) | ✅ |
| Up to 3 splits / 4 hands | ✅ |
| Split aces: 1 card, no resplit | ✅ |
| Late surrender (blocked vs Ace) | ✅ |
| Insurance 2:1 | ✅ |
| Dealer peeks for blackjack | ✅ |
| $10–$500 bets, $1,000 start | ✅ |
| Chip UI ($10/$25/$50/$100) | ✅ |
| Custom bet input | ✅ |
| Balance / Bet / P/L display | ✅ |
| Result flash animations | ✅ |
| Complete BS tables (pairs, soft, hard) | ✅ |
| Hint button (player-requested) | ✅ |
| Deviation warning modal | ✅ |
| Hi-Lo running + true count toggle | ✅ |
| Last hand summary | ✅ |
| Keyboard shortcuts H/S/D/P/Q | ✅ |
| Dark casino aesthetic | ✅ |
| CSS card-back design (no images) | ✅ |
| Single-file, no dependencies | ✅ |
| No placeholders or stubs | ✅ |

**Functions defined:** 48  
**Lines of code:** 1,383  
**File size:** ~46 KB  
**Iterations required:** 1 (single-shot generation)
