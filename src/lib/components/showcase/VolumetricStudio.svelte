<script lang="ts">
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";

  type Corner = [number, number];
  let {
    backWall = { tl: [22, 10], tr: [78, 10], br: [78, 70], bl: [22, 70] } as {
      tl: Corner;
      tr: Corner;
      br: Corner;
      bl: Corner;
    },
    intensity = 1,
    lightColor = "230,240,255",
    spots = [35, 50, 65],
    vignette = 0.55,
    class: className = "",
    children
  }: {
    backWall?: { tl: Corner; tr: Corner; br: Corner; bl: Corner };
    intensity?: number;
    lightColor?: string;
    spots?: number[];
    vignette?: number;
    class?: string;
    children?: Snippet;
  } = $props();

  const { tl, tr, br, bl } = backWall;
  const poly = (pts: Corner[]) => `polygon(${pts.map(([x, y]) => `${x}% ${y}%`).join(", ")})`;

  let lightsOn = $state(false);
  let isFlickering = $state(true);

  // ponytail: CSS/SVG rebuild of the WebGL volumetric light — no three.js.
  // Beams are clipped, blurred gradients in screen blend mode.
  onMount(() => {
    let mounted = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      await sleep(600);
      if (!mounted) return;
      // stutter-start flicker
      for (const [on, wait] of [
        [true, 100],
        [false, 300],
        [true, 50],
        [false, 200],
        [true, 40],
        [false, 60],
        [true, 40],
        [false, 400]
      ] as [boolean, number][]) {
        if (!mounted) return;
        lightsOn = on;
        await sleep(wait);
      }
      if (!mounted) return;
      isFlickering = false;
      lightsOn = true;
    })();
    return () => (mounted = false);
  });

  const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
  const spotBg = spots
    .map((x) => `radial-gradient(ellipse 25% 40% at ${x}% 68%, rgba(${lightColor},0.15) 0%, transparent 70%)`)
    .join(", ");
  const floorBg = spots
    .map((x) => `radial-gradient(ellipse 35% 30% at ${x}% 80%, rgba(${lightColor},0.06) 0%, transparent 60%)`)
    .join(", ");
</script>

