import { describe, expect, it } from "vitest";
import { convertHtml, HtmlConversionError } from "../src/sources/html.js";
import type { SourceEntry } from "../src/sources/registry.js";

const source: SourceEntry = {
  provider: "bedrock",
  slug: "model-lifecycle",
  catalog_provider: "amazon",
  format: "html",
  url: "https://example.com/model-lifecycle",
  html_selector: "article",
  max_download_bytes: 10_000,
  min_bytes: 1,
  max_bytes: 10_000,
  required_markers: ["Model"],
};

function rows(markdown: string): string[][] {
  return markdown
    .split("\n")
    .filter((line) => line.startsWith("|") && !/^\|(?:\s*-+\s*\|)+$/.test(line))
    .map((line) =>
      line
        .slice(1, -1)
        .split("|")
        .map((cell) => cell.trim()),
    );
}

describe("HTML source conversion", () => {
  it("expands rowspans and repairs a missing provider cell", () => {
    const markdown = convertHtml(
      source,
      `<article><table>
        <tr><th>Model provider</th><th>Model name</th><th>Model ID</th><th>Regions</th><th>Legacy date</th><th>EOL date</th><th>Public extended access start date</th></tr>
        <tr><td rowspan="2">Anthropic</td><td rowspan="2">Claude 3 Haiku</td><td rowspan="2">anthropic.claude-3-haiku-v1:0</td><td>us-east-1</td><td>March 10, 2026</td><td>September 10, 2026</td><td>June 10, 2026</td></tr>
        <tr><td>us-gov-east-1, us-gov-west-1</td><td>March 10, 2026</td><td>September 10, 2026</td><td>June 10, 2026</td></tr>
        <tr><td>Command R</td><td>cohere.command-r-v1:0</td><td>us-east-1</td><td>February 19, 2026</td><td>August 19, 2026</td><td>May 19, 2026</td></tr>
      </table></article>`,
    );

    expect(rows(markdown)).toContainEqual([
      "Anthropic",
      "Claude 3 Haiku",
      "anthropic.claude-3-haiku-v1:0",
      "us-gov-east-1, us-gov-west-1",
      "March 10, 2026",
      "September 10, 2026",
      "June 10, 2026",
    ]);
    expect(rows(markdown)).toContainEqual([
      "Cohere",
      "Command R",
      "cohere.command-r-v1:0",
      "us-east-1",
      "February 19, 2026",
      "August 19, 2026",
      "May 19, 2026",
    ]);
  });

  it("combines split tables and separates paired date cells", () => {
    const markdown = convertHtml(
      source,
      `<article>
        <div data-slot="table-container"><table><tr><th>Model</th><th>Version</th><th>API</th><th><div class="flex justify-between">Deprecation<svg></svg>Retirement</div></th><th>Alternative</th></tr></table></div>
        <div><span>Scroll for more</span><svg></svg></div>
        <div data-slot="table-container"><table>
          <tr><td>Leanstral</td><td>26.03</td><td>labs-leanstral</td><td><div class="flex justify-between"><span>5/22/2026</span><span>6/30/2026</span></div></td><td>Leanstral 1.5</td></tr>
          <tr><td>Mathstral 7B</td><td>0.1</td><td></td><td><div class="flex justify-between"><span></span><span></span></div></td><td>Mistral Small 4</td></tr>
        </table></div>
      </article>`,
    );

    expect(rows(markdown)[0]).toEqual([
      "Model",
      "Version",
      "API",
      "Deprecation",
      "Retirement",
      "Alternative",
    ]);
    expect(rows(markdown)).toContainEqual([
      "Leanstral",
      "26.03",
      "labs-leanstral",
      "5/22/2026",
      "6/30/2026",
      "Leanstral 1.5",
    ]);
    expect(rows(markdown)).toContainEqual(["Mathstral 7B", "0.1", "", "", "", "Mistral Small 4"]);
    expect(markdown).not.toContain("Scroll for more");
    expect(markdown.match(/^\|(?:\s*-+\s*\|)+$/gm)).toHaveLength(1);
  });

  it("duplicates merged deprecation data into each affected row", () => {
    const markdown = convertHtml(
      source,
      `<article><table>
        <tr><th>Category</th><th>Model name</th><th>Deprecation time</th><th>Replacement model</th></tr>
        <tr><td rowspan="2">Qwen-Max</td><td>qwen3.6-max-preview</td><td rowspan="3">October 10, 2026</td><td rowspan="2">qwen3.7-max</td></tr>
        <tr><td>qwen3-max</td></tr>
        <tr><td>Qwen-VL</td><td>qwen3-vl-flash</td><td>qwen3.6-flash</td></tr>
      </table></article>`,
    );

    expect(rows(markdown)).toContainEqual([
      "Qwen-Max",
      "qwen3-max",
      "October 10, 2026",
      "qwen3.7-max",
    ]);
    expect(rows(markdown)).toContainEqual([
      "Qwen-VL",
      "qwen3-vl-flash",
      "October 10, 2026",
      "qwen3.6-flash",
    ]);
  });

  it("expands rowspan=0 to the end of the table", () => {
    const markdown = convertHtml(
      source,
      `<article><table>
        <tr><th>Provider</th><th>Model</th></tr>
        <tr><td rowspan="0">Anthropic</td><td>Claude</td></tr>
        <tr><td>Haiku</td></tr>
        <tr><td>Opus</td></tr>
      </table></article>`,
    );

    expect(rows(markdown)).toContainEqual(["Anthropic", "Claude"]);
    expect(rows(markdown)).toContainEqual(["Anthropic", "Haiku"]);
    expect(rows(markdown)).toContainEqual(["Anthropic", "Opus"]);
  });

  it("preserves rendered whitespace and removes interactive labels", () => {
    const markdown = convertHtml(
      source,
      `<article>
        <p>Stable and <a href="/preview">preview</a>\nmodels.</p>
        <p><span>Reduction begins.</span><span> Throughout this period.</span></p>
        <table><tr><th>Replacement</th></tr><tr><td><code>preview</code><br>or GA</td></tr></table>
        <ul><li>Last benchmark</li></ul><b>Native support</b><p>Details.</p>
        <h4>The following table lists retired models (click to expand)</h4>
      </article>`,
    );

    expect(markdown).toContain("[preview](/preview) models");
    expect(markdown).toContain("Reduction begins. Throughout this period.");
    expect(markdown).toContain("preview or GA");
    expect(markdown).toContain("- Last benchmark\n\n**Native support**");
    expect(markdown).not.toContain("click to expand");
  });

  it("unwraps table cells from invalid row wrappers", () => {
    const markdown = convertHtml(
      source,
      `<article><table>
        <tr><p><th>Deprecated Model</th><th>Offline Time</th></p></tr>
        <tr><p><td>mimo-v2-pro</td><td>2026.6.30</td></p></tr>
      </table></article>`,
    );

    expect(rows(markdown)).toEqual([
      ["Deprecated Model", "Offline Time"],
      ["mimo-v2-pro", "2026.6.30"],
    ]);
  });

  it("reports a conversion failure with the underlying cause", () => {
    expect(() => convertHtml({ ...source, html_selector: "[" }, "<article></article>")).toThrow(
      expect.objectContaining<Partial<HtmlConversionError>>({
        code: "conversion_failed",
        message: expect.stringMatching(/^HTML conversion failed: .+/),
      }),
    );
  });
});
