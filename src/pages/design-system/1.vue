<script setup lang="ts">
import {ref}from "vue"

  const moon  = ref<SVGAElement|null>(null);
  const sun    =ref<SVGAElement|null>(null);
  const themeLabel  = ref<HTMLSpanElement|null>(null)
  const dark = ref(false)

 function toggleTheme() {
    dark.value = !dark.value;
    document.documentElement.classList.toggle('dark', dark.value);
    if(moon.value)
    moon.value.style.display = dark.value ? 'none' : '';
    if(sun.value)
    sun.value.style.display = dark.value ? '' : 'none';
  if(themeLabel.value)
    themeLabel.value.textContent = dark.value ? 'Light' : 'Dark';
  }
</script>

<template>
  <!-- ─── STICKY NAV ───────────────────────────────────────────────── -->
  <header
    class="sticky top-0 z-20 bg-bg/85 backdrop-blur border-b border-border"
  >
    <div
      class="container-ds flex items-center justify-between gap-4"
      style="height: 56px"
    >
      <a
        href="#"
        class="flex items-center gap-2 shrink-0 no-underline"
      >
        <span
          style="
            width: 28px;
            height: 28px;
            background: var(--color-vs-green);
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--font-display);
            font-weight: 800;
            color: #fff;
            font-size: 13px;
            letter-spacing: -1px;
          "
          >V</span
        >
        <span
          style="
            font-family: var(--font-display);
            font-weight: 700;
            font-size: var(--text-sm);
            color: var(--color-fg);
          "
          >Vitesse DS</span
        >
      </a>
      <nav style="display: flex; align-items: center; gap: 2px; overflow-x: auto">
        <a href="#tokens" class="nav-link active">Tokens</a>
        <a href="#typography" class="nav-link">Type</a>
        <a href="#components" class="nav-link">Components</a>
        <a href="#spacing" class="nav-link">Spacing</a>
        <a href="#examples" class="nav-link">Examples</a>
      </nav>
      <button @click="toggleTheme" class="btn btn-secondary btn-sm" style="flex-shrink: 0">
        <svg
          ref="moon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        <svg
          ref="sun"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="display: none"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
        <span ref="themeLabel" style="margin-left: 8px">Dark</span>
      </button>
    </div>
  </header>

  <!-- ─── HERO ─────────────────────────────────────────────────────── -->
  <section class="section-lg">
    <div class="container-ds">
      <div style="max-width: 680px">
        <span class="badge badge-accent anim-fade-up" style="margin-bottom: 24px">
          <span style="width: 6px; height: 6px; border-radius: 50%; background: currentColor" />
          Design System v1.0
        </span>
        <h1 class="text-display anim-fade-up anim-d1" style="margin-bottom: 24px">
          Vitesse<br /><span style="color: var(--color-vs-green)">Design System</span>
        </h1>
        <p
          class="anim-fade-up anim-d2"
          style="
            font-size: var(--text-xl);
            color: var(--color-fg-muted);
            max-width: 520px;
            margin-bottom: 32px;
          "
        >
          A minimal, precise design language built on Tailwind CSS 4
          <code class="text-code">@theme</code> — dark/light aware, fully responsive, and rooted in
          the Vitesse color palette.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 12px" class="anim-fade-up anim-d3">
          <button class="btn btn-primary">Get Started →</button>
          <button class="btn btn-secondary">View Source</button>
        </div>
      </div>
    </div>
  </section>

  <div class="container-ds">
    <hr class="divider" />
  </div>

  <!-- ─── COLOR TOKENS ─────────────────────────────────────────────── -->
  <section id="tokens" class="section">
    <div class="container-ds">
      <span class="text-label">Foundation</span>
      <h2 class="text-heading-2" style="margin-top: 8px; margin-bottom: 12px">Color Tokens</h2>
      <p style="color: var(--color-fg-muted); max-width: 520px; margin-bottom: 40px">
        Semantic aliases adapt automatically between light and dark. Raw palette values from Vitesse
        are always constant.
      </p>

      <!-- Semantic backgrounds -->
      <h3 class="text-label" style="margin-bottom: 16px">Semantic — Backgrounds</h3>
      <div
        style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 24px;
          margin-bottom: 48px;
        "
      >
        <div class="card card-sm" style="display: flex; flex-direction: column; gap: 12px">
          <div
            style="
              height: 40px;
              border-radius: var(--radius-md);
              background: var(--color-bg);
              border: 1px solid var(--color-border);
            "
          />
          <code class="text-code" style="display: inline">--color-bg</code>
          <span style="font-size: var(--text-xs); color: var(--color-fg-muted)"
            >Page background</span
          >
        </div>
        <div class="card card-sm" style="display: flex; flex-direction: column; gap: 12px">
          <div
            style="
              height: 40px;
              border-radius: var(--radius-md);
              background: var(--color-bg-subtle);
              border: 1px solid var(--color-border);
            "
          />
          <code class="text-code" style="display: inline">--color-bg-subtle</code>
          <span style="font-size: var(--text-xs); color: var(--color-fg-muted)">Card / Panel</span>
        </div>
        <div class="card card-sm" style="display: flex; flex-direction: column; gap: 12px">
          <div
            style="
              height: 40px;
              border-radius: var(--radius-md);
              background: var(--color-bg-muted);
              border: 1px solid var(--color-border);
            "
          />
          <code class="text-code" style="display: inline">--color-bg-muted</code>
          <span style="font-size: var(--text-xs); color: var(--color-fg-muted)"
            >Code / Input bg</span
          >
        </div>
        <div class="card card-sm" style="display: flex; flex-direction: column; gap: 12px">
          <div
            style="
              height: 40px;
              border-radius: var(--radius-md);
              background: var(--color-bg-emphasis);
              border: 1px solid var(--color-border);
            "
          />
          <code class="text-code" style="display: inline">--color-bg-emphasis</code>
          <span style="font-size: var(--text-xs); color: var(--color-fg-muted)"
            >Hover / Active bg</span
          >
        </div>
      </div>

      <!-- Vitesse Palette -->
      <h3 class="text-label" style="margin-bottom: 16px">Vitesse Brand Palette</h3>
      <div
        style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
        "
      >
        <div style="display: flex; flex-direction: column; gap: 8px">
          <div
            style="height: 52px; border-radius: var(--radius-md); background: var(--color-vs-green)"
          />
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >Green · Accent</span
          >
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-2xs);
              color: var(--color-fg-muted);
            "
            >#4d9375</span
          >
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px">
          <div
            style="
              height: 52px;
              border-radius: var(--radius-md);
              background: var(--color-vs-green-light);
            "
          />
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >Green Light</span
          >
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-2xs);
              color: var(--color-fg-muted);
            "
            >#80a665</span
          >
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px">
          <div
            style="height: 52px; border-radius: var(--radius-md); background: var(--color-vs-blue)"
          />
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >Blue</span
          >
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-2xs);
              color: var(--color-fg-muted);
            "
            >#6394bf</span
          >
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px">
          <div
            style="
              height: 52px;
              border-radius: var(--radius-md);
              background: var(--color-vs-yellow);
            "
          />
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >Yellow</span
          >
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-2xs);
              color: var(--color-fg-muted);
            "
            >#e6cc77</span
          >
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px">
          <div
            style="
              height: 52px;
              border-radius: var(--radius-md);
              background: var(--color-vs-orange);
            "
          />
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >Orange</span
          >
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-2xs);
              color: var(--color-fg-muted);
            "
            >#d4976c</span
          >
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px">
          <div
            style="height: 52px; border-radius: var(--radius-md); background: var(--color-vs-red)"
          />
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >Red</span
          >
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-2xs);
              color: var(--color-fg-muted);
            "
            >#cb7676</span
          >
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px">
          <div
            style="
              height: 52px;
              border-radius: var(--radius-md);
              background: var(--color-vs-purple);
            "
          />
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >Purple</span
          >
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-2xs);
              color: var(--color-fg-muted);
            "
            >#d9739f</span
          >
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px">
          <div
            style="height: 52px; border-radius: var(--radius-md); background: var(--color-vs-teal)"
          />
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >Teal</span
          >
          <span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-2xs);
              color: var(--color-fg-muted);
            "
            >#5eaab5</span
          >
        </div>
      </div>
    </div>
  </section>

  <div class="container-ds">
    <hr class="divider" />
  </div>

  <!-- ─── TYPOGRAPHY ───────────────────────────────────────────────── -->
  <section id="typography" class="section">
    <div class="container-ds">
      <span class="text-label">Foundation</span>
      <h2 class="text-heading-2" style="margin-top: 8px; margin-bottom: 40px">Typography</h2>

      <div style="display: flex; flex-direction: column; gap: 32px">
        <div>
          <span class="text-label" style="display: block; margin-bottom: 16px"
            >Display — Syne 800</span
          >
          <p class="text-display">The quick brown fox</p>
        </div>
        <div>
          <span class="text-label" style="display: block; margin-bottom: 12px"
            >Heading 1 — Syne 700</span
          >
          <h1 class="text-heading-1">Minimalist interfaces</h1>
        </div>
        <div>
          <span class="text-label" style="display: block; margin-bottom: 12px"
            >Heading 2 — Syne 600</span
          >
          <h2 class="text-heading-2">Components that breathe</h2>
        </div>
        <div>
          <span class="text-label" style="display: block; margin-bottom: 12px"
            >Heading 3 — Syne 600</span
          >
          <h3 class="text-heading-3">Thoughtful spacing scales</h3>
        </div>
        <div>
          <span class="text-label" style="display: block; margin-bottom: 12px"
            >Body — Newsreader 400</span
          >
          <p style="max-width: 640px">
            Good typography is invisible. It guides the reader without interruption, establishing
            hierarchy through contrast and rhythm. The Vitesse system pairs a geometric display
            against a humanist serif body for warmth.
          </p>
        </div>
        <div>
          <span class="text-label" style="display: block; margin-bottom: 12px"
            >Mono — DM Mono 400</span
          >
          <p style="font-family: var(--font-mono); font-size: var(--text-sm)">
            const theme = { accent: '#4d9375', font: 'Syne' }
          </p>
        </div>
      </div>

      <!-- Scale table -->
      <div style="margin-top: 48px">
        <span class="text-label" style="display: block; margin-bottom: 24px"
          >Type Scale Reference</span
        >
        <div style="display: flex; flex-direction: column; gap: 8px">
          <div
            style="
              display: grid;
              grid-template-columns: 100px 60px 1fr;
              gap: 16px;
              padding-bottom: 8px;
              border-bottom: 1px solid var(--color-border);
            "
          >
            <span class="text-label">Token</span><span class="text-label">px</span
            ><span class="text-label">Preview</span>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: 100px 60px 1fr;
              gap: 16px;
              align-items: center;
              padding-block: 4px;
            "
          >
            <code class="text-code" style="display: inline; font-size: 10px">--text-xs</code
            ><span
              style="
                font-family: var(--font-mono);
                font-size: var(--text-xs);
                color: var(--color-fg-muted);
              "
              >12px</span
            ><span style="font-size: var(--text-xs)">Labels, captions, badges</span>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: 100px 60px 1fr;
              gap: 16px;
              align-items: center;
              padding-block: 4px;
            "
          >
            <code class="text-code" style="display: inline; font-size: 10px">--text-sm</code
            ><span
              style="
                font-family: var(--font-mono);
                font-size: var(--text-xs);
                color: var(--color-fg-muted);
              "
              >14px</span
            ><span style="font-size: var(--text-sm)">Secondary text, inputs, buttons</span>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: 100px 60px 1fr;
              gap: 16px;
              align-items: center;
              padding-block: 4px;
            "
          >
            <code class="text-code" style="display: inline; font-size: 10px">--text-base</code
            ><span
              style="
                font-family: var(--font-mono);
                font-size: var(--text-xs);
                color: var(--color-fg-muted);
              "
              >16px</span
            ><span style="font-size: var(--text-base)">Default body copy, paragraphs</span>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: 100px 60px 1fr;
              gap: 16px;
              align-items: center;
              padding-block: 4px;
            "
          >
            <code class="text-code" style="display: inline; font-size: 10px">--text-xl</code
            ><span
              style="
                font-family: var(--font-mono);
                font-size: var(--text-xs);
                color: var(--color-fg-muted);
              "
              >20px</span
            ><span style="font-size: var(--text-xl)">Hero subtitles, lead text</span>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: 100px 60px 1fr;
              gap: 16px;
              align-items: center;
              padding-block: 4px;
            "
          >
            <code class="text-code" style="display: inline; font-size: 10px">--text-3xl</code
            ><span
              style="
                font-family: var(--font-mono);
                font-size: var(--text-xs);
                color: var(--color-fg-muted);
              "
              >30px</span
            ><span
              style="font-size: var(--text-3xl); font-family: var(--font-display); font-weight: 700"
              >Section headings</span
            >
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: 100px 60px 1fr;
              gap: 16px;
              align-items: center;
              padding-block: 4px;
            "
          >
            <code class="text-code" style="display: inline; font-size: 10px">--text-6xl</code
            ><span
              style="
                font-family: var(--font-mono);
                font-size: var(--text-xs);
                color: var(--color-fg-muted);
              "
              >60px</span
            ><span
              style="
                font-size: clamp(32px, 5vw, 60px);
                font-family: var(--font-display);
                font-weight: 800;
                letter-spacing: -0.03em;
                line-height: 1;
              "
              >Hero</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="container-ds">
    <hr class="divider" />
  </div>

  <!-- ─── COMPONENTS ───────────────────────────────────────────────── -->
  <section id="components" class="section">
    <div class="container-ds">
      <span class="text-label">Library</span>
      <h2 class="text-heading-2" style="margin-top: 8px; margin-bottom: 40px">Components</h2>

      <!-- Buttons -->
      <div style="margin-bottom: 48px">
        <span class="text-label" style="display: block; margin-bottom: 24px">Buttons</span>
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 12px">
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-ghost">Ghost</button>
          <button class="btn btn-primary btn-sm">Small</button>
          <button class="btn btn-primary btn-lg">Large</button>
          <button class="btn btn-primary" disabled style="opacity: 0.45; cursor: not-allowed">
            Disabled
          </button>
        </div>
      </div>

      <!-- Badges -->
      <div style="margin-bottom: 48px">
        <span class="text-label" style="display: block; margin-bottom: 24px">Badges</span>
        <div style="display: flex; flex-wrap: wrap; gap: 12px">
          <span class="badge badge-accent">Accent</span>
          <span class="badge badge-blue">Info</span>
          <span class="badge badge-yellow">Warning</span>
          <span class="badge badge-red">Error</span>
          <span class="badge badge-muted">Neutral</span>
        </div>
      </div>

      <!-- Tags -->
      <div style="margin-bottom: 48px">
        <span class="text-label" style="display: block; margin-bottom: 24px">Tags</span>
        <div style="display: flex; flex-wrap: wrap; gap: 8px">
          <span class="tag">tailwindcss</span>
          <span class="tag">vitesse</span>
          <span class="tag">dark-mode</span>
          <span class="tag">responsive</span>
          <span class="tag">design-system</span>
        </div>
      </div>

      <!-- Inputs -->
      <div style="margin-bottom: 48px">
        <span class="text-label" style="display: block; margin-bottom: 24px">Inputs</span>
        <div style="display: flex; flex-direction: column; gap: 16px; max-width: 440px">
          <div style="display: flex; flex-direction: column; gap: 8px">
            <label
              style="font-family: var(--font-display); font-size: var(--text-sm); font-weight: 600"
              >Email address</label
            >
            <input class="input" type="email" placeholder="hello@vitesse.dev" />
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px">
            <label
              style="font-family: var(--font-display); font-size: var(--text-sm); font-weight: 600"
              >Message</label
            >
            <textarea
              class="input"
              rows="3"
              placeholder="Write something..."
              style="resize: vertical"
            />
          </div>
          <button class="btn btn-primary" style="align-self: flex-start">Submit</button>
        </div>
      </div>

      <!-- Alerts -->
      <div style="margin-bottom: 48px">
        <span class="text-label" style="display: block; margin-bottom: 24px">Alerts</span>
        <div style="display: flex; flex-direction: column; gap: 12px; max-width: 560px">
          <div class="alert alert-success">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-vs-green)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              style="flex-shrink: 0; margin-top: 2px"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <div>
              <strong style="font-family: var(--font-display); font-size: var(--text-sm)"
                >Success!</strong
              >
              Your changes have been saved successfully.
            </div>
          </div>
          <div class="alert alert-info">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-vs-blue)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              style="flex-shrink: 0; margin-top: 2px"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div>
              <strong style="font-family: var(--font-display); font-size: var(--text-sm)"
                >Note</strong
              >
              — Dark mode tokens swap automatically via the
              <code class="text-code">.dark</code> class on
              <code class="text-code">&lt;html&gt;</code>.
            </div>
          </div>
          <div class="alert alert-warning">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-vs-yellow-dim)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              style="flex-shrink: 0; margin-top: 2px"
            >
              <path
                d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <strong style="font-family: var(--font-display); font-size: var(--text-sm)"
                >Warning</strong
              >
              — Use semantic tokens, not raw hex values, in component styles.
            </div>
          </div>
          <div class="alert alert-error">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-vs-red)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              style="flex-shrink: 0; margin-top: 2px"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <div>
              <strong style="font-family: var(--font-display); font-size: var(--text-sm)"
                >Error</strong
              >
              — Could not save changes. Please try again.
            </div>
          </div>
        </div>
      </div>

      <!-- Progress -->
      <div style="margin-bottom: 48px">
        <span class="text-label" style="display: block; margin-bottom: 24px">Progress Bars</span>
        <div style="display: flex; flex-direction: column; gap: 16px; max-width: 440px">
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px">
              <span style="font-family: var(--font-display); font-size: var(--text-sm)"
                >Design Tokens</span
              ><span
                style="
                  font-family: var(--font-mono);
                  font-size: var(--text-xs);
                  color: var(--color-fg-muted);
                "
                >100%</span
              >
            </div>
            <div class="progress">
              <div class="progress-bar" style="width: 100%" />
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px">
              <span style="font-family: var(--font-display); font-size: var(--text-sm)"
                >Components</span
              ><span
                style="
                  font-family: var(--font-mono);
                  font-size: var(--text-xs);
                  color: var(--color-fg-muted);
                "
                >72%</span
              >
            </div>
            <div class="progress">
              <div
                class="progress-bar"
                style="width: 72%; background-color: var(--color-vs-blue)"
              />
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px">
              <span style="font-family: var(--font-display); font-size: var(--text-sm)"
                >Documentation</span
              ><span
                style="
                  font-family: var(--font-mono);
                  font-size: var(--text-xs);
                  color: var(--color-fg-muted);
                "
                >48%</span
              >
            </div>
            <div class="progress">
              <div
                class="progress-bar"
                style="width: 48%; background-color: var(--color-vs-yellow-dim)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Avatars + Tooltips -->
      <div style="margin-bottom: 48px">
        <span class="text-label" style="display: block; margin-bottom: 24px"
          >Avatars &amp; Tooltips</span
        >
        <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap">
          <span class="has-tooltip"
            ><span
              class="avatar avatar-sm"
              style="
                background-color: color-mix(in srgb, var(--color-vs-green) 20%, transparent);
                color: var(--color-vs-green);
              "
              >AK</span
            ><span class="tooltip">Akira K.</span></span
          >
          <span class="has-tooltip"
            ><span
              class="avatar avatar-md"
              style="
                background-color: color-mix(in srgb, var(--color-vs-blue) 20%, transparent);
                color: var(--color-vs-blue);
              "
              >VB</span
            ><span class="tooltip">Valentina B.</span></span
          >
          <span class="has-tooltip"
            ><span
              class="avatar avatar-lg"
              style="
                background-color: color-mix(in srgb, var(--color-vs-purple) 20%, transparent);
                color: var(--color-vs-purple);
              "
              >DS</span
            ><span class="tooltip">Design System</span></span
          >
          <!-- Stacked -->
          <div style="display: flex">
            <span
              class="avatar avatar-md"
              style="
                background-color: color-mix(in srgb, var(--color-vs-green) 20%, transparent);
                color: var(--color-vs-green);
                border: 2px solid var(--color-bg);
              "
              >JK</span
            >
            <span
              class="avatar avatar-md"
              style="
                background-color: color-mix(in srgb, var(--color-vs-blue) 20%, transparent);
                color: var(--color-vs-blue);
                border: 2px solid var(--color-bg);
                margin-left: -10px;
              "
              >TL</span
            >
            <span
              class="avatar avatar-md"
              style="
                background-color: color-mix(in srgb, var(--color-vs-orange) 20%, transparent);
                color: var(--color-vs-orange);
                border: 2px solid var(--color-bg);
                margin-left: -10px;
              "
              >MR</span
            >
            <span
              class="avatar avatar-md"
              style="
                background-color: var(--color-bg-muted);
                border: 2px solid var(--color-bg);
                margin-left: -10px;
                font-size: var(--text-xs);
              "
              >+4</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="container-ds">
    <hr class="divider" />
  </div>

  <!-- ─── SPACING SYSTEM ────────────────────────────────────────────── -->
  <section id="spacing" class="section">
    <div class="container-ds">
      <span class="text-label">Foundation</span>
      <h2 class="text-heading-2" style="margin-top: 8px; margin-bottom: 12px">Spacing System</h2>
      <p style="color: var(--color-fg-muted); max-width: 520px; margin-bottom: 40px">
        Base-4 scale with semantic intent tokens. Prefer
        <code class="text-code">--spacing-card-gap</code> over
        <code class="text-code">--spacing-6</code> so intent is clear at a glance.
      </p>

      <!-- Visual scale -->
      <span class="text-label" style="display: block; margin-bottom: 24px"
        >Raw Scale (4px base)</span
      >
      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 48px">
        <div
          style="
            display: grid;
            grid-template-columns: 110px 60px 1fr;
            gap: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--color-border);
          "
        >
          <span class="text-label">Token</span><span class="text-label">Value</span
          ><span class="text-label">Visual</span>
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: 110px 60px 1fr;
            gap: 16px;
            align-items: center;
          "
        >
          <code class="text-code" style="display: inline; font-size: 10px">--spacing-1</code
          ><span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >4px</span
          >
          <div
            style="height: 10px; width: 4px; background: var(--color-vs-green); border-radius: 2px"
          />
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: 110px 60px 1fr;
            gap: 16px;
            align-items: center;
          "
        >
          <code class="text-code" style="display: inline; font-size: 10px">--spacing-2</code
          ><span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >8px</span
          >
          <div
            style="height: 10px; width: 8px; background: var(--color-vs-green); border-radius: 2px"
          />
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: 110px 60px 1fr;
            gap: 16px;
            align-items: center;
          "
        >
          <code class="text-code" style="display: inline; font-size: 10px">--spacing-4</code
          ><span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >16px</span
          >
          <div
            style="height: 10px; width: 16px; background: var(--color-vs-green); border-radius: 2px"
          />
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: 110px 60px 1fr;
            gap: 16px;
            align-items: center;
          "
        >
          <code class="text-code" style="display: inline; font-size: 10px">--spacing-6</code
          ><span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >24px</span
          >
          <div
            style="height: 10px; width: 24px; background: var(--color-vs-blue); border-radius: 2px"
          />
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: 110px 60px 1fr;
            gap: 16px;
            align-items: center;
          "
        >
          <code class="text-code" style="display: inline; font-size: 10px">--spacing-8</code
          ><span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >32px</span
          >
          <div
            style="height: 10px; width: 32px; background: var(--color-vs-blue); border-radius: 2px"
          />
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: 110px 60px 1fr;
            gap: 16px;
            align-items: center;
          "
        >
          <code class="text-code" style="display: inline; font-size: 10px">--spacing-12</code
          ><span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >48px</span
          >
          <div
            style="
              height: 10px;
              width: 48px;
              background: var(--color-vs-yellow-dim);
              border-radius: 2px;
            "
          />
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: 110px 60px 1fr;
            gap: 16px;
            align-items: center;
          "
        >
          <code class="text-code" style="display: inline; font-size: 10px">--spacing-20</code
          ><span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >80px</span
          >
          <div
            style="
              height: 10px;
              width: 80px;
              background: var(--color-vs-yellow-dim);
              border-radius: 2px;
            "
          />
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: 110px 60px 1fr;
            gap: 16px;
            align-items: center;
          "
        >
          <code class="text-code" style="display: inline; font-size: 10px">--spacing-32</code
          ><span
            style="
              font-family: var(--font-mono);
              font-size: var(--text-xs);
              color: var(--color-fg-muted);
            "
            >128px</span
          >
          <div
            style="
              height: 10px;
              width: 128px;
              background: var(--color-vs-orange);
              border-radius: 2px;
            "
          />
        </div>
      </div>

      <!-- Semantic spacing -->
      <div
        style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
        "
      >
        <div class="card card-sm">
          <span class="text-label" style="display: block; margin-bottom: 12px"
            >Section Spacing</span
          >
          <div style="display: flex; flex-direction: column; gap: 8px">
            <div style="display: flex; justify-content: space-between">
              <code class="text-code" style="display: inline; font-size: 10px"
                >--spacing-section-sm</code
              ><span
                style="
                  font-family: var(--font-mono);
                  font-size: var(--text-xs);
                  color: var(--color-fg-muted);
                "
                >48px</span
              >
            </div>
            <div style="display: flex; justify-content: space-between">
              <code class="text-code" style="display: inline; font-size: 10px"
                >--spacing-section-md</code
              ><span
                style="
                  font-family: var(--font-mono);
                  font-size: var(--text-xs);
                  color: var(--color-fg-muted);
                "
                >80px</span
              >
            </div>
            <div style="display: flex; justify-content: space-between">
              <code class="text-code" style="display: inline; font-size: 10px"
                >--spacing-section-lg</code
              ><span
                style="
                  font-family: var(--font-mono);
                  font-size: var(--text-xs);
                  color: var(--color-fg-muted);
                "
                >128px</span
              >
            </div>
          </div>
        </div>
        <div class="card card-sm">
          <span class="text-label" style="display: block; margin-bottom: 12px">Card Spacing</span>
          <div style="display: flex; flex-direction: column; gap: 8px">
            <div style="display: flex; justify-content: space-between">
              <code class="text-code" style="display: inline; font-size: 10px"
                >--spacing-card-gap</code
              ><span
                style="
                  font-family: var(--font-mono);
                  font-size: var(--text-xs);
                  color: var(--color-fg-muted);
                "
                >24px gap</span
              >
            </div>
            <div style="display: flex; justify-content: space-between">
              <code class="text-code" style="display: inline; font-size: 10px"
                >--spacing-card-pad</code
              ><span
                style="
                  font-family: var(--font-mono);
                  font-size: var(--text-xs);
                  color: var(--color-fg-muted);
                "
                >32px pad</span
              >
            </div>
            <div style="display: flex; justify-content: space-between">
              <code class="text-code" style="display: inline; font-size: 10px"
                >--spacing-card-pad-sm</code
              ><span
                style="
                  font-family: var(--font-mono);
                  font-size: var(--text-xs);
                  color: var(--color-fg-muted);
                "
                >20px pad</span
              >
            </div>
          </div>
        </div>
        <div class="card card-sm">
          <span class="text-label" style="display: block; margin-bottom: 12px">Stack / Inline</span>
          <div style="display: flex; flex-direction: column; gap: 8px">
            <div style="display: flex; justify-content: space-between">
              <code class="text-code" style="display: inline; font-size: 10px"
                >--spacing-stack-sm</code
              ><span
                style="
                  font-family: var(--font-mono);
                  font-size: var(--text-xs);
                  color: var(--color-fg-muted);
                "
                >12px</span
              >
            </div>
            <div style="display: flex; justify-content: space-between">
              <code class="text-code" style="display: inline; font-size: 10px"
                >--spacing-stack-md</code
              ><span
                style="
                  font-family: var(--font-mono);
                  font-size: var(--text-xs);
                  color: var(--color-fg-muted);
                "
                >20px</span
              >
            </div>
            <div style="display: flex; justify-content: space-between">
              <code class="text-code" style="display: inline; font-size: 10px"
                >--spacing-stack-lg</code
              ><span
                style="
                  font-family: var(--font-mono);
                  font-size: var(--text-xs);
                  color: var(--color-fg-muted);
                "
                >32px</span
              >
            </div>
            <div style="display: flex; justify-content: space-between">
              <code class="text-code" style="display: inline; font-size: 10px"
                >--spacing-inline-md</code
              ><span
                style="
                  font-family: var(--font-mono);
                  font-size: var(--text-xs);
                  color: var(--color-fg-muted);
                "
                >16px</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="container-ds">
    <hr class="divider" />
  </div>

  <!-- ─── USAGE EXAMPLES ────────────────────────────────────────────── -->
  <section id="examples" class="section">
    <div class="container-ds">
      <span class="text-label">In Practice</span>
      <h2 class="text-heading-2" style="margin-top: 8px; margin-bottom: 12px">Usage Examples</h2>
      <p style="color: var(--color-fg-muted); max-width: 520px; margin-bottom: 40px">
        Real-world patterns showing how tokens compose into interfaces.
      </p>

      <!-- Example 1: Stat Grid -->
      <div style="margin-bottom: 64px">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 24px;
          "
        >
          <h3 class="text-heading-3">1 — Dashboard Stat Grid</h3>
          <span class="badge badge-muted">gap: --spacing-card-gap (24px)</span>
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: var(--spacing-card-gap);
          "
        >
          <div class="stat-card">
            <span class="stat-label">Monthly Revenue</span
            ><span class="stat-value" style="color: var(--color-vs-green)">$48.2k</span
            ><span class="stat-delta up">↑ 12.4% vs last month</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Active Users</span><span class="stat-value">3,291</span
            ><span class="stat-delta up">↑ 8.1%</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Churn Rate</span
            ><span class="stat-value" style="color: var(--color-vs-red)">2.4%</span
            ><span class="stat-delta down">↓ 0.3%</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Avg. Session</span><span class="stat-value">4m 12s</span
            ><span class="stat-delta up">↑ 22s</span>
          </div>
        </div>
      </div>

      <!-- Example 2: Feature Cards -->
      <div style="margin-bottom: 64px">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 24px;
          "
        >
          <h3 class="text-heading-3">2 — Feature Cards</h3>
          <span class="badge badge-muted">pad: --spacing-card-pad (32px)</span>
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: var(--spacing-card-gap);
          "
        >
          <div class="card">
            <div
              style="
                width: 40px;
                height: 40px;
                border-radius: var(--radius-md);
                background: color-mix(in srgb, var(--color-vs-green) 15%, transparent);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
              "
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-vs-green)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <h4 class="text-heading-3" style="margin-bottom: 12px">Design Tokens</h4>
            <p style="color: var(--color-fg-muted); font-size: var(--text-sm); margin-bottom: 20px">
              A single source of truth for all visual decisions — spacing, color, typography,
              radius, and shadow.
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap">
              <span class="tag">tokens</span><span class="tag">css-vars</span>
            </div>
          </div>
          <div class="card">
            <div
              style="
                width: 40px;
                height: 40px;
                border-radius: var(--radius-md);
                background: color-mix(in srgb, var(--color-vs-blue) 15%, transparent);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
              "
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-vs-blue)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path
                  d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                />
              </svg>
            </div>
            <h4 class="text-heading-3" style="margin-bottom: 12px">Dark Mode</h4>
            <p style="color: var(--color-fg-muted); font-size: var(--text-sm); margin-bottom: 20px">
              Semantic aliases swap between light and dark with a single
              <code class="text-code">.dark</code> class on
              <code class="text-code">&lt;html&gt;</code>. No media queries needed.
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap">
              <span class="tag">dark-mode</span><span class="tag">semantic</span>
            </div>
          </div>
          <div class="card">
            <div
              style="
                width: 40px;
                height: 40px;
                border-radius: var(--radius-md);
                background: color-mix(in srgb, var(--color-vs-purple) 15%, transparent);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
              "
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-vs-purple)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <h4 class="text-heading-3" style="margin-bottom: 12px">Responsive</h4>
            <p style="color: var(--color-fg-muted); font-size: var(--text-sm); margin-bottom: 20px">
              Fluid type scales, auto-fill grids, and adaptive container padding work seamlessly
              from 320px to 1440px.
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap">
              <span class="tag">mobile</span><span class="tag">fluid</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Example 3: Article List -->
      <div style="margin-bottom: 64px">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 24px;
          "
        >
          <h3 class="text-heading-3">3 — Article / Content List</h3>
          <span class="badge badge-muted">stack: --spacing-stack-md (20px)</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-stack-md)">
          <article
            style="
              display: flex;
              gap: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid var(--color-border);
            "
          >
            <div
              style="
                flex-shrink: 0;
                width: 48px;
                height: 48px;
                border-radius: var(--radius-md);
                background: color-mix(in srgb, var(--color-vs-green) 15%, transparent);
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--font-display);
                font-weight: 800;
                color: var(--color-vs-green);
                font-size: var(--text-xl);
              "
            >
              1
            </div>
            <div style="flex: 1; min-width: 0">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px">
                <span class="badge badge-accent">Tutorial</span
                ><span
                  style="
                    font-family: var(--font-mono);
                    font-size: var(--text-xs);
                    color: var(--color-fg-muted);
                  "
                  >Feb 18, 2025</span
                >
              </div>
              <h4
                style="
                  font-family: var(--font-display);
                  font-weight: 600;
                  font-size: var(--text-lg);
                  margin-bottom: 8px;
                "
              >
                Getting started with Tailwind CSS 4 @theme
              </h4>
              <p style="font-size: var(--text-sm); color: var(--color-fg-muted); line-height: 1.6">
                How the new @theme directive replaces tailwind.config.js and brings CSS-native
                variables to your design system.
              </p>
            </div>
          </article>
          <article
            style="
              display: flex;
              gap: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid var(--color-border);
            "
          >
            <div
              style="
                flex-shrink: 0;
                width: 48px;
                height: 48px;
                border-radius: var(--radius-md);
                background: color-mix(in srgb, var(--color-vs-blue) 15%, transparent);
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--font-display);
                font-weight: 800;
                color: var(--color-vs-blue);
                font-size: var(--text-xl);
              "
            >
              2
            </div>
            <div style="flex: 1; min-width: 0">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px">
                <span class="badge badge-blue">Deep Dive</span
                ><span
                  style="
                    font-family: var(--font-mono);
                    font-size: var(--text-xs);
                    color: var(--color-fg-muted);
                  "
                  >Feb 12, 2025</span
                >
              </div>
              <h4
                style="
                  font-family: var(--font-display);
                  font-weight: 600;
                  font-size: var(--text-lg);
                  margin-bottom: 8px;
                "
              >
                Semantic color tokens for dark mode
              </h4>
              <p style="font-size: var(--text-sm); color: var(--color-fg-muted); line-height: 1.6">
                Why you should never use raw color values in components, and how aliases make theme
                switching painless.
              </p>
            </div>
          </article>
          <article style="display: flex; gap: 20px">
            <div
              style="
                flex-shrink: 0;
                width: 48px;
                height: 48px;
                border-radius: var(--radius-md);
                background: color-mix(in srgb, var(--color-vs-purple) 15%, transparent);
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--font-display);
                font-weight: 800;
                color: var(--color-vs-purple);
                font-size: var(--text-xl);
              "
            >
              3
            </div>
            <div style="flex: 1; min-width: 0">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px">
                <span class="badge badge-muted">Opinion</span
                ><span
                  style="
                    font-family: var(--font-mono);
                    font-size: var(--text-xs);
                    color: var(--color-fg-muted);
                  "
                  >Feb 6, 2025</span
                >
              </div>
              <h4
                style="
                  font-family: var(--font-display);
                  font-weight: 600;
                  font-size: var(--text-lg);
                  margin-bottom: 8px;
                "
              >
                The case for editorial typography on the web
              </h4>
              <p style="font-size: var(--text-sm); color: var(--color-fg-muted); line-height: 1.6">
                Serif body fonts, large display headings, and generous white-space — a different
                direction for developer-focused UIs.
              </p>
            </div>
          </article>
        </div>
      </div>

      <!-- Example 4: Team Cards -->
      <div style="margin-bottom: 64px">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 24px;
          "
        >
          <h3 class="text-heading-3">4 — Team / Profile Cards</h3>
          <span class="badge badge-muted">pad: --spacing-card-pad (32px)</span>
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: var(--spacing-card-gap);
          "
        >
          <div class="card" style="text-align: center; padding: 32px 24px">
            <span
              class="avatar avatar-lg"
              style="
                margin: 0 auto 16px;
                background: color-mix(in srgb, var(--color-vs-green) 20%, transparent);
                color: var(--color-vs-green);
                display: flex;
              "
              >AK</span
            >
            <h4
              style="
                font-family: var(--font-display);
                font-weight: 700;
                font-size: var(--text-base);
                margin-bottom: 4px;
              "
            >
              Akira Kobayashi
            </h4>
            <p style="font-size: var(--text-sm); color: var(--color-fg-muted); margin-bottom: 16px">
              Design Systems Lead
            </p>
            <div style="display: flex; justify-content: center; gap: 8px">
              <span class="tag">Figma</span><span class="tag">CSS</span>
            </div>
          </div>
          <div class="card" style="text-align: center; padding: 32px 24px">
            <span
              class="avatar avatar-lg"
              style="
                margin: 0 auto 16px;
                background: color-mix(in srgb, var(--color-vs-blue) 20%, transparent);
                color: var(--color-vs-blue);
                display: flex;
              "
              >VB</span
            >
            <h4
              style="
                font-family: var(--font-display);
                font-weight: 700;
                font-size: var(--text-base);
                margin-bottom: 4px;
              "
            >
              Valentina Brun
            </h4>
            <p style="font-size: var(--text-sm); color: var(--color-fg-muted); margin-bottom: 16px">
              Frontend Engineer
            </p>
            <div style="display: flex; justify-content: center; gap: 8px">
              <span class="tag">Vue</span><span class="tag">TypeScript</span>
            </div>
          </div>
          <div class="card" style="text-align: center; padding: 32px 24px">
            <span
              class="avatar avatar-lg"
              style="
                margin: 0 auto 16px;
                background: color-mix(in srgb, var(--color-vs-orange) 20%, transparent);
                color: var(--color-vs-orange);
                display: flex;
              "
              >MR</span
            >
            <h4
              style="
                font-family: var(--font-display);
                font-weight: 700;
                font-size: var(--text-base);
                margin-bottom: 4px;
              "
            >
              Mateo Reyes
            </h4>
            <p style="font-size: var(--text-sm); color: var(--color-fg-muted); margin-bottom: 16px">
              Product Manager
            </p>
            <div style="display: flex; justify-content: center; gap: 8px">
              <span class="tag">Strategy</span><span class="tag">UX</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Example 5: Sidebar Layout -->
      <div style="margin-bottom: 64px">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 24px;
          "
        >
          <h3 class="text-heading-3">5 — Responsive Sidebar Layout</h3>
          <span class="badge badge-muted">section: --spacing-section-sm (48px)</span>
        </div>
        <div
          id="sidebar-layout"
          style="display: grid; grid-template-columns: 1fr; gap: 24px; align-items: start"
        >
          <div
            style="
              background: var(--color-bg-subtle);
              border: 1px solid var(--color-border);
              border-radius: var(--radius-lg);
              padding: 20px;
            "
          >
            <p class="text-label" style="margin-bottom: 16px">Navigation</p>
            <div style="display: flex; flex-direction: column; gap: 4px">
              <a href="#" class="nav-link active">Overview</a>
              <a href="#" class="nav-link">Analytics</a>
              <a href="#" class="nav-link">Components</a>
              <a href="#" class="nav-link">Settings</a>
            </div>
            <hr class="divider" style="margin-block: 16px" />
            <div style="display: flex; flex-direction: column; gap: 4px">
              <a href="#" class="nav-link">Documentation</a>
              <a href="#" class="nav-link">Changelog</a>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 20px">
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 12px;
              "
            >
              <div>
                <h3
                  style="
                    font-family: var(--font-display);
                    font-weight: 700;
                    font-size: var(--text-xl);
                  "
                >
                  Overview
                </h3>
                <p style="font-size: var(--text-sm); color: var(--color-fg-muted)">
                  Design system health and adoption
                </p>
              </div>
              <button class="btn btn-primary btn-sm">+ New Token</button>
            </div>
            <div
              style="
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                gap: 12px;
              "
            >
              <div class="stat-card">
                <span class="stat-label">Tokens</span
                ><span
                  class="stat-value"
                  style="font-size: var(--text-3xl); color: var(--color-vs-green)"
                  >64</span
                >
              </div>
              <div class="stat-card">
                <span class="stat-label">Components</span
                ><span class="stat-value" style="font-size: var(--text-3xl)">18</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Coverage</span
                ><span
                  class="stat-value"
                  style="font-size: var(--text-3xl); color: var(--color-vs-blue)"
                  >94%</span
                >
              </div>
            </div>
            <div class="alert alert-success">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-vs-green)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                style="flex-shrink: 0; margin-top: 2px"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style="font-size: var(--text-sm)"
                >All systems nominal. Last update 3 minutes ago.</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Example 6: Code Snippet -->
      <div>
        <h3 class="text-heading-3" style="margin-bottom: 24px">6 — Quick-Reference Token Usage</h3>
        <div class="code-block">
          <span style="color: var(--color-fg-muted)"
            >/* ── How to use design tokens ───────────────────────────── */</span
          >

          <span style="color: var(--color-vs-blue)">.page-section</span> {
          <span style="color: var(--color-vs-green)">padding-block</span>:
          <span style="color: var(--color-vs-yellow)">var(--spacing-section-md)</span>;
          <span style="color: var(--color-fg-muted)">/* 80px */</span>
          }

          <span style="color: var(--color-vs-blue)">.card-grid</span> {
          <span style="color: var(--color-vs-green)">display</span>:
          <span style="color: var(--color-vs-yellow)">grid</span>;
          <span style="color: var(--color-vs-green)">grid-template-columns</span>:
          <span style="color: var(--color-vs-yellow)">repeat(auto-fill, minmax(280px, 1fr))</span>;
          <span style="color: var(--color-vs-green)">gap</span>:
          <span style="color: var(--color-vs-yellow)">var(--spacing-card-gap)</span>;
          <span style="color: var(--color-fg-muted)">/* 24px */</span>
          }

          <span style="color: var(--color-vs-blue)">.card</span> {
          <span style="color: var(--color-vs-green)">background-color</span>:
          <span style="color: var(--color-vs-yellow)">var(--color-bg-subtle)</span>;
          <span style="color: var(--color-fg-muted)">/* auto */</span>
          <span style="color: var(--color-vs-green)">border</span>:
          <span style="color: var(--color-vs-yellow)">1px solid var(--color-border)</span>;
          <span style="color: var(--color-vs-green)">border-radius</span>:
          <span style="color: var(--color-vs-yellow)">var(--radius-lg)</span>;
          <span style="color: var(--color-fg-muted)">/* 12px */</span>
          <span style="color: var(--color-vs-green)">padding</span>:
          <span style="color: var(--color-vs-yellow)">var(--spacing-card-pad)</span>;
          <span style="color: var(--color-fg-muted)">/* 32px */</span>
          }

          <span style="color: var(--color-vs-blue)">.content-stack</span> {
          <span style="color: var(--color-vs-green)">display</span>:
          <span style="color: var(--color-vs-yellow)">flex</span>;
          <span style="color: var(--color-vs-green)">flex-direction</span>:
          <span style="color: var(--color-vs-yellow)">column</span>;
          <span style="color: var(--color-vs-green)">gap</span>:
          <span style="color: var(--color-vs-yellow)">var(--spacing-stack-md)</span>;
          <span style="color: var(--color-fg-muted)">/* 20px */</span>
          }

          <span style="color: var(--color-fg-muted)"
            >/* ── Toggle dark mode ──────────────────────────────────── */</span
          >
          <span style="color: var(--color-vs-teal)">document</span>.<span
            style="color: var(--color-vs-blue)"
            >documentElement</span
          >.<span style="color: var(--color-vs-green)">classList</span>.<span
            style="color: var(--color-vs-teal)"
            >toggle</span
          >(<span style="color: var(--color-vs-yellow)">'dark'</span>);
        </div>
      </div>
    </div>
  </section>

  <!-- ─── FOOTER ───────────────────────────────────────────────────── -->
  <footer style="margin-top: 80px; border-top: 1px solid var(--color-border); padding-block: 40px">
    <div
      class="container-ds"
      style="
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
      "
    >
      <div style="display: flex; align-items: center; gap: 10px">
        <span
          style="
            width: 24px;
            height: 24px;
            background: var(--color-vs-green);
            border-radius: var(--radius-sm);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-family: var(--font-display);
            font-weight: 800;
            color: #fff;
            font-size: 11px;
          "
          >V</span
        >
        <span style="font-family: var(--font-display); font-weight: 700; font-size: var(--text-sm)"
          >Vitesse Design System</span
        >
        <span class="badge badge-muted">v1.0</span>
      </div>
      <p
        style="
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--color-fg-muted);
        "
      >
        Tailwind CSS 4 · Vitesse palette · Syne + Newsreader + DM Mono
      </p>
    </div>
  </footer>
</template>
