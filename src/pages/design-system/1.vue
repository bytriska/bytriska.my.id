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
      class="container-ds flex items-center justify-between gap-4 h-14"
    >
      <a
        href="#"
        class="flex items-center gap-2 shrink-0 no-underlin font-display"
      >
        <span class="bg-ds-green size-6 rounded-md flex items-center justify-center text-white">V</span>
        <span>Vitesse DS</span
        >
      </a>
      <nav class="flex items-center gap-0.5 overflow-x-auto">
        <a href="#tokens" class="nav-link active">Tokens</a>
        <a href="#typography" class="nav-link">Type</a>
        <a href="#components" class="nav-link">Components</a>
        <a href="#spacing" class="nav-link">Spacing</a>
        <a href="#examples" class="nav-link">Examples</a>
      </nav>
      <button @click="toggleTheme" class="btn btn-secondary btn-sm shrink-0">
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
          class="hidden"
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
        <span ref="themeLabel" class="ml-2">Dark</span>
      </button>
    </div>
  </header>

  <!-- ─── HERO ─────────────────────────────────────────────────────── -->
  <section class="section-lg">
    <div class="container-ds">
      <div class="max-w-[680px]">
        <span class="badge badge-accent mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-current" />
          Design System v1.0
        </span>
        <h1 class="text-display anim-fade-up anim-d1 mb-6">
          Vitesse<br /><span class="text-accent">Design System</span>
        </h1>
        <p
          class="anim-fade-up anim-d2 text-xl text-muted max-w-[520px] mb-8"
        >
          A minimal, precise design language built on Tailwind CSS 4
          <code class="text-code">@theme</code> — dark/light aware, fully responsive, and rooted in
          the Vitesse color palette.
        </p>
        <div class="anim-fade-up anim-d3 flex flex-wrap gap-3">
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
      <h2 class="text-heading-2 mt-2 mb-3">Color Tokens</h2>
      <p class="text-muted max-w-[520px] mb-10">
        Semantic aliases adapt automatically between light and dark. Raw palette values from Vitesse
        are always constant.
      </p>

      <!-- Semantic backgrounds -->
      <h3 class="text-label mb-4">Semantic — Backgrounds</h3>
      <div
        class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 mb-12"
      >
        <div class="card card-sm flex flex-col gap-3">
          <div
            class="h-10 rounded-[var(--radius-md)] bg-subtle border border-[var(--color-border)]"
          />
          <code class="text-code">--color-bg</code>
          <span class="text-[var(--text-xs)] text-muted"
            >Page background</span
          >
        </div>
        <div class="card card-sm flex flex-col gap-3">
          <div
            class="h-10 rounded-[var(--radius-md)] bg-subtle border border-[var(--color-border)]"
          />
          <code class="text-code inline">--color-bg-subtle</code>
          <span class="text-[var(--text-xs)] text-[var(--color-fg-muted)]">Card / Panel</span>
        </div>
        <div class="card card-sm flex flex-col gap-3">
          <div
            class="h-10 rounded-md bg-muted-ds border border-[var(--color-border)]"
          />
          <code class="text-code inline">--color-bg-muted</code>
          <span class="text-[var(--text-xs)] text-[var(--color-fg-muted)]"
            >Code / Input bg</span
          >
        </div>
        <div class="card card-sm flex flex-col gap-3">
          <div
            class="h-10 rounded-[var(--radius-md)] bg-[var(--color-bg-emphasis)] border border-[var(--color-border)]"
          />
          <code class="text-code inline">--color-bg-emphasis</code>
          <span class="text-[var(--text-xs)] text-[var(--color-fg-muted)]"
            >Hover / Active bg</span
          >
        </div>
      </div>

      <!-- Vitesse Palette -->
      <h3 class="text-label mb-4">Vitesse Brand Palette</h3>
      <div
        class="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3"
      >
        <div class="flex flex-col gap-2">
          <div
            class="h-[52px] rounded-[var(--radius-md)] bg-[var(--color-vs-green)]"
          />
          <span
            class="font-mono text-xs text-muted"
            >Green · Accent</span
          >
          <span
            class="font-mono text-[var(--text-2xs)] text-muted"
            >#4d9375</span
          >
        </div>
        <div class="flex flex-col gap-2">
          <div
            class="h-[52px] rounded-[var(--radius-md)] bg-[var(--color-vs-green-light)]"
          />
          <span
            class="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--color-fg-muted)]"
            >Green Light</span
          >
          <span
            class="font-[var(--font-mono)] text-[var(--text-2xs)] text-[var(--color-fg-muted)]"
            >#80a665</span
          >
        </div>
        <div class="flex flex-col gap-2">
          <div
            class="h-[52px] rounded-[var(--radius-md)] bg-[var(--color-vs-blue)]"
          />
          <span
            class="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--color-fg-muted)]"
            >Blue</span
          >
          <span
            class="font-[var(--font-mono)] text-[var(--text-2xs)] text-[var(--color-fg-muted)]"
            >#6394bf</span
          >
        </div>
        <div class="flex flex-col gap-2">
          <div
            class="h-[52px] rounded-[var(--radius-md)] bg-[var(--color-vs-yellow)]"
          />
          <span
            class="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--color-fg-muted)]"
            >Yellow</span
          >
          <span
            class="font-[var(--font-mono)] text-[var(--text-2xs)] text-[var(--color-fg-muted)]"
            >#e6cc77</span
          >
        </div>
        <div class="flex flex-col gap-2">
          <div
            class="h-[52px] rounded-[var(--radius-md)] bg-[var(--color-vs-orange)]"
          />
          <span
            class="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--color-fg-muted)]"
            >Orange</span
          >
          <span
            class="font-[var(--font-mono)] text-[var(--text-2xs)] text-[var(--color-fg-muted)]"
            >#d4976c</span
          >
        </div>
        <div class="flex flex-col gap-2">
          <div
            class="h-[52px] rounded-[var(--radius-md)] bg-[var(--color-vs-red)]"
          />
          <span
            class="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--color-fg-muted)]"
            >Red</span
          >
          <span
            class="font-[var(--font-mono)] text-[var(--text-2xs)] text-[var(--color-fg-muted)]"
            >#cb7676</span
          >
        </div>
        <div class="flex flex-col gap-2">
          <div
            class="h-[52px] rounded-[var(--radius-md)] bg-[var(--color-vs-purple)]"
          />
          <span
            class="font-mono text-xs text-muted"
            >Purple</span
          >
          <span
            class="font-mono text-[var(--text-2xs)] text-muted"
            >#d9739f</span
          >
        </div>
        <div class="flex flex-col gap-2">
          <div
            class="h-[52px] rounded-[var(--radius-md)] bg-[var(--color-vs-teal)]"
          />
          <span
            class="font-mono text-xs text-muted"
            >Teal</span
          >
          <span
            class="font-mono text-[var(--text-2xs)] text-muted"
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
      <h2 class="text-heading-2 mt-2 mb-10">Typography</h2>

      <div class="flex flex-col gap-8">
        <div>
          <span class="text-label block mb-4"
            >Display — Syne 800</span
          >
          <p class="text-display">The quick brown fox</p>
        </div>
        <div>
          <span class="text-label block mb-3"
            >Heading 1 — Syne 700</span
          >
          <h1 class="text-heading-1">Minimalist interfaces</h1>
        </div>
        <div>
          <span class="text-label block mb-3"
            >Heading 2 — Syne 600</span
          >
          <h2 class="text-heading-2">Components that breathe</h2>
        </div>
        <div>
          <span class="text-label block mb-3"
            >Heading 3 — Syne 600</span
          >
          <h3 class="text-heading-3">Thoughtful spacing scales</h3>
        </div>
        <div>
          <span class="text-label block mb-3"
            >Body — Newsreader 400</span
          >
          <p class="max-w-2xl">
            Good typography is invisible. It guides the reader without interruption, establishing
            hierarchy through contrast and rhythm. The Vitesse system pairs a geometric display
            against a humanist serif body for warmth.
          </p>
        </div>
        <div>
          <span class="text-label block mb-3"
            >Mono — DM Mono 400</span
          >
          <p class="font-mono text-sm">
            const theme = { accent: '#4d9375', font: 'Syne' }
          </p>
        </div>
      </div>

      <!-- Scale table -->
      <div class="mt-12">
        <span class="text-label block mb-6"
          >Type Scale Reference</span
        >
        <div class="flex flex-col gap-2">
          <div class="grid grid-cols-[100px_60px_1fr] gap-4 pb-2 border-b border-border">
            <span class="text-label">Token</span><span class="text-label">px</span
            ><span class="text-label">Preview</span>
          </div>
          <div class="grid grid-cols-[100px_60px_1fr] gap-4 items-center py-1">
            <code class="text-code inline text-[10px]">--text-xs</code
            ><span class="font-mono text-xs text-muted">12px</span
            ><span class="text-xs">Labels, captions, badges</span>
          </div>
          <div class="grid grid-cols-[100px_60px_1fr] gap-4 items-center py-1">
            <code class="text-code inline text-[10px]">--text-sm</code
            ><span class="font-mono text-xs text-muted">14px</span
            ><span class="text-sm">Secondary text, inputs, buttons</span>
          </div>
          <div class="grid grid-cols-[100px_60px_1fr] gap-4 items-center py-1">
            <code class="text-code inline text-[10px]">--text-base</code
            ><span class="font-mono text-xs text-muted">16px</span
            ><span class="text-base">Default body copy, paragraphs</span>
          </div>
          <div class="grid grid-cols-[100px_60px_1fr] gap-4 items-center py-1">
            <code class="text-code inline text-[10px]">--text-xl</code
            ><span class="font-mono text-xs text-muted">20px</span
            ><span class="text-xl">Hero subtitles, lead text</span>
          </div>
          <div class="grid grid-cols-[100px_60px_1fr] gap-4 items-center py-1">
            <code class="text-code inline text-[10px]">--text-3xl</code
            ><span class="font-mono text-xs text-muted">30px</span
            ><span class="text-3xl font-display font-bold">Section headings</span
            >
          </div>
          <div class="grid grid-cols-[100px_60px_1fr] gap-4 items-center py-1">
            <code class="text-code inline text-[10px]">--text-6xl</code
            ><span class="font-mono text-xs text-muted">60px</span
            ><span class="text-[clamp(32px,5vw,60px)] font-display font-extrabold tracking-[-0.03em] leading-none">Hero</span>
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
      <h2 class="text-heading-2 mt-2 mb-10">Components</h2>

      <!-- Buttons -->
      <div class="mb-12">
        <span class="text-label block mb-6">Buttons</span>
        <div class="flex flex-wrap items-center gap-3">
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-ghost">Ghost</button>
          <button class="btn btn-primary btn-sm">Small</button>
          <button class="btn btn-primary btn-lg">Large</button>
          <button class="btn btn-primary opacity-45 cursor-not-allowed" disabled>
            Disabled
          </button>
        </div>
      </div>

      <!-- Badges -->
      <div class="mb-12">
        <span class="text-label block mb-6">Badges</span>
        <div class="flex flex-wrap gap-3">
          <span class="badge badge-accent">Accent</span>
          <span class="badge badge-blue">Info</span>
          <span class="badge badge-yellow">Warning</span>
          <span class="badge badge-red">Error</span>
          <span class="badge badge-muted">Neutral</span>
        </div>
      </div>

      <!-- Tags -->
      <div class="mb-12">
        <span class="text-label block mb-6">Tags</span>
        <div class="flex flex-wrap gap-2">
          <span class="tag">tailwindcss</span>
          <span class="tag">vitesse</span>
          <span class="tag">dark-mode</span>
          <span class="tag">responsive</span>
          <span class="tag">design-system</span>
        </div>
      </div>

      <!-- Inputs -->
      <div class="mb-12">
        <span class="text-label block mb-6">Inputs</span>
        <div class="flex flex-col gap-4 max-w-[440px]">
          <div class="flex flex-col gap-2">
            <label class="font-display text-sm font-semibold"
              >Email address</label
            >
            <input class="input" type="email" placeholder="hello@vitesse.dev" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-display text-sm font-semibold"
              >Message</label
            >
            <textarea
              class="input resize-y"
              rows="3"
              placeholder="Write something..."
            />
          </div>
          <button class="btn btn-primary self-start">Submit</button>
        </div>
      </div>

      <!-- Alerts -->
      <div class="mb-12">
        <span class="text-label block mb-6">Alerts</span>
        <div class="flex flex-col gap-3 max-w-[560px]">
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
              class="flex-shrink-0 mt-0.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <div>
              <strong class="font-display text-sm">Success!</strong
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
              class="flex-shrink-0 mt-0.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div>
              <strong class="font-display text-sm">Note</strong
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
              class="flex-shrink-0 mt-0.5"
            >
              <path
                d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <strong class="font-display text-sm">Warning</strong
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
              class="flex-shrink-0 mt-0.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <div>
              <strong class="font-display text-sm">Error</strong
              >
              — Could not save changes. Please try again.
            </div>
          </div>
        </div>
      </div>

      <!-- Progress -->
      <div class="mb-12">
        <span class="text-label block mb-6">Progress Bars</span>
        <div class="flex flex-col gap-4 max-w-[440px]">
          <div>
            <div class="flex justify-between mb-2">
              <span class="font-display text-sm">Design Tokens</span
              ><span class="font-mono text-xs text-muted">100%</span
              >
            </div>
            <div class="progress">
              <div class="progress-bar w-full" />
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-2">
              <span class="font-display text-sm">Components</span
              ><span class="font-mono text-xs text-muted">72%</span
              >
            </div>
            <div class="progress">
              <div
                class="progress-bar w-[72%] bg-[var(--color-vs-blue)]"
              />
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-2">
              <span class="font-display text-sm">Documentation</span
              ><span class="font-mono text-xs text-muted">48%</span
              >
            </div>
            <div class="progress">
              <div
                class="progress-bar w-[48%] bg-[var(--color-vs-yellow-dim)]"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Avatars + Tooltips -->
      <div class="mb-12">
        <span class="text-label block mb-6"
          >Avatars &amp; Tooltips</span
        >
        <div class="flex items-center gap-4 flex-wrap">
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
          <div class="flex">
            <span
              class="avatar avatar-md bg-[color-mix(in_srgb,var(--color-vs-green)_20%,transparent)] text-[var(--color-vs-green)] border-2 border-[var(--color-bg)]"
              >JK</span
            >
            <span
              class="avatar avatar-md bg-[color-mix(in_srgb,var(--color-vs-blue)_20%,transparent)] text-[var(--color-vs-blue)] border-2 border-[var(--color-bg)] -ml-2.5"
              >TL</span
            >
            <span
              class="avatar avatar-md bg-[color-mix(in_srgb,var(--color-vs-orange)_20%,transparent)] text-[var(--color-vs-orange)] border-2 border-[var(--color-bg)] -ml-2.5"
              >MR</span
            >
            <span
              class="avatar avatar-md bg-muted-ds border-2 border-[var(--color-bg)] -ml-2.5 text-[var(--text-xs)]"
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
      <h2 class="text-heading-2 mt-2 mb-3">Spacing System</h2>
      <p class="text-muted max-w-[520px] mb-10">
        Base-4 scale with semantic intent tokens. Prefer
        <code class="text-code">--spacing-card-gap</code> over
        <code class="text-code">--spacing-6</code> so intent is clear at a glance.
      </p>

      <!-- Visual scale -->
      <span class="text-label block mb-6"
        >Raw Scale (4px base)</span
      >
      <div class="flex flex-col gap-2 mb-12">
        <div class="grid grid-cols-[110px_60px_1fr] gap-4 pb-2 border-b border-[var(--color-border)]">
          <span class="text-label">Token</span><span class="text-label">Value</span
          ><span class="text-label">Visual</span>
        </div>
        <div
          class="grid grid-cols-[110px_60px_1fr] gap-4 items-center"
        >
          <code class="text-code inline text-[10px]">--spacing-1</code
          ><span class="font-mono text-[var(--text-xs)] text-muted">4px</span
          >
          <div class="h-[10px] w-[4px] bg-[var(--color-vs-green)] rounded-[2px]" />
        </div>
        <div class="grid grid-cols-[110px_60px_1fr] gap-4 items-center">
          <code class="text-code inline text-[10px]">--spacing-2</code
          ><span class="font-mono text-[var(--text-xs)] text-muted">8px</span
          >
          <div class="h-[10px] w-[8px] bg-[var(--color-vs-green)] rounded-[2px]" />
        </div>
        <div class="grid grid-cols-[110px_60px_1fr] gap-4 items-center">
          <code class="text-code inline text-[10px]">--spacing-4</code
          ><span class="font-mono text-[var(--text-xs)] text-muted">16px</span
          >
          <div class="h-[10px] w-[16px] bg-[var(--color-vs-green)] rounded-[2px]" />
        </div>
        <div class="grid grid-cols-[110px_60px_1fr] gap-4 items-center">
          <code class="text-code inline text-[10px]">--spacing-6</code
          ><span class="font-mono text-[var(--text-xs)] text-muted">24px</span
          >
          <div class="h-[10px] w-[24px] bg-[var(--color-vs-blue)] rounded-[2px]" />
        </div>
        <div class="grid grid-cols-[110px_60px_1fr] gap-4 items-center">
          <code class="text-code inline text-[10px]">--spacing-8</code
          ><span class="font-mono text-[var(--text-xs)] text-muted">32px</span
          >
          <div class="h-[10px] w-[32px] bg-[var(--color-vs-blue)] rounded-[2px]" />
        </div>
        <div class="grid grid-cols-[110px_60px_1fr] gap-4 items-center">
          <code class="text-code inline text-[10px]">--spacing-12</code
          ><span class="font-mono text-[var(--text-xs)] text-muted">48px</span
          >
          <div class="h-[10px] w-[48px] bg-[var(--color-vs-yellow-dim)] rounded-[2px]" />
        </div>
        <div class="grid grid-cols-[110px_60px_1fr] gap-4 items-center">
          <code class="text-code inline text-[10px]">--spacing-20</code
          ><span class="font-mono text-[var(--text-xs)] text-muted">80px</span
          >
          <div class="h-[10px] w-[80px] bg-[var(--color-vs-yellow-dim)] rounded-[2px]" />
        </div>
        <div class="grid grid-cols-[110px_60px_1fr] gap-4 items-center">
          <code class="text-code inline text-[10px]">--spacing-32</code
          ><span class="font-mono text-[var(--text-xs)] text-muted">128px</span
          >
          <div class="h-[10px] w-[128px] bg-[var(--color-vs-orange)] rounded-[2px]" />
        </div>
      </div>

      <!-- Semantic spacing -->
      <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
        <div class="card card-sm">
          <span class="text-label block mb-3"
            >Section Spacing</span
          >
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <code class="text-code inline text-[10px]"
                >--spacing-section-sm</code
              ><span class="font-mono text-[var(--text-xs)] text-muted"
                >48px</span
              >
            </div>
            <div class="flex justify-between">
              <code class="text-code inline text-[10px]"
                >--spacing-section-md</code
              ><span class="font-mono text-[var(--text-xs)] text-muted">80px</span
              >
            </div>
            <div class="flex justify-between">
              <code class="text-code inline text-[10px]"
                >--spacing-section-lg</code
              ><span class="font-mono text-[var(--text-xs)] text-muted">128px</span
              >
            </div>
          </div>
        </div>
        <div class="card card-sm">
          <span class="text-label block mb-3">Card Spacing</span>
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <code class="text-code inline text-[10px]"
                >--spacing-card-gap</code
              ><span class="font-mono text-[var(--text-xs)] text-muted">24px gap</span
              >
            </div>
            <div class="flex justify-between">
              <code class="text-code inline text-[10px]"
                >--spacing-card-pad</code
              ><span class="font-mono text-[var(--text-xs)] text-muted">32px pad</span
              >
            </div>
            <div class="flex justify-between">
              <code class="text-code inline text-[10px]"
                >--spacing-card-pad-sm</code
              ><span class="font-mono text-[var(--text-xs)] text-muted">20px pad</span
              >
            </div>
          </div>
        </div>
        <div class="card card-sm">
          <span class="text-label block mb-3">Stack / Inline</span>
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <code class="text-code inline text-[10px]"
                >--spacing-stack-sm</code
              ><span class="font-mono text-[var(--text-xs)] text-muted">12px</span
              >
            </div>
            <div class="flex justify-between">
              <code class="text-code inline text-[10px]"
                >--spacing-stack-md</code
              ><span class="font-mono text-[var(--text-xs)] text-muted">20px</span
              >
            </div>
            <div class="flex justify-between">
              <code class="text-code inline text-[10px]"
                >--spacing-stack-lg</code
              ><span class="font-mono text-[var(--text-xs)] text-muted">32px</span
              >
            </div>
            <div class="flex justify-between">
              <code class="text-code inline text-[10px]"
                >--spacing-inline-md</code
              ><span class="font-mono text-[var(--text-xs)] text-muted">16px</span
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
      <h2 class="text-heading-2 mt-2 mb-3">Usage Examples</h2>
      <p class="text-muted max-w-[520px] mb-10">
        Real-world patterns showing how tokens compose into interfaces.
      </p>

      <!-- Example 1: Stat Grid -->
      <div class="mb-16">
        <div
          class="flex items-center justify-between flex-wrap gap-3 mb-6"
        >
          <h3 class="text-heading-3">1 — Dashboard Stat Grid</h3>
          <span class="badge badge-muted">gap: --spacing-card-gap (24px)</span>
        </div>
        <div
          class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[var(--spacing-card-gap)]"
        >
          <div class="stat-card">
            <span class="stat-label">Monthly Revenue</span
            ><span class="stat-value text-[var(--color-vs-green)]">$48.2k</span
            ><span class="stat-delta up">↑ 12.4% vs last month</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Active Users</span><span class="stat-value">3,291</span
            ><span class="stat-delta up">↑ 8.1%</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Churn Rate</span
            ><span class="stat-value text-[var(--color-vs-red)]">2.4%</span
            ><span class="stat-delta down">↓ 0.3%</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Avg. Session</span><span class="stat-value">4m 12s</span
            ><span class="stat-delta up">↑ 22s</span>
          </div>
        </div>
      </div>

      <!-- Example 2: Feature Cards -->
      <div class="mb-16">
        <div
          class="flex items-center justify-between flex-wrap gap-3 mb-6"
        >
          <h3 class="text-heading-3">2 — Feature Cards</h3>
          <span class="badge badge-muted">pad: --spacing-card-pad (32px)</span>
        </div>
        <div
          class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[var(--spacing-card-gap)]"
        >
          <div class="card">
            <div
              class="w-10 h-10 rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--color-vs-green)_15%,transparent)] flex items-center justify-center mb-5"
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
            <h4 class="text-heading-3 mb-3">Design Tokens</h4>
            <p class="text-muted text-sm mb-5">
              A single source of truth for all visual decisions — spacing, color, typography,
              radius, and shadow.
            </p>
            <div class="flex gap-2 flex-wrap">
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
            <h4 class="text-heading-3 mb-3">Dark Mode</h4>
            <p class="text-muted text-sm mb-5">
              Semantic aliases swap between light and dark with a single
              <code class="text-code">.dark</code> class on
              <code class="text-code">&lt;html&gt;</code>. No media queries needed.
            </p>
            <div class="flex gap-2 flex-wrap">
              <span class="tag">dark-mode</span><span class="tag">semantic</span>
            </div>
          </div>
          <div class="card">
            <div class="w-10 h-10 rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--color-vs-purple)_15%,transparent)] flex items-center justify-center mb-5">
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
            <h4 class="text-heading-3 mb-3">Responsive</h4>
            <p class="text-muted text-sm mb-5">
              Fluid type scales, auto-fill grids, and adaptive container padding work seamlessly
              from 320px to 1440px.
            </p>
            <div class="flex gap-2 flex-wrap">
              <span class="tag">mobile</span><span class="tag">fluid</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Example 3: Article List -->
      <div class="mb-16">
        <div
          class="flex items-center justify-between flex-wrap gap-3 mb-6"
        >
          <h3 class="text-heading-3">3 — Article / Content List</h3>
          <span class="badge badge-muted">stack: --spacing-stack-md (20px)</span>
        </div>
        <div class="flex flex-col gap-[var(--spacing-stack-md)] pb-[var(--spacing-stack-md)]">
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
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-2">
                <span class="badge badge-accent">Tutorial</span
                ><span class="font-mono text-[var(--text-xs)] text-muted">Feb 18, 2025</span
                >
              </div>
              <h4
                class="font-display font-semibold text-lg mb-2"
              >
                Getting started with Tailwind CSS 4 @theme
              </h4>
              <p class="text-sm text-muted leading-relaxed">
                How the new @theme directive replaces tailwind.config.js and brings CSS-native
                variables to your design system.
              </p>
            </div>
          </article>
          <article
            class="flex gap-5 pb-5 border-b border-[var(--color-border)]"
          >
            <div
              class="flex-shrink-0 w-12 h-12 rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--color-vs-blue)_15%,transparent)] flex items-center justify-center font-display font-black text-[var(--color-vs-blue)] text-xl"
            >
              2
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-2">
                <span class="badge badge-blue">Deep Dive</span
                ><span class="font-mono text-[var(--text-xs)] text-muted">Feb 12, 2025</span
                >
              </div>
              <h4
                class="font-display font-semibold text-lg mb-2"
              >
                Semantic color tokens for dark mode
              </h4>
              <p class="text-sm text-muted leading-relaxed">
                Why you should never use raw color values in components, and how aliases make theme
                switching painless.
              </p>
            </div>
          </article>
          <article class="flex gap-5">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--color-vs-purple)_15%,transparent)] flex items-center justify-center font-display font-black text-[var(--color-vs-purple)] text-xl"
            >
              3
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-2">
                <span class="badge badge-muted">Opinion</span
                ><span
                  class="font-mono text-[var(--text-xs)] text-muted"
                  >Feb 6, 2025</span
                >
              </div>
              <h4
                class="font-display font-semibold text-lg mb-2"
              >
                The case for editorial typography on the web
              </h4>
              <p class="text-sm text-muted leading-relaxed">
                Serif body fonts, large display headings, and generous white-space — a different
                direction for developer-focused UIs.
              </p>
            </div>
          </article>
        </div>
      </div>

      <!-- Example 4: Team Cards -->
      <div class="mb-16">
        <div
          class="flex items-center justify-between flex-wrap gap-3 mb-6"
        >
          <h3 class="text-heading-3">4 — Team / Profile Cards</h3>
          <span class="badge badge-muted">pad: --spacing-card-pad (32px)</span>
        </div>
        <div
          class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-[var(--spacing-card-gap)]"
        >
          <div class="card text-center px-6 py-8">
            <span
              class="avatar avatar-lg mx-auto mb-4 bg-[color-mix(in_srgb,var(--color-vs-green)_20%,transparent)] text-[var(--color-vs-green)] flex"
              >AK</span
            >
            <h4
              class="font-display font-bold text-base mb-1"
            >
              Akira Kobayashi
            </h4>
            <p class="text-sm text-muted mb-4">
              Design Systems Lead
            </p>
            <div class="flex justify-center gap-2">
              <span class="tag">Figma</span><span class="tag">CSS</span>
            </div>
          </div>
          <div class="card text-center px-6 py-8">
            <span
              class="avatar avatar-lg mx-auto mb-4 bg-[color-mix(in_srgb,var(--color-vs-blue)_20%,transparent)] text-[var(--color-vs-blue)] flex"
              >VB</span
            >
            <h4
              class="font-display font-bold text-base mb-1"
            >
              Valentina Brun
            </h4>
            <p class="text-sm text-muted mb-4">
              Frontend Engineer
            </p>
            <div class="flex justify-center gap-2">
              <span class="tag">Vue</span><span class="tag">TypeScript</span>
            </div>
          </div>
          <div class="card text-center px-6 py-8">
            <span
              class="avatar avatar-lg mx-auto mb-4 bg-[color-mix(in_srgb,var(--color-vs-orange)_20%,transparent)] text-[var(--color-vs-orange)] flex"
              >MR</span
            >
            <h4
              class="font-display font-bold text-base mb-1"
            >
              Mateo Reyes
            </h4>
            <p class="text-sm text-muted mb-4">
              Product Manager
            </p>
            <div class="flex justify-center gap-2">
              <span class="tag">Strategy</span><span class="tag">UX</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Example 5: Sidebar Layout -->
      <div class="mb-16">
        <div
          class="flex items-center justify-between flex-wrap gap-3 mb-6"
        >
          <h3 class="text-heading-3">5 — Responsive Sidebar Layout</h3>
          <span class="badge badge-muted">section: --spacing-section-sm (48px)</span>
        </div>
        <div
          id="sidebar-layout"
          class="grid grid-cols-1 gap-6 items-start"
        >
          <div
            class="bg-subtle border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5"
          >
            <p class="text-label mb-4">Navigation</p>
            <div class="flex flex-col gap-1">
              <a href="#" class="nav-link active">Overview</a>
              <a href="#" class="nav-link">Analytics</a>
              <a href="#" class="nav-link">Components</a>
              <a href="#" class="nav-link">Settings</a>
            </div>
            <hr class="divider my-4" />
            <div class="flex flex-col gap-1">
              <a href="#" class="nav-link">Documentation</a>
              <a href="#" class="nav-link">Changelog</a>
            </div>
          </div>
          <div class="flex flex-col gap-5">
            <div
              class="flex justify-between items-center flex-wrap gap-3"
            >
              <div>
                <h3
                  class="font-display font-bold text-xl"
                >
                  Overview
                </h3>
                <p class="text-sm text-muted">
                  Design system health and adoption
                </p>
              </div>
              <button class="btn btn-primary btn-sm">+ New Token</button>
            </div>
            <div
              class="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3"
            >
              <div class="stat-card">
                <span class="stat-label">Tokens</span
                ><span
                  class="stat-value text-3xl text-[var(--color-vs-green)]"
                  >64</span
                >
              </div>
              <div class="stat-card">
                <span class="stat-label">Components</span
                ><span class="stat-value text-3xl">18</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Coverage</span
                ><span
                  class="stat-value text-3xl text-[var(--color-vs-blue)]"
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
                class="flex-shrink-0 mt-0.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="text-sm"
                >All systems nominal. Last update 3 minutes ago.</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Example 6: Code Snippet -->
      <div>
        <h3 class="text-heading-3 mb-6">6 — Quick-Reference Token Usage</h3>
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
  <footer class="mt-20 border-t border-[var(--color-border)] py-10">
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
      <div class="flex items-center gap-2.5">
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
        <span class="font-display font-bold text-sm"
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
