Build a single-file browser-based blackjack game.
Deliver the complete application as one self-contained .html file. Use only vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no external dependencies except a Google Font loaded via CDN link tag if desired. No image assets; represent cards entirely in HTML/CSS using Unicode suit symbols (♠ ♥ ♦ ♣) and styled card elements.

Game rules — implement all of the following exactly:
* 6-deck shoe; reshuffle when approximately 75% of cards have been dealt
* Dealer hits on soft 17
* Blackjack pays 3:2; push on tied blackjack
* Player may double down on any first two cards
* Player may double after split (DAS)
* Player may split up to 3 times, creating up to 4 hands
* Split aces receive exactly one card each; no resplit of aces
* Late surrender available before any other action (except when dealer shows ace and has checked for blackjack)
* Insurance offered when dealer shows ace (pays 2:1)
* Dealer peeks for blackjack when showing ace or ten-value card; round ends immediately if dealer has blackjack (player blackjack results in push)

Player economy:
* Starting balance: $1,000
* Minimum bet: $10
* Maximum bet: $500
* Provide a chip UI for common denominations ($10, $25, $50, $100) plus a manual input field
* Display current balance, current bet, and net session profit/loss at all times
* On bust, natural blackjack, or win/loss/push — briefly animate or visually highlight the result before clearing the hand

Basic strategy hint system — this is important:
Implement a complete basic strategy lookup for a 6-deck, dealer-hits-soft-17, DAS, late-surrender ruleset. The strategy must cover hard totals, soft totals, and pairs.
* Add a "Hint" button visible during the player's turn. When clicked, display the correct basic strategy action for the current hand vs. the dealer's upcard (e.g. "Basic strategy: Double Down"). Do not auto-show the hint — it must be player-requested.
* Deviation warning: If the player clicks an action button (Hit, Stand, Double, Split, Surrender) that differs from the basic strategy recommendation, immediately show a non-blocking warning (a dismissible banner or modal is fine) that names both the action taken and what basic strategy recommends, before the action executes. The player can dismiss and proceed — this is educational, not a blocker.
* The deviation warning should only fire when the player has not already requested a hint for that decision (no need to warn twice).

Visual design:
* Dark casino aesthetic: deep green felt background, dark navy or charcoal UI chrome, gold or cream accent colors for text and borders
* Cards should look like real cards: white face, red for hearts/diamonds, black for spades/clubs, clear rank and suit, rounded corners
* Dealer's hole card face-down until dealer's turn; use a card-back design in CSS (dark pattern or solid color, no image)
* Action buttons (Hit, Stand, Double, Split, Surrender, Insurance) should only be visible and enabled when that action is legally available for the current state
* Clean readable layout: dealer area top, player area bottom, bet/balance panel clearly visible, action buttons grouped logically
* Works at 1280px desktop width minimum; does not need to be mobile-optimized

Code quality expectations:
* Organize code into clearly named functions — game state management, deck/shoe logic, basic strategy lookup, UI rendering, and event handling should be meaningfully separated
* Use comments to delineate major sections
* All game state should live in a single plain JS object or a small set of clearly named variables — avoid tangled globals
* The basic strategy table should be represented as a data structure (object or array), not buried in conditional logic

Nice to have (implement if it fits cleanly, skip if it clutters):
* Running count display (Hi-Lo) as a toggle the player can turn on — useful for learning purposes
* A small "last hand" summary in the corner showing what happened
* Keyboard shortcuts: H = hit, S = stand, D = double, P = split, Q = surrender

Do not include:
* Any backend, server calls, or localStorage persistence
* Sound effects or external media
* Multiplayer or side bets beyond insurance
* A tutorial walkthrough or lengthy onboarding — the hint system covers education

This is a self-contained deliverable. Output the complete .html file with no placeholders, no "add your logic here" stubs, and no incomplete sections. The game should be fully playable from the first load.