<section class="relative w-full h-full min-h-[600px] bg-black overflow-hidden font-plus {className}">
  <div aria-hidden="true" class="absolute inset-0 overflow-hidden bg-black pointer-events-none">
    <!-- Room surfaces -->
    <div class="absolute inset-0" style="clip-path:{poly([tl, tr, br, bl])};background:linear-gradient(to bottom, rgba(20,20,22,1) 0%, rgba(8,8,10,1) 100%);"></div>
    <div class="absolute inset-0" style="clip-path:{poly([[0, 0], [100, 0], tr, tl])};background:linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 100%);"></div>
    <div class="absolute inset-0" style="clip-path:{poly([[0, 0], tl, bl, [0, 100]])};background:linear-gradient(to right, rgba(8,8,10,1) 0%, rgba(18,18,20,1) 70%, rgba(26,26,28,1) 100%);"></div>
    <div class="absolute inset-0" style="clip-path:{poly([[100, 0], tr, br, [100, 100]])};background:linear-gradient(to left, rgba(8,8,10,1) 0%, rgba(18,18,20,1) 70%, rgba(26,26,28,1) 100%);"></div>
    <div class="absolute inset-0" style="clip-path:{poly([[0, 100], [100, 100], br, bl])};background:linear-gradient(to top, rgba(15,15,17,1) 0%, rgba(6,6,8,1) 100%);"></div>

    <!-- Edge lines -->
    <svg class="absolute inset-0 w-full h-full" style="z-index:10">
      <defs>
        <linearGradient id="baseGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="white" stop-opacity="0" />
          <stop offset="20%" stop-color="white" stop-opacity="0.5" />
          <stop offset="80%" stop-color="white" stop-opacity="0.5" />
          <stop offset="100%" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="white" stop-opacity="0" />
          <stop offset="50%" stop-color="white" stop-opacity="0.18" />
          <stop offset="100%" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
      <line x1="{bl[0]}%" y1="{bl[1]}%" x2="{br[0]}%" y2="{br[1]}%" stroke="rgba(255,255,255,0.2)" stroke-width="5" style="filter:blur(3px)" />
      <line x1="{bl[0]}%" y1="{bl[1]}%" x2="{br[0]}%" y2="{br[1]}%" stroke="url(#baseGrad)" stroke-width="1" />
      <line x1="{tl[0]}%" y1="{tl[1]}%" x2="{bl[0]}%" y2="{bl[1]}%" stroke="url(#vGrad)" stroke-width="1" />
      <line x1="{tr[0]}%" y1="{tr[1]}%" x2="{br[0]}%" y2="{br[1]}%" stroke="url(#vGrad)" stroke-width="1" />
    </svg>

    <!-- Ambient glow on walls -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="z-index:15;opacity:{lightsOn ? intensity : 0};transition:{isFlickering ? 'none' : `opacity 700ms ${EASE}`};mix-blend-mode:screen;will-change:opacity;"
    >
      <div class="absolute inset-0" style="clip-path:{poly([tl, tr, br, bl])};background:{spotBg};"></div>
      <div class="absolute inset-0" style="clip-path:{poly([[0, 100], [100, 100], br, bl])};background:{floorBg};"></div>
    </div>

    <!-- Volumetric beams (CSS) -->
    <div class="absolute inset-0 pointer-events-none" style="z-index:16;mix-blend-mode:screen">
      {#each spots as pos, i}
        <div
          class="vs-beam absolute"
          style="left:{pos}%;top:calc(3% + 80px);opacity:{lightsOn ? intensity : 0};transition:{isFlickering
            ? 'none'
            : `opacity 800ms ${EASE} ${i * 100}ms`};--beam-color:{lightColor};"
        ></div>
      {/each}
    </div>

    <!-- Studio lamps -->
    <div class="absolute inset-0 pointer-events-none" style="z-index:31">
      {#each [35, 50, 65] as pos}
        <div class="absolute flex flex-col items-center" style="left:{pos}%;top:3%;transform:translate(-50%,-4px)">
          <div
            class="w-[14px] h-[34px] rounded-sm border border-zinc-900 shadow-[0_5px_10px_rgba(0,0,0,0.9),inset_0_0_4px_rgba(255,255,255,0.5)] relative overflow-hidden"
            style="background:linear-gradient(to right, #666 0%, #ffffff 40%, #999 60%, #333 100%)"
          >
            <div class="absolute top-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-zinc-900 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,1)]"></div>
            <div class="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-zinc-900 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,1)]"></div>
          </div>
          <div class="w-[8px] h-[18px] bg-linear-to-r from-zinc-900 via-zinc-600 to-zinc-950 border-x border-black relative">
            <div
              class="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-[18px] h-[18px] rounded-full border border-zinc-900 shadow-[0_4px_8px_rgba(0,0,0,1),inset_0_1px_2px_rgba(255,255,255,0.3)]"
              style="background:radial-gradient(circle at top left, #777, #111)"
            ></div>
          </div>
          <div class="relative mt-[6px] w-[54px] h-[64px] flex justify-center">
            <div
              class="absolute inset-0 rounded-b-2xl rounded-t-sm border border-black shadow-[0_20px_30px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-evenly"
              style="background:linear-gradient(to right, #111 0%, #3a3a3a 30%, #555 50%, #2a2a2a 80%, #000 100%)"
            >
              <div class="w-full h-[2px] bg-black/90 shadow-[0_1px_0_rgba(255,255,255,0.15)] z-10"></div>
              <div class="w-full h-[2px] bg-black/90 shadow-[0_1px_0_rgba(255,255,255,0.15)] z-10"></div>
              <div class="w-full h-[2px] bg-black/90 shadow-[0_1px_0_rgba(255,255,255,0.15)] z-10"></div>
              <div class="w-full h-[2px] bg-black/90 shadow-[0_1px_0_rgba(255,255,255,0.15)] z-10"></div>
            </div>
            <div
              class="absolute bottom-[-6px] w-[58px] h-[18px] rounded-[50%] border-2 border-zinc-900 shadow-[0_10px_15px_rgba(0,0,0,1)] flex items-center justify-center z-10 overflow-hidden"
              style="background:radial-gradient(ellipse at center, #222, #000)"
            >
              <div
                class="w-[34px] h-[10px] rounded-[50%] transition-all duration-700"
                style="background:{lightsOn ? '#ffffff' : '#111'};box-shadow:{lightsOn
                  ? '0 0 20px 8px rgba(255,255,255,0.9), inset 0 0 8px #fff'
                  : 'inset 0 2px 5px rgba(0,0,0,0.9), inset 0 -1px 1px rgba(255,255,255,0.05)'};"
              ></div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Vignette -->
    <div class="absolute inset-0" style="z-index:20;background:radial-gradient(ellipse 90% 80% at 50% 45%, transparent 55%, rgba(0,0,0,{vignette}) 100%);"></div>
    <!-- Grain -->
    <div class="vs-grain absolute inset-0 pointer-events-none" style="z-index:25;opacity:0.04;mix-blend-mode:screen;"></div>
  </div>

  <div class="relative z-10 w-full h-full pointer-events-none">
    {@render children?.()}
  </div>
</section>

<style>
  .vs-beam {
    width: 320px;
    height: 82vh;
    transform: translateX(-50%);
    will-change: opacity;
    background: linear-gradient(
      to bottom,
      rgba(var(--beam-color), 0.22) 0%,
      rgba(var(--beam-color), 0.08) 35%,
      transparent 72%
    );
    clip-path: polygon(46% 0%, 54% 0%, 100% 100%, 0% 100%);
    filter: blur(18px);
  }
  .vs-grain {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
  }
</style>
