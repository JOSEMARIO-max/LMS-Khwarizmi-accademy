<script lang="ts">
  import { ArrowRight } from "@lucide/svelte";
  /* --- SVELTE 5 RUNES --- */
  let scrollY = $state(0);
  let splitContainer = $state<HTMLElement | null>(null);

  let splitProgress = $derived.by(() => {
    if (!splitContainer) return 0;
    const start = splitContainer.offsetTop;
    const distance = splitContainer.offsetHeight - window.innerHeight;
    const scrolled = scrollY - start;
    return Math.max(0, Math.min(1, scrolled / distance));
  });
</script>

<svelte:window bind:scrollY />

<section bind:this={splitContainer} class="relative h-[300vh] bg-kh-dark overflow-clip">
  <div class="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
    <div
      class="absolute z-10 flex flex-col items-center justify-center px-6 text-center transition-all duration-500 ease-out"
      style="
        opacity: {splitProgress > 0.5 ? 1 : 0}; 
        transform: scale({0.8 + splitProgress * 0.2});
      "
    >
      <div class="max-w-4xl px-4">
        <h2 class="mb-6 text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-7xl lg:text-8xl">
          LEVEL UP <br />
          <span class="bg-linear-to-r from-[#f67d26] to-[#ffedd5] bg-clip-text text-transparent italic"> YOUR SKILL! </span>
        </h2>

        <p class="mx-auto mb-12 max-w-2xl text-base font-medium leading-relaxed tracking-wide text-gray-400 md:text-xl opacity-90">
          Jangan biarkan potensi Anda berhenti di sini. Kuasai teknologi masa depan dan mulai perjalanan karir Anda bersama <span class="text-white border-b border-kh-orange">Khwarizmi Academy</span>.
        </p>

        <div class="flex flex-col items-center gap-4">
          <a
            href="/login"
            class="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#f67d26] px-10 py-5 text-lg font-black uppercase tracking-widest text-white transition-all hover:scale-105 hover:bg-[#ea580c] active:scale-95 shadow-[0_20px_50px_rgba(246,125,38,0.3)]"
          >
            <span class="relative z-10 inline-flex items-center gap-2">Mulai Sekarang <ArrowRight size={18} /></span>
            <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"></div>
          </a>

          <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500"> Join 1,000+ students this month </span>
        </div>
      </div>
    </div>

    <div class="absolute top-0 left-0 z-20 h-1/2 w-full border-b border-gray-100 bg-white overflow-hidden" style="transform: translateY(-{splitProgress * 100}%);">
      <div class="absolute bottom-0 left-0 w-full translate-y-1/2 text-center">
        <h1 class="text-[10vw] font-black leading-none tracking-tighter text-[#f67d26] select-none uppercase">ARE YOU READY ?</h1>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 z-20 h-1/2 w-full border-t border-gray-100 bg-white overflow-hidden" style="transform: translateY({splitProgress * 100}%);">
      <div class="absolute top-0 left-0 w-full -translate-y-1/2 text-center">
        <h1 class="text-[10vw] font-black leading-none tracking-tighter text-[#f67d26] select-none uppercase">ARE YOU READY ?</h1>
      </div>
    </div>
  </div>
</section>

<style>
  :global(body) {
    overflow-x: hidden;
  }

  h1 {
    /* Mencegah pergeseran pixel saat render di browser */
    line-height: 1;
    margin: 0;
    white-space: nowrap;
  }
</style>
