<script lang="ts">
  import VolumetricStudio from "$lib/components/showcase/VolumetricStudio.svelte";
  import ParallaxScrolling from "$lib/components/showcase/ParallaxScrolling.svelte";
  import { ArrowRight, BookOpen } from "@lucide/svelte";

  // Headline split into characters for a staggered reveal.
  const lines = ["Belajar di", "dimensi baru."];
  const BASE_DELAY = 1500; // ms — after the light flicker settles
  const STEP = 38; // ms per character

  let count = 0;
  const indexed = lines.map((line) =>
    [...line].map((ch) => ({ ch, i: count++ }))
  );
</script>

<svelte:head><title>Showcase | Khwarizmi Academy</title></svelte:head>

<main class="bg-black">
  <div class="relative h-screen min-h-[640px] w-full">
    <VolumetricStudio>
      <div class="flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <p
          class="reveal-tag mb-6 text-[11px] font-bold uppercase tracking-[0.4em] text-white/40"
          style="animation-delay:{BASE_DELAY - 300}ms"
        >
          Khwarizmi Studio
        </p>

        <h1 class="hero-title text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl lg:text-[104px]">
          {#each indexed as line, li}
            <span class="block">
              {#each line as { ch, i }}
                <span class="char" style="animation-delay:{BASE_DELAY + i * STEP}ms">{ch === " " ? " " : ch}</span>
              {/each}
            </span>
          {/each}
        </h1>

        <p
          class="reveal-tag mt-8 max-w-xl text-base font-medium text-white/50 md:text-lg"
          style="animation-delay:{BASE_DELAY + count * STEP}ms"
        >
          Kelas, mentor, dan project nyata — dirender langsung ke dalam pengalaman belajarmu.
        </p>

        <div
          class="reveal-tag pointer-events-auto mt-10 flex flex-col gap-4 sm:flex-row"
          style="animation-delay:{BASE_DELAY + count * STEP + 150}ms"
        >
          <a
            href="/register"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-black shadow-[0_0_28px_rgba(255,255,255,0.22)] transition-transform hover:scale-105 active:scale-95"
          >
            Mulai Belajar <ArrowRight size={18} />
          </a>
          <a
            href="/"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-4 font-bold text-white transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            <BookOpen size={18} /> Lihat Program
          </a>
        </div>
      </div>
    </VolumetricStudio>
  </div>

  <ParallaxScrolling />
</main>

<style>
  .char {
    display: inline-block;
    white-space: pre;
    opacity: 0;
    background: linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.45) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 6px 24px rgba(160, 190, 255, 0.25));
    animation: charIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  @keyframes charIn {
    from {
      opacity: 0;
      transform: translateY(0.5em) rotateX(-40deg);
      filter: blur(12px) drop-shadow(0 6px 24px rgba(160, 190, 255, 0));
    }
    to {
      opacity: 1;
      transform: translateY(0) rotateX(0);
      filter: blur(0) drop-shadow(0 6px 24px rgba(160, 190, 255, 0.25));
    }
  }
  .hero-title {
    perspective: 800px;
  }
  .reveal-tag {
    opacity: 0;
    animation: tagIn 1s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  @keyframes tagIn {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .char,
    .reveal-tag {
      animation-duration: 0.01ms;
      animation-delay: 0ms !important;
      opacity: 1;
    }
  }
</style>
