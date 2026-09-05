<script lang="ts">
  import { onMount } from "svelte";
  import { Palette, Check } from "@lucide/svelte";

  const words = ["Web Development", "UI/UX DESIGN", "Animation", "Videography", "Frontend Development", "Backend Development"];
  
  // Menggunakan $state untuk Svelte 5
  let currentText = $state("");
  let wordIndex = $state(0);
  let isDeleting = $state(false);
  let typingSpeed = $state(150);

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      currentText = currentWord.substring(0, currentText.length - 1);
      typingSpeed = 50;
    } else {
      currentText = currentWord.substring(0, currentText.length + 1);
      typingSpeed = 150;
    }

    if (!isDeleting && currentText === currentWord) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && currentText === "") {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  onMount(() => {
    typeEffect();
  });
</script>

<header class="relative overflow-hidden bg-white py-12 lg:py-24">
  <div class="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-50/50 blur-[80px] lg:h-96 lg:w-96 lg:blur-[120px]"></div>
  <div class="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-teal-50/30 blur-[80px] lg:h-96 lg:w-96 lg:blur-[120px]"></div>

  <div class="container mx-auto px-6 relative z-10">
    <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      
      <div class="text-center lg:text-left">
        <div class="mb-6 flex justify-center lg:justify-start">
          <span class="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#f67d26]">
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-[#f67d26]"></span>
            </span>
            Accelerate Your Career
          </span>
        </div>

        <h1 class="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:mb-8 lg:text-6xl lg:leading-[1.15]">
          Mau Belajar <br />
          <span class="relative inline-block text-[#f67d26] italic">
            {currentText}
            <span class="absolute -right-1 top-0 h-[85%] w-[2px] animate-[blink_1s_infinite] bg-gray-900 opacity-20"></span>
          </span>
          <br />
          Jadi Lebih Mudah.
        </h1>

        <p class="mx-auto mb-10 max-w-md text-base leading-relaxed text-gray-500 sm:text-lg lg:mx-0 lg:mb-12 lg:max-w-lg">
          Kuasai keahlian digital masa depan melalui kurikulum berbasis industri yang dirancang oleh praktisi berpengalaman.
        </p>

        <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
          
          <a
            href="/login"
            class="w-full rounded-full bg-[#f67d26] px-8 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-orange-200/50 transition-all hover:bg-orange-600 hover:shadow-orange-300/50 active:scale-95 sm:w-auto lg:px-9 lg:py-4"
          >
            Mulai Belajar Sekarang
          </a>

          <a
            href="/categories"
            class="flex w-full items-center justify-center gap-3 rounded-full border border-gray-100 bg-white px-8 py-3.5 text-sm font-bold text-gray-800 transition-all hover:bg-gray-50 active:scale-95 sm:w-auto lg:px-9 lg:py-4"
          >
            <span class="flex h-5 w-5 items-center justify-center rounded-full bg-orange-50 text-[9px] text-[#f67d26]">▶</span>
            Eksplorasi Kelas
          </a>

        </div>
      </div>

      <div class="hidden lg:relative lg:flex lg:justify-end">
        <div class="relative w-full max-w-[420px]">
          <div class="absolute -bottom-5 -left-5 h-full w-full rounded-[2.5rem] border border-orange-100/50 lg:rounded-[3rem]"></div>

          <div class="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl lg:rounded-[3rem]">
            <img src="/foto it.jpg" alt="Student Learning" class="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" />
          </div>

          <div class="absolute -left-10 top-12 z-20 flex animate-[float_6s_ease-in-out_infinite] items-center gap-4 rounded-2xl border border-white/40 bg-white/80 p-4 shadow-xl backdrop-blur-md">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600"><Palette size={22} /></div>
            <div>
              <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400">Program</p>
              <h4 class="text-sm font-bold text-gray-900 leading-none">UI Design</h4>
              <div class="mt-2 h-1 w-20 rounded-full bg-gray-100 overflow-hidden">
                <div class="h-full w-[85%] rounded-full bg-[#f67d26]"></div>
              </div>
            </div>
          </div>

          <div class="absolute -right-6 bottom-12 z-20 flex animate-[float_6s_ease-in-out_infinite_2s] items-center gap-3 rounded-2xl border border-white/40 bg-white/80 p-4 shadow-xl backdrop-blur-md">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-200">
              <Check size={16} strokeWidth={3} />
            </div>
            <div>
              <p class="text-xs font-bold text-gray-900 leading-none">Level Up!</p>
              <p class="mt-1 text-[8px] font-bold text-emerald-600 uppercase tracking-tighter">Skill Unlocked</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</header>

<style>
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  :global(body) {
    overflow-x: hidden;
    background-color: white;
  }

  /* Utility agar container rapi */
  .container {
    max-width: 1140px;
  }
</style>