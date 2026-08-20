import { NodeHtmlMarkdown } from "node-html-markdown";
import { parse } from "node-html-parser";
import type { SourceEntry } from "./registry.js";

const REMOVE_SELECTORS = [
  "script",
  "style",
  "noscript",
  "template",
  "svg",
  "button",
  "form",
  "nav",
  "footer",
  "header",
  "[hidden]",
  "[data-nosnippet]",
  ".nocontent",
  ".devsite-article-meta",
  ".devsite-content-footer",
  ".hash-link",
  ".md-content__button",
  ".md-source-file",
];

export type HtmlConversionErrorCode = "missing_selector" | "conversion_failed";

export class HtmlConversionError extends Error {
  constructor(
    readonly code: HtmlConversionErrorCode,
    message: string,
  ) {
    super(message);
  }
}

function removeNoise(root: ReturnType<typeof parse>): void {
  for (const selector of REMOVE_SELECTORS) {
    root.querySelectorAll(selector).forEach((node) => node.remove());
  }
}

export function convertHtml(source: SourceEntry, html: string): string {
  try {
    const document = parse(html);
    const root = document.querySelector(source.html_selector ?? "");
    if (!root) {
      throw new HtmlConversionError("missing_selector", "HTML content selector did not match");
    }
    removeNoise(root);
    return NodeHtmlMarkdown.translate(root.innerHTML, {
      bulletMarker: "-",
      codeBlockStyle: "fenced",
      keepDataImages: false,
      maxConsecutiveNewlines: 2,
      useInlineLinks: true,
    });
  } catch (error) {
    if (error instanceof HtmlConversionError) throw error;
    throw new HtmlConversionError("conversion_failed", "HTML conversion failed");
  }
}
