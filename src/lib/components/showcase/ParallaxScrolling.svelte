<script lang="ts">
  import { onMount } from "svelte";

  let root: HTMLDivElement;

  onMount(() => {
    let cleanup = () => {};
    (async () => {
      // ponytail: dynamic import keeps gsap/lenis out of the initial bundle
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const Lenis = (await import("lenis")).default;

      gsap.registerPlugin(ScrollTrigger);

      const trigger = root?.querySelector<HTMLElement>("[data-parallax-layers]");
      let tl: gsap.core.Timeline | undefined;

      if (trigger) {
        tl = gsap.timeline({
          scrollTrigger: { trigger, start: "0% 0%", end: "100% 0%", scrub: 0 }
        });
        const layers = [
          { layer: "1", yPercent: 70 },
          { layer: "2", yPercent: 55 },
          { layer: "3", yPercent: 40 },
          { layer: "4", yPercent: 10 }
        ];
        layers.forEach((l, idx) => {
          tl!.to(
            trigger.querySelectorAll(`[data-parallax-layer="${l.layer}"]`),
            { yPercent: l.yPercent, ease: "none" },
            idx === 0 ? undefined : "<"
          );
        });
      }

      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        if (trigger) gsap.killTweensOf(trigger);
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    })();

    return () => cleanup();
  });
</script>

<div class="parallax" bind:this={root}>
  <section class="parallax__header">
    <div class="parallax__visuals">
      <div class="parallax__black-line-overflow"></div>
      <div data-parallax-layers class="parallax__layers">
        <img
          src="https://cdn.21st.dev/assets/mirror/a4/a43f4eae3459c461345ee676f12d6e1ddca65e8a5279a5af00d475b17ff83aea.webp"
          loading="eager"
          width="800"
          data-parallax-layer="1"
          alt=""
          class="parallax__layer-img"
        />
        <img
          src="https://cdn.21st.dev/assets/mirror/50/50ca6a0d36d2780bfcb469d6db7eaec0be7e0d2961ba69a63d2a1473b040338d.webp"
          loading="eager"
          width="800"
          data-parallax-layer="2"
          alt=""
          class="parallax__layer-img"
        />
        <div data-parallax-layer="3" class="parallax__layer-title">
          <h2 class="parallax__title">Khwarizmi</h2>
        </div>
        <img
          src="https://cdn.21st.dev/assets/mirror/e1/e1c8137b5f971c3b3ec1a0f9e79b9c17018767005f844a10082b890472afecfb.webp"
          loading="eager"
          width="800"
          data-parallax-layer="4"
          alt=""
          class="parallax__layer-img"
        />
      </div>
      <div class="parallax__fade"></div>
    </div>
  </section>
  <section class="parallax__content">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 160 160" fill="none" class="osmo-icon-svg">
      <path
        d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
        fill="currentColor"
      ></path>
    </svg>
  </section>
</div>

<style>
  .parallax {
    width: 100%;
  }
  .parallax__header {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }
  .parallax__visuals {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .parallax__black-line-overflow {
    position: absolute;
    inset: auto 0 0 0;
    height: 2px;
    background: #000;
    z-index: 20;
  }
  .parallax__layers {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .parallax__layer-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    will-change: transform;
  }
  .parallax__layer-title {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform;
    /* No z-index: DOM order keeps the title behind layer 4 (foreground),
       so the foreground occludes it for the depth effect. */
  }
  .parallax__title {
    margin: 0;
    color: #fff;
    font-family: var(--font-plus), sans-serif;
    font-weight: 800;
    letter-spacing: -0.04em;
    font-size: clamp(3rem, 12vw, 12rem);
    text-transform: uppercase;
    text-align: center;
  }
  .parallax__fade {
    position: absolute;
    inset: auto 0 0 0;
    height: 40%;
    background: linear-gradient(to bottom, transparent, #0b0b0d);
    z-index: 10;
  }
  .parallax__content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 1.5rem;
    background: #0b0b0d;
    color: var(--kh-orange, #f67d26);
  }
  .osmo-icon-svg {
    width: clamp(48px, 8vw, 96px);
    height: auto;
  }
</style>
