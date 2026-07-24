"use strict";

const HIDDEN_RE = /[\u200B\u200C\u200D\u2060\uFEFF\u00AD\u200E\u200F\u202A-\u202E]/;

module.exports = {
  meta: {
    type: "problem",
    docs: { description: "Disallow hidden or bidirectional Unicode characters" },
    schema: [],
  },
  create(context) {
    return {
      Program(node) {
        const src = context.getSourceCode().getText();
        const lines = src.split("\n");
        lines.forEach((line, i) => {
          const m = line.match(HIDDEN_RE);
          if (m) {
            context.report({
              node,
              loc: { line: i + 1, column: m.index + 1 },
              message: `Hidden Unicode character U+${m[0].codePointAt(0).toString(16).toUpperCase().padStart(4, "0")} detected.`,
            });
          }
        });
      },
    };
  },
};
