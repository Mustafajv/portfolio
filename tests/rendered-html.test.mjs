import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete portfolio landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Muhammad Mustafa — Frontend Developer<\/title>/i);
  assert.match(html, /I build/);
  assert.match(html, /web experiences/);
  assert.match(html, /Products built end to end/);
  assert.match(html, /Drip/);
  assert.match(html, /Purplexity/);
  assert.match(html, /github\.com\/Mustafajv\/drip/);
  assert.match(html, /github\.com\/Mustafajv\/purplexity/);
  assert.match(html, /Live demo · soon/);
  assert.match(html, /Freelance Web Developer/);
  assert.match(html, /Bachelor of Science in Computer Science/);
  assert.match(html, /Mustafa\.jvd69@gmail\.com/);
  assert.match(html, /id="capabilities"/);
  assert.match(html, /id="skills"/);
  assert.match(html, /id="process"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /aria-disabled="true"/);
});

test("keeps the portfolio accessible and free of starter UI", async () => {
  const [page, layout, styles, matrix, content, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../components/MatrixRain.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/portfolio-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /className="skip-link"/);
  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(page, /<MatrixRain \/>/);
  assert.doesNotMatch(page, /className=["'][^"']*card/i);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(content, /Muhammad Mustafa/);
  assert.match(content, /linkedin\.com\/in\/mustafa-javed-10b20323b/);
  assert.match(content, /liveUrl: null/);

  assert.match(matrix, /const FRAME_DELAY = 70/);
  assert.match(matrix, /const FONT_SIZE = 16/);
  assert.match(matrix, /const FADE_FACTOR = 0\.07/);
  assert.match(matrix, /prefers-reduced-motion: reduce/);
  assert.match(matrix, /document\.hidden/);
  assert.match(matrix, /devicePixelRatio/);
  assert.match(styles, /\.matrix-rain[\s\S]*pointer-events: none/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);

  await assert.rejects(
    access(new URL("../app/_sites-preview", import.meta.url)),
  );
});
