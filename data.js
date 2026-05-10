const appData = {
  models: [
    {
      id: "ag_gpt_oss",
      tool: "Antigravity",
      model: "GPT OSS 120B",
      executionTime: "~12 minutes",
      linesOfCode: "~600",
      features: ["6-deck shoe", "H17", "DAS", "Late Surrender", "Hint System", "Keyboard Shortcuts"],
      notes: "Generated via a 12-minute iterative or single generation with UI wiring and testing steps mentioned. Built the HTML with CSS grid/flexbox.",
      htmlPath: "Antigravity/GPT OSS 120B/blackjack.html",
      mdPath: "Antigravity/GPT OSS 120B/blackjack_creation_report.md"
    },
    {
      id: "ag_gemini_31_low",
      tool: "Antigravity",
      model: "Gemini 3.1 Pro Low",
      executionTime: "~3.5 minutes",
      linesOfCode: "Unknown",
      features: ["6-deck shoe", "H17", "DAS", "Late Surrender", "Hint System", "Keyboard Shortcuts", "Hi-Lo Tracking"],
      notes: "Completed in 3.5 minutes. Implemented a comprehensive Basic Strategy Matrix and a non-blocking deviation modal.",
      htmlPath: "Antigravity/Gemini 3.1 Pro Low/blackjack.html",
      mdPath: "Antigravity/Gemini 3.1 Pro Low/creation_summary.md"
    },
    {
      id: "ag_gemini_31_high",
      tool: "Antigravity",
      model: "Gemini 3.1 Pro High (Not Functional)",
      executionTime: "~4 minutes 45 seconds",
      linesOfCode: "~550",
      features: ["6-deck shoe", "H17", "DAS", "Late Surrender", "Hint System", "Keyboard Shortcuts", "Hi-Lo Toggle"],
      notes: "⚠️ NOT FUNCTIONAL AS BUILT. Produced the entire application in a single generation pass. Encountered a minor path validation error on directory creation but self-corrected.",
      htmlPath: "Antigravity/Gemini 3.1 Pro High/blackjack.html",
      mdPath: "Antigravity/Gemini 3.1 Pro High/results.md"
    },
    {
      id: "ag_gemini_3_flash",
      tool: "Antigravity",
      model: "Gemini 3 Flash",
      executionTime: "3 minutes 49 seconds",
      linesOfCode: "Unknown",
      features: ["6-deck shoe", "H17", "DAS", "Late Surrender", "Hint System", "Keyboard Shortcuts", "Hi-Lo Toggle"],
      notes: "Resolved initial file path/artifact permission issues before successfully writing the file.",
      htmlPath: "Antigravity/Gemini 3 Flash/blackjack.html",
      mdPath: "Antigravity/Gemini 3 Flash/blackjack_summary.md"
    },
    {
      id: "cd_haiku_45",
      tool: "Claude Desktop",
      model: "Haiku 4.5",
      executionTime: "~8 minutes",
      linesOfCode: "~1,100",
      features: ["6-deck shoe", "H17", "DAS", "Late Surrender", "Hint System", "Keyboard Shortcuts", "Hi-Lo Toggle"],
      notes: "Highly structured build with 8 planned phases. Generated an extensive basic strategy data structure and UI grid system.",
      htmlPath: "Claude Desktop/Haiku 4.5/blackjack.html",
      mdPath: "Claude Desktop/Haiku 4.5/BLACKJACK_BUILD_REPORT.md"
    },
    {
      id: "cd_opus_46",
      tool: "Claude Desktop",
      model: "Opus 4.6",
      executionTime: "~1 minute 15 seconds",
      linesOfCode: "~700",
      features: ["6-deck shoe", "H17", "DAS", "Late Surrender", "Hint System", "Keyboard Shortcuts", "Hi-Lo Toggle"],
      notes: "Entire 700+ line HTML file generated and written in a single step with no iterative drafts. Validated visually.",
      htmlPath: "Claude Desktop/Opus 4.6/blackjack.html",
      mdPath: "Claude Desktop/Opus 4.6/blackjack-creation-log.md"
    },
    {
      id: "cd_opus_47",
      tool: "Claude Desktop",
      model: "Opus 4.7",
      executionTime: "~2-3 minutes",
      linesOfCode: "~1,800",
      features: ["6-deck shoe", "H17", "DAS", "Late Surrender", "Hint System", "Keyboard Shortcuts", "Hi-Lo Toggle"],
      notes: "Very detailed encoding of logic. Single write step taking 60-90 seconds. Ambiguities in prompt were intelligently resolved.",
      htmlPath: "Claude Desktop/Opus 4.7/blackjack.html",
      mdPath: "Claude Desktop/Opus 4.7/BUILD_NOTES.md"
    },
    {
      id: "cd_sonnet_46",
      tool: "Claude Desktop",
      model: "Sonnet 4.6",
      executionTime: "~60-70 seconds",
      linesOfCode: "~700",
      features: ["6-deck shoe", "H17", "DAS", "Late Surrender", "Hint System", "Keyboard Shortcuts", "Hi-Lo Toggle"],
      notes: "Required a pre-execution step to raise the CLAUDE_CODE_MAX_OUTPUT_TOKENS to 128000, then wrote the file in one shot.",
      htmlPath: "Claude Desktop/Sonnet 4.6/blackjack.html",
      mdPath: "Claude Desktop/Sonnet 4.6/blackjack_build_log.md"
    },
    {
      id: "vs_gpt5_mini",
      tool: "VSCode",
      model: "GPT-5 mini (Not Functional)",
      executionTime: "~2 minutes",
      linesOfCode: "1,200+",
      features: ["6-deck shoe", "H17", "DAS", "Late Surrender", "Hint System", "Keyboard Shortcuts", "Hi-Lo Toggle"],
      notes: "⚠️ NOT FUNCTIONAL AS BUILT. Implemented a full-featured single-file web app with a very robust structure. The MD file contains the full HTML output.",
      htmlPath: "VSCode/GPT-5 mini/blackjack.html",
      mdPath: "VSCode/GPT-5 mini/blackjack_report.md"
    },
    {
      id: "vs_haiku_45",
      tool: "VSCode",
      model: "Haiku 4.5",
      executionTime: "~2-3 seconds (File Write Only)",
      linesOfCode: "~1,200+",
      features: ["6-deck shoe", "H17", "DAS", "Late Surrender", "Hint System", "Keyboard Shortcuts"],
      notes: "Complete application as one self-contained .html file. Built with 14 steps, fully documented.",
      htmlPath: "VSCode/Haiku 4.5/blackjack.html",
      mdPath: "VSCode/Haiku 4.5/BLACKJACK_CREATION_REPORT.md"
    }
  ]
};
