<script lang="ts">
  import { Instagram, Linkedin, Globe, Check, ShieldCheck } from "@lucide/svelte";

  const socials = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "Website", icon: Globe, href: "https://khwarizmi.co.id" }
  ];

  /* Svelte 5: Logic untuk newsletter (Opsional) */
  let email = $state("");
  let subscribed = $state(false);

  function handleSubscribe(e: SubmitEvent) {
    e.preventDefault();
    // Simulasi subscribe
    subscribed = true;
    email = "";
    setTimeout(() => (subscribed = false), 3000);
  }
</script>

<footer class="bg-slate-950 pt-20 pb-10 text-slate-400">
  <div class="container mx-auto px-6">
    <div class="grid gap-12 border-b border-slate-800 pb-16 lg:grid-cols-4 lg:gap-8">
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 overflow-hidden rounded-xl bg-white p-1">
            <img src="/logo.jpg" alt="Logo" class="h-full w-full object-contain" />
          </div>
          <div class="text-xl font-black tracking-tight text-white">
            <span>Khwarizmi</span> <span class="text-[#f67d26]">Academy</span>
          </div>
        </div>
        <p class="max-w-xs text-sm leading-relaxed">Platform edukasi teknologi no.1 di Indonesia. Kami membantu kamu beralih karir ke dunia digital dengan kurikulum praktis dan mentor ahli.</p>
        <div class="flex flex-wrap gap-3">
          {#each socials as social}
            {@const SocialIcon = social.icon}
            <a href={social.href} target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-[10px] font-bold text-white transition-all hover:bg-[#f67d26] hover:border-[#f67d26] hover:-translate-y-1">
              <SocialIcon size={14} /> {social.name}
            </a>
          {/each}
        </div>
      </div>

      <div>
        <h4 class="mb-6 font-bold text-white">Belajar</h4>
        <nav class="flex flex-col gap-4 text-sm">
          <a href="#" class="transition-colors hover:text-[#f67d26]">Semua Kelas</a>
          <a href="#" class="transition-colors hover:text-[#f67d26]">Bootcamp Intensif</a>
          <a href="#" class="transition-colors hover:text-[#f67d26]">Webinar Gratis</a>
          <a href="#" class="transition-colors hover:text-[#f67d26]">Alur Belajar</a>
        </nav>
      </div>

      <div>
        <h4 class="mb-6 font-bold text-white">Tentang Kami</h4>
        <nav class="flex flex-col gap-4 text-sm">
          <a href="#" class="transition-colors hover:text-[#f67d26]">Kisah Alumni</a>
          <a href="#" class="transition-colors hover:text-[#f67d26]">Karir Mentor</a>
          <a href="#" class="transition-colors hover:text-[#f67d26]">Hubungi Kami</a>
          <a href="#" class="transition-colors hover:text-[#f67d26]">Syarat & Ketentuan</a>
        </nav>
      </div>

      <div class="rounded-3xl bg-slate-900 p-6 border border-slate-800">
        <h4 class="mb-4 font-bold text-white">Jangan Ketinggalan Info</h4>
        <p class="mb-6 text-xs leading-relaxed">Dapatkan tips karir & diskon spesial setiap minggu langsung di emailmu.</p>

        <form onsubmit={handleSubscribe} class="flex flex-col gap-3">
          <input type="email" bind:value={email} placeholder="Email kamu..." required class="w-full rounded-xl bg-slate-850 border border-slate-700 p-3 text-sm text-white outline-none focus:border-[#f67d26] transition-all" />
          <button type="submit" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f67d26] py-3 text-sm font-bold text-white transition-all hover:bg-orange-600 active:scale-95">
            {#if subscribed}<Check size={16} /> Tersambung!{:else}Subscribe{/if}
          </button>
        </form>
        <p class="mt-4 inline-flex items-center justify-center gap-1.5 w-full text-[10px] text-slate-500 text-center"><ShieldCheck size={12} /> Data kamu aman. Kami benci spam.</p>
      </div>
    </div>

    <div class="flex flex-col items-center justify-between gap-6 py-10 text-[10px] font-medium tracking-wider uppercase sm:flex-row">
      <div class="text-slate-500">&copy; 2026 Inisiasi Learning. All rights reserved.</div>
      <div class="flex gap-8">
        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-white transition-colors">Terms of Use</a>
      </div>
    </div>
  </div>
</footer>

<style>
  .container {
    max-width: 1140px;
  }
</style>
