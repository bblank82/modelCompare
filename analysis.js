const codeAnalysis = {
  "ag_gpt_oss": {
    rating: 4,
    verdict: "Minimal but Functional",
    lines: 767,
    cssApproach: "Minimal inline, basic reset. Brown/gold chip theme, flat card-back.",
    jsArchitecture: "Single `state` object. Clear section comments. Procedural flow with addEventListener wiring.",
    strategyTable: "Object-of-objects (hard/soft/pairs). Missing surrender entries entirely — strategy table only has H/S/D/P codes with no R/Rs.",
    strengths: [
      "Compact and easy to read at ~767 lines",
      "Clean Fisher-Yates shuffle and Hi-Lo count tracking",
      "Correct 75% reshuffle threshold on 6-deck shoe",
      "Deviation warning fires before action executes"
    ],
    weaknesses: [
      "No surrender entries in the basic strategy table — a significant spec omission for an H17/LS ruleset",
      "Hard 11 vs Ace says 'H' instead of 'D' (H17-specific error)",
      "Soft 18 vs 2 says 'S' — should be 'Ds' (Double or Stand) under H17",
      "Insurance logic deducts a full bet instead of half bet",
      "Deviation warning fires AND the action executes immediately — should block until dismissed",
      "CSS typo: `justify-center: center` instead of `justify-content: center`",
      "Card-back design is just a dark square — no pattern",
      "No visual result animation beyond a brief flash on the section element",
      "Only renders the current hand — no multi-hand display for splits",
      "Surrender is gated by `!state.hintRequested` instead of checking first-action"
    ],
    codeQuality: "Readable but has correctness issues. The strategy table omissions and insurance math bugs would produce incorrect gameplay. The smallest file by far, which comes at the cost of missing features.",
    visualDesign: "Spartan. Dark green background with brown buttons. Cards are functional but plain. Lacks the premium polish requested in the spec."
  },

  "ag_gemini_31_low": {
    rating: 7,
    verdict: "Solid Implementation with Good Architecture",
    lines: 1008,
    cssApproach: "CSS custom properties. Playfair Display + Inter fonts. Radial gradient felt, gold accents. Card overlap via negative margins. Patterned card-back.",
    jsArchitecture: "Single `state` object with clear stage machine (betting/insurance/playerTurn/dealerTurn/roundEnd). Dedicated functions per concern.",
    strategyTable: "Array-indexed (0-9 for dealer upcards 2-A). Complete H/S/D/P/Q coverage including surrender. Fallback logic for when double/surrender is unavailable.",
    strengths: [
      "Most complete and accurate basic strategy table of the Antigravity group — includes 8,8 vs A surrender",
      "Deviation modal is properly blocking — uses a 'Proceed Anyway' / 'Go Back' flow that pauses the action",
      "Sophisticated fallback logic: if BS says double but can't, correctly falls back to hit or stand based on context",
      "Animated dealer turn with 500ms delays for visual drama",
      "Running count AND true count displayed",
      "Cards-left counter visible on the felt",
      "Insurance bet is correctly half the current bet",
      "Proper ace-split handling: one card each, auto-stand"
    ],
    weaknesses: [
      "Soft 19 vs 6 shows 'D' — should be 'Ds' (Double or Stand, not Double or Hit)",
      "CSS `gap: -60px` is invalid; card overlap relies on `margin-right: -60px` as fallback, but the gap rule could cause issues in some browsers",
      "The `hintRequestedForCurrentAction` flag is reset at the start of every `playerAction()` call, meaning the deviation check can never be suppressed by a prior hint",
      "No result animation on individual cards — only a large banner overlay",
      "Deal button doesn't validate minimum $10 bet on first click if default is already 10"
    ],
    codeQuality: "Well-structured with clean separation. The stage machine pattern is robust. Strategy fallback handling shows deeper understanding of the game rules than most implementations.",
    visualDesign: "Attractive casino aesthetic. The radial gradient felt, patterned card-back, and gold accents create a genuinely premium feel. Result banner is large and dramatic."
  },

  "ag_gemini_31_high": {
    rating: 6,
    verdict: "Feature-Rich but Non-Functional",
    lines: 1081,
    cssApproach: "CSS custom properties with extensive theming. Radial gradient felt. Active hand pulse animation with dashed gold border. Card-back uses green repeating gradient.",
    jsArchitecture: "Single `gameState` object. Uses template literals extensively for card rendering. Phase machine with betting/dealing/insurance/playerTurn/dealerTurn/payout stages.",
    strategyTable: "Array-indexed with compound codes (Rh, Rs, Rp, Ds). Comprehensive coverage. Proper fallback resolution in `getBestAction()`. Strategy table includes all H17-specific entries.",
    strengths: [
      "Most accurate strategy table in the Antigravity group — correctly handles Ds (A,7 vs 2), Rs (17 vs A), Rp (8,8 vs A)",
      "Dedicated `canHit/canStand/canDouble/canSplit/canSurrender` predicate functions — cleanest action legality checks",
      "Active hand highlight with animated pulse and dashed gold border is visually excellent",
      "Per-hand result overlays with pop animation (win/lose/push)",
      "Three distinct control groups (betting/actions/insurance) that swap visibility based on phase"
    ],
    weaknesses: [
      "⚠️ NOT FUNCTIONAL AS BUILT — crashes or fails to render properly on load",
      "Template literals use escaped backticks (`\\``) suggesting the file was generated inside a context that double-escaped them — this would cause syntax errors in the browser",
      "Soft 18 vs 2 strategy entry is 'Ds' which is correct, but Hard 11 vs Ace incorrectly shows 'D' with no fallback needed (should be 'D' under H17 — this is actually correct)",
      "The `checkDealerBlackjack` function calls `deal()` related functions with `setTimeout` chaining that could race with user input",
      "No keyboard shortcut support visible in the reviewed code section"
    ],
    codeQuality: "Architecturally the best of the Antigravity group — clean predicates, proper compound action codes, and a well-designed phase machine. Unfortunately, the template literal escaping issue makes it non-functional.",
    visualDesign: "Would have been the best looking of the Antigravity implementations if it worked. The active hand animations, result pop overlays, and chip styling are all premium."
  },

  "ag_gemini_3_flash": {
    rating: 7,
    verdict: "Well-Polished with Modern UI",
    lines: 1204,
    cssApproach: "Extensive CSS custom properties. Outfit + Inter fonts. Card deal animation. Notification-style deviation warning with slide-in effect. Color-coded action buttons (green hit, red stand, blue double, purple split).",
    jsArchitecture: "Single `gameState` object. Async/await deal sequence with `wait()` delays for animated dealing. Separate suit objects with color metadata.",
    strategyTable: "Object-of-arrays indexed by dealer upcard position. Complete coverage for hard/soft/pairs. Uses string keys for pair lookup ('AA', '88', etc.).",
    strengths: [
      "Async/await card dealing with staggered animations — most polished deal sequence",
      "Color-coded action buttons by type (hit=green, stand=red, double=blue, split=purple, surrender=gray)",
      "Notification-style deviation warning is non-blocking with slide-in animation — closest to the spec's intent",
      "Card deal animation with translate and rotation",
      "Hand status indicators with cubic-bezier easing for show/hide",
      "Click-to-toggle count display on the felt"
    ],
    weaknesses: [
      "Strategy table missing soft 20 entry — falls through to hard total",
      "Soft 18 vs 2 shows 'S' instead of 'Ds' (Double or Stand)",
      "Hard 17 vs A shows 'S' — should be 'Rs' (Surrender or Stand) under H17 with late surrender",
      "Missing surrender entries for hard 15/16 vs 9/10/A in several cells",
      "8,8 vs A shows 'P' — should be 'Rp' (Surrender or Split) or at minimum 'P' (which is the fallback, so functionally OK but technically the strategy table should note the primary recommendation)",
      "Deviation notification has 'Proceed anyway' but doesn't clearly block the action — it fires the action and shows the warning simultaneously",
      "Insurance phase handling is minimal — no dedicated UI state for it"
    ],
    codeQuality: "Modern JavaScript style with async/await patterns. Good separation of concerns. The suit objects carrying color metadata is a nice touch. Some strategy table inaccuracies prevent a higher rating.",
    visualDesign: "The most modern-looking of all implementations. The color-coded buttons, slide-in notifications, and smooth animations create a contemporary UI that stands apart from the traditional casino aesthetic."
  },

  "cd_haiku_45": {
    rating: 7,
    verdict: "Comprehensive but Verbose",
    lines: 1392,
    cssApproach: "No CSS custom properties — uses hardcoded color values. Basic casino theme. Card styling uses gradient backgrounds. Inline styles mixed with classes.",
    jsArchitecture: "Single `game` object. DOM-heavy rendering with innerHTML. Extensive inline event handlers in HTML. Phase-based flow control.",
    strategyTable: "Complete coverage with H/S/D/P/U codes. Data-driven lookup. Pairs table covers all 10 pair types.",
    strengths: [
      "Complete implementation of all specified game rules",
      "Strategy table is accurate and comprehensive",
      "Multi-hand rendering works correctly for splits",
      "Insurance modal with proper yes/no flow",
      "Result display with color-coded outcomes"
    ],
    weaknesses: [
      "Verbose CSS with lots of repetition — no custom properties or variables",
      "Heavy use of inline styles in JavaScript-generated HTML",
      "Some inconsistency in event handling (mix of inline onclick and addEventListener)",
      "Card styling is functional but not as polished as Claude Desktop or Code implementations",
      "No deal animation or card transitions"
    ],
    codeQuality: "Functional and correct, but not elegant. The code works but lacks the architectural refinement seen in the Claude Desktop implementations. Gets the job done without much flair.",
    visualDesign: "Standard casino look. Functional cards and layout but lacks the premium polish of the top implementations. No animations on deal."
  },

  "cd_opus_46": {
    rating: 8,
    verdict: "Clean and Correct",
    lines: 1553,
    cssApproach: "CSS custom properties. Elegant dark theme with gold accents. Card-back pattern via CSS gradients. Transition animations on cards and buttons.",
    jsArchitecture: "Well-organized with clear function separation. Phase machine with proper state transitions. Clean event delegation.",
    strategyTable: "Complete and accurate for H17/DAS/LS. Includes compound action codes with proper fallback resolution.",
    strengths: [
      "Clean, readable code structure with excellent function naming",
      "Accurate strategy table including H17-specific entries",
      "Proper deviation warning system — warns before action executes",
      "Elegant CSS with consistent theming via custom properties",
      "Smooth card deal animations",
      "Split hand management is correct and visually clear"
    ],
    weaknesses: [
      "No true count calculation — only running count",
      "Insurance payout logic could be clearer",
      "Card overlap uses fixed pixel values that don't scale well",
      "No 'last hand' summary display"
    ],
    codeQuality: "High quality. Clean separation of concerns, consistent naming conventions, and proper error handling. One of the most maintainable codebases in the set.",
    visualDesign: "Premium casino aesthetic with dark felt, gold accents, and polished card rendering. The transitions and hover effects add subtle life to the interface."
  },

  "cd_opus_47": {
    rating: 9,
    verdict: "Best Overall — Most Complete and Polished",
    lines: 1800,
    cssApproach: "Extensive CSS custom properties (17 theme tokens). Cinzel serif font for headers, Inter for UI. Radial gradient felt with dashed gold border rail. Card-back with dual-layer CSS pattern (repeating gradient + radial overlay + inner border via ::after). Per-result animations (pulse-win, pulse-lose, pulse-push). Shoe penetration meter as a progress bar.",
    jsArchitecture: "'use strict' mode. Single `state` object with 16 properties. Shoe uses index-based drawing (`shoePos`) instead of `pop()` — more memory-efficient. Strategy lookup uses compound codes (D, Ds, R, Rs) with a `recommendedAction()` resolver. Phase machine: idle → insurance → player → dealer → resolved. Insurance flow is a distinct phase with dedicated controls.",
    strategyTable: "Three separate table objects (HARD_STRATEGY, SOFT_STRATEGY, PAIR_STRATEGY). Array-indexed with 10 columns per row. Complete coverage of hard 5–21, soft 13–20, all pairs. All H17-specific entries correct: Hard 11 vs A = D, Soft 18 vs 2 = Ds, Hard 17 vs A = Rs, 8,8 vs A = R. Compound codes resolved via `recommendedAction()` which checks `canDouble/canSplit/canSurrender` to determine fallback.",
    strengths: [
      "Most accurate basic strategy table in the entire set — verified cell-by-cell against published H17/DAS/LS charts",
      "Strategy lookup has proper fallback logic: D→Hit, Ds→Stand, R→Hit, Rs→Stand, P→fallbackForFailedSplit",
      "Shoe uses index-based drawing — no array mutation, more efficient",
      "Shoe penetration meter (progress bar) is a unique and useful UI element",
      "Insurance is a full phase with dedicated button group — not a modal overlay",
      "Per-hand result animations (win/lose/push/blackjack) with CSS keyframe pulses",
      "Card-back design is the most detailed: gold-bordered with diagonal repeating pattern and radial overlay",
      "Footer includes visible keyboard shortcuts, Hi-Lo count toggle, and last-hand summary — all spec 'nice-to-haves' implemented",
      "Dual-panel control layout (bet panel + action panel side by side) keeps all controls visible",
      "Code is in strict mode with clear constant declarations at the top",
      "Most detailed hand state tracking: cards, bet, doubled, surrendered, fromSplitAces, fromSplit, finished, result, payout",
      "`isFirstDecisionForHand()` properly gates surrender availability"
    ],
    weaknesses: [
      "At 1800 lines, it's the largest file — could be slightly more concise",
      "The `fallbackForFailedSplit()` function uses hardcoded totals (12-16 → Stand) rather than consulting the hard strategy table",
      "No async/await dealing animation — cards appear synchronously (though they have CSS deal-in animation)",
      "The grid-based control layout may feel less intuitive than a single button bar"
    ],
    codeQuality: "Exceptional. This is production-quality code with proper strict mode, clean constants, comprehensive state tracking, and the most robust strategy engine. The separation between raw strategy codes and resolved actions shows a deep understanding of the game logic. The shoe index approach is a nice engineering detail.",
    visualDesign: "The most polished and premium-feeling UI. The Cinzel serif font, 17-token color system, shoe penetration meter, and gold-bordered card-backs with layered patterns create a genuinely luxury casino aesthetic. The dual-panel layout is distinctive."
  },

  "cd_sonnet_46": {
    rating: 9,
    verdict: "Exceptionally Well-Engineered",
    lines: 1866,
    cssApproach: "Extensive CSS custom properties (23 variables). Playfair Display serif + Inter. Card-back uses multi-layer background with diagonal stripe pattern and inner border via ::after. True count display with positive/negative color coding. Modal overlay with backdrop blur. Deviation banner slides up from bottom with transform animation.",
    jsArchitecture: "'use strict' mode. Single `G` state object with compact property names. Strategy tables as 10-character strings indexed by position — the most compact encoding. `resolveBS()` function maps raw codes to concrete actions. Phase machine: bet → ins → play → dealer → done. Deviation system uses `G.pending` to store queued action.",
    strategyTable: "Three table objects (BS.hard, BS.soft, BS.pairs) keyed by dealer upcard symbol (2-A). Most readable format — each entry is a clear object mapping. Complete and accurate. All H17-specific entries correct. Soft 19 vs 6 = 'D' (Double or Stand). Correctly encodes Ds as a distinct action code from D.",
    strengths: [
      "Strategy table uses dealer upcard symbols (2,3,...,10,A) as keys — most human-readable format",
      "Complete and accurate strategy coverage including all H17/DAS/LS nuances",
      "Modal-based insurance prompt with cost display — most user-friendly insurance UX",
      "Deviation banner slides up from bottom — non-blocking and dismissible, exactly matching spec",
      "True count calculation (running count / decks remaining) — only a few implementations include this",
      "Last-hand summary in a fixed position corner element",
      "Card result effects (win=green glow, lose=red glow, push=gold glow) applied per-card",
      "Keyboard shortcut indicators embedded in button labels",
      "Clean `area-label` typography with gold color and letter-spacing",
      "Count display with positive/negative color coding"
    ],
    weaknesses: [
      "The longest file at 1866 lines — some CSS could be consolidated",
      "Shoe info display is minimal compared to Opus 4.7's penetration meter",
      "Insurance modal could be better — the cost display is good but the modal itself is plain",
      "Some CSS specificity issues with the `.hidden` utility class requiring `!important`"
    ],
    codeQuality: "Outstanding. The strategy table format using dealer upcard symbols is the most readable and maintainable of any implementation. The deviation system with pending action queuing is correctly designed. True count calculation is a bonus that most implementations skip.",
    visualDesign: "Refined and elegant. The Playfair Display headings, subtle backdrop blur effects, and per-card result glows create a sophisticated feel. The bottom-sliding deviation banner is the most spec-compliant warning implementation."
  },

  "vs_gpt5_mini": {
    rating: 5,
    verdict: "Ambitious but Non-Functional",
    lines: 1186,
    cssApproach: "CSS custom properties. Dark theme with green felt gradient. Card styling with proper suit colors. Animation keyframes for deal and results.",
    jsArchitecture: "Single game state object. Event-driven architecture with proper state management.",
    strategyTable: "Object-based lookup with H/S/D/P/R codes. Covers hard, soft, and pair totals.",
    strengths: [
      "Ambitious feature set attempting all spec requirements",
      "Structured codebase with clear function separation",
      "Strategy table covers the core scenarios",
      "Visual design attempts premium aesthetics"
    ],
    weaknesses: [
      "⚠️ NOT FUNCTIONAL AS BUILT — fails to run properly in the browser",
      "Logic errors prevent the game from completing a round",
      "Split handling has state management bugs",
      "Event handling has race conditions",
      "Strategy table has several inaccurate entries for H17 ruleset"
    ],
    codeQuality: "The structure is reasonable but execution fails. The code attempts to do everything but doesn't get the fundamentals right, resulting in a non-playable game.",
    visualDesign: "The CSS design is reasonable on paper but can't be fully evaluated since the JS fails to render the game properly."
  },

  "vs_haiku_45": {
    rating: 7,
    verdict: "Well-Documented and Structured",
    lines: 1538,
    cssApproach: "CSS with Google Fonts (Crimson Text + Roboto Mono). Casino-themed color palette. Card styling with proper suit rendering. Card-back via CSS gradients.",
    jsArchitecture: "Single `gameState` object. Clear section comments dividing the code. 14-step documented build process. Modular function organization.",
    strategyTable: "Complete lookup tables for hard, soft, and pairs. Data-driven approach with proper action codes.",
    strengths: [
      "Extremely well-documented with 14 distinct implementation steps",
      "Clean code organization following the spec's quality expectations",
      "Complete game rule implementation",
      "Proper hint and deviation warning system",
      "Keyboard shortcuts correctly implemented"
    ],
    weaknesses: [
      "Execution time reported as 2-3 seconds is misleading (file write only)",
      "Visual design is functional but not as premium as Claude Desktop implementations",
      "No true count calculation — only running count infrastructure",
      "Animations are minimal compared to top implementations"
    ],
    codeQuality: "Good structure and documentation. The code follows a clear plan and implements all requirements methodically. A solid, workmanlike implementation.",
    visualDesign: "Clean and functional casino theme. Cards look proper with correct suit coloring. Lacks the premium animations and polish of the top-tier implementations."
  },

  "cc_haiku_45": {
    rating: 7,
    verdict: "Methodical and Complete",
    lines: 1223,
    cssApproach: "Google Fonts (Roboto). Dark casino aesthetic with green felt gradient and gold accents. Card styling with proper Unicode suits. Modal system for insurance and results.",
    jsArchitecture: "Single `game` object. Fisher-Yates shuffle. 15-step build process. Modular functions organized by responsibility. Hi-Lo count tracking integrated into draw.",
    strategyTable: "Three lookup objects (hard, soft, pairs). Complete coverage for all hand types. Proper action codes with fallback handling.",
    strengths: [
      "Complete and methodical implementation of all spec requirements",
      "Well-organized code with clear section comments",
      "Multi-hand rendering works for split scenarios",
      "Insurance modal with yes/no decision flow",
      "Running Hi-Lo count with toggle"
    ],
    weaknesses: [
      "Visual design is functional but not striking — green/gold palette without the refinement of CD Opus",
      "No deal animation or card transitions",
      "Deviation warning auto-dismisses after 3 seconds which may be too quick",
      "No true count display — only running count"
    ],
    codeQuality: "Solid and reliable. The code is well-organized and follows the spec faithfully. Not flashy but correct and maintainable.",
    visualDesign: "Standard casino theme that meets the spec requirements without exceeding them. Cards and layout are clean but lack the premium micro-interactions of the best implementations."
  },

  "cc_opus_47": {
    rating: 9,
    verdict: "Technically Superior — Best Strategy Engine",
    lines: 1786,
    cssApproach: "Extensive theming with CSS custom properties. Cinzel + Inter fonts. Card-back with purple gradient, gold border, double-layer ::before/::after (crosshatch pattern + centered spade symbol). Radial gradient felt with rail border. Per-hand result pulse animations. Chip styling with radial gradients (white $10, green $25, blue $50, black/gold $100).",
    jsArchitecture: "'use strict' mode. Single `state` object. String-encoded strategy tables — each row is a 10-character string where position maps to dealer upcard. Six action codes: H, S, D, d (Double/Stand), R (Surrender/Hit), r (Surrender/Stand). Deviation banner with Cancel/Continue buttons that properly queue the pending action. Four distinct control groups swapped by phase (betting/insurance/action/new-round).",
    strategyTable: "String-encoded format (e.g., 'HDDDDHHHHH' for hard 9). Most compact encoding possible. Six codes (H/S/D/d/R/r) handle all compound actions. Verified cell-by-cell: Hard 11 vs A = D, Soft 18 (A,7) = 'dddddSSHHH', Hard 17 vs A = r, 8,8 vs A = R. The `resolve()` function maps raw codes to concrete actions based on current availability.",
    strengths: [
      "String-encoded strategy tables are the most compact and efficient encoding in the entire set",
      "Six action codes (H/S/D/d/R/r) provide the most precise encoding — 'd' for Double-or-Stand vs 'D' for Double-or-Hit",
      "Deviation banner has Cancel/Continue flow that properly blocks the action — the pending action is stored in `G.pending`",
      "Four mutually exclusive control groups (betting/insurance/action/new-round) with proper phase switching",
      "Card-back is the most elaborate: purple gradient with gold border, crosshatch pattern via ::before, centered spade suit symbol via ::after",
      "Chip styling uses radial gradients with realistic depth (inner shadow, outer glow)",
      "Per-hand result animations with distinct pulse colors for win/loss/push",
      "Deck info panel shows remaining cards and Hi-Lo count in the bottom corner",
      "Keyboard shortcut hints displayed on the table felt",
      "The `isFirstActionOnHand()` check properly prevents surrender on non-first-action decisions"
    ],
    weaknesses: [
      "String-encoded tables, while compact, are harder to read than the key-value objects used by CD Sonnet",
      "Deal animation is CSS-only (no JS sequencing) — cards appear with a slide-in rather than being dealt one at a time",
      "The purple card-back is unique but less traditionally 'casino' than navy/blue patterns",
      "No true count display — only raw running count"
    ],
    codeQuality: "Superb. The string-encoded strategy tables show an understanding of data compression rarely seen in generated code. The deviation system with Cancel/Continue is the most user-friendly implementation. The phase management is clean and correct.",
    visualDesign: "Distinctive and premium. The purple card-backs, radial gradient chips, and felt-bottom keyboard hints give it a unique identity. The gold-bordered card-back with layered patterns is the most detailed visual element in any implementation."
  },

  "cc_sonnet_46": {
    rating: 8,
    verdict: "Clean and Well-Documented",
    lines: 1383,
    cssApproach: "CSS custom properties. Playfair Display + Inter fonts. Multiple keyframe animations (deal, result). Card-back with repeating diagonal gradient pattern.",
    jsArchitecture: "Single `G` state object. Strategy tables as array-indexed objects. `resolveBS()` for compound action handling. Phase machine with 5 phases.",
    strategyTable: "Three table objects indexed 0-9 for dealer upcards 2-A. Includes compound codes (D, Ds, R, Rp, Rs). Complete coverage with proper H17 entries.",
    strengths: [
      "Complete spec coverage in a relatively compact 1383 lines",
      "Clean compound action resolution via `resolveBS()`",
      "Detailed game flow documentation in the build log",
      "Proper deviation modal with Reconsider/Proceed options",
      "Keyboard shortcuts properly gated by deviation banner visibility",
      "Hi-Lo running and true count display"
    ],
    weaknesses: [
      "No distinct visual identity — similar aesthetic to CD Sonnet without the distinguishing touches",
      "Card deal animation is basic compared to async-sequenced implementations",
      "Some control state transitions could be smoother",
      "Deviation modal blocks keyboard input but could miss edge cases with rapid clicks"
    ],
    codeQuality: "High quality with clean architecture. The build log documents 48 defined functions and a clear round lifecycle. Good balance of completeness and conciseness.",
    visualDesign: "Polished casino aesthetic with proper dark theme, gold accents, and animated card dealing. Solid but not as distinctive as the Opus implementations."
  }
};
