<script lang="ts">
  import { user, isPremium, ownedCourses } from "$lib/stores";
  import { fly, fade, scale } from "svelte/transition";
  import { elasticOut, cubicInOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import toast, { Toaster } from "svelte-french-toast";
  import { GraduationCap, X, Check, Lock, LockOpen, ArrowRight } from "@lucide/svelte";

  // --- SVELTE 5 STATE (RUNES) ---
  let showWelcome = $state(false);
  let showContent = $state(false);
  let showPaymentModal = $state(false);
  let selectedPayment = $state("bca");
  let isLoading = $state(false);
  let selectedCourseToBuy = $state<any>(null);

  const formatRp = (num: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);

  // --- DATA KURSUS ---
  const catalogData = [
    { id: 1, title: "Mastering Mobile App Design", category: "Design", price: 150000, img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80" },
    { id: 2, title: "Fullstack Web Developer", category: "Development", price: 250000, img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80" },
    { id: 3, title: "Advanced Brand Identity", category: "Design", price: 175000, img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80" },
    { id: 4, title: "Python for Data Science", category: "Data", price: 200000, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
    { id: 5, title: "Digital Marketing Mastery", category: "Marketing", price: 125000, img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80" },
    { id: 6, title: "3D Modeling with Blender", category: "Design", price: 180000, img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80" },
  ];

  onMount(() => {
    const isJustSubscribed = page.url.searchParams.get("new") === "true";
    if ($isPremium && isJustSubscribed) {
      showWelcome = true;
      setTimeout(() => (showContent = true), 500);
    }
  });

  function openPayment(course: any) {
    if ($ownedCourses.includes(course.id)) {
      toast.success("Kamu sudah punya kursus ini!");
      return;
    }
    selectedCourseToBuy = course;
    showPaymentModal = true;
  }

  function processPayment() {
    isLoading = true;
    const loadingId = toast.loading("Memproses pembayaran...");

    setTimeout(() => {
      $ownedCourses = [...$ownedCourses, selectedCourseToBuy.id];
      if (!$isPremium) {
        $isPremium = true;
        $user.role = "Active Student";
      }
      isLoading = false;
      showPaymentModal = false;
      toast.dismiss(loadingId);
      toast.success(`Berhasil membeli ${selectedCourseToBuy.title}!`);
    }, 2000);
  }
</script>

<Toaster />

<div class="max-w-7xl mx-auto px-6 py-12 min-h-screen font-plus">
  {#if showPaymentModal}
    <div class="fixed inset-0 z-[100] grid place-items-center bg-slate-900/60 backdrop-blur-sm p-4" transition:fade>
      <div class="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl" transition:scale={{ start: 0.95 }}>
        <div class="flex items-center justify-between bg-orange-50 px-8 py-5 border-b border-orange-100">
          <h3 class="inline-flex items-center gap-2 font-black text-orange-900 leading-none"><GraduationCap size={18} /> Checkout Kelas</h3>
          <button onclick={() => (showPaymentModal = false)} aria-label="Tutup" class="text-orange-900 hover:rotate-90 transition-transform font-bold"><X size={20} /></button>
        </div>

        <div class="p-8 bg-slate-50 border-b border-slate-100 space-y-3">
          <div class="flex justify-between text-sm"><span class="text-slate-400 font-medium">Item</span><strong class="text-slate-800 text-right">{selectedCourseToBuy?.title}</strong></div>
          <div class="flex justify-between text-sm"><span class="text-slate-400 font-medium">Kategori</span><span class="font-bold text-slate-600">{selectedCourseToBuy?.category}</span></div>
          <div class="pt-4 mt-2 border-t border-dashed border-slate-200 flex justify-between items-center text-lg font-black text-slate-900">
            <span>Total Tagihan</span>
            <span class="text-2xl text-orange-600">{formatRp(selectedCourseToBuy?.price)}</span>
          </div>
        </div>

        <div class="p-8 space-y-6">
          <label class="block text-xs font-black text-slate-400 uppercase tracking-widest">Pilih Metode Pembayaran</label>
          <div class="grid grid-cols-2 gap-4">
            {#each ["bca", "mandiri", "gopay", "qris"] as method}
              <button
                onclick={() => (selectedPayment = method)}
                class="relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2
                {selectedPayment === method ? 'border-kh-orange bg-orange-50' : 'border-slate-100 hover:border-orange-100'}"
              >
                <span class="text-[10px] font-black uppercase tracking-tighter text-slate-800">{method}</span>
                <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{method === "gopay" || method === "qris" ? "E-Wallet" : "VA Account"}</span>
                {#if selectedPayment === method}
                  <div class="absolute top-2 right-2 text-kh-orange"><Check size={12} strokeWidth={3} /></div>
                {/if}
              </button>
            {/each}
          </div>
          <button onclick={processPayment} disabled={isLoading} class="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-xl shadow-slate-200 transition-all hover:bg-kh-orange active:scale-95 disabled:bg-slate-200">
            {#if isLoading}Memproses...{:else}<span class="inline-flex items-center justify-center gap-2"><Lock size={16} /> Bayar Sekarang</span>{/if}
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if showWelcome}
    <div class="fixed inset-0 z-[200] bg-slate-950 flex items-center justify-center text-center overflow-hidden" out:fly={{ y: -1000, duration: 1000, easing: cubicInOut }}>
      <div class="absolute w-96 h-96 bg-kh-orange rounded-full blur-[100px] opacity-20 -top-20 -left-20 animate-pulse"></div>
      <div class="absolute w-96 h-96 bg-indigo-600 rounded-full blur-[100px] opacity-10 bottom-0 right-0"></div>

      <div class="relative z-10 p-6 max-w-lg space-y-8">
        {#if showContent}
          <div class="w-20 h-20 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-2xl animate-bounce" in:scale={{ easing: elasticOut }}>
            <img src="/logo.jpg" alt="Logo" class="w-12 h-12 object-contain" />
          </div>
          <div class="space-y-4">
            <h1 class="text-4xl md:text-5xl font-black text-white leading-tight" in:fly={{ y: 50, delay: 200 }}>
              Selamat Datang, <br /> <span class="bg-gradient-to-r from-orange-400 to-kh-orange bg-clip-text text-transparent italic">Khwarizmi Academy</span>
            </h1>
            <p class="text-slate-400 font-medium text-lg leading-relaxed" in:fly={{ y: 50, delay: 400 }}>
              Semua gembok telah terbuka. Akses <strong>seluruh Kelas Premium</strong> tanpa batas sekarang juga.
            </p>
          </div>
          <button onclick={() => (showWelcome = false)} class="bg-white text-slate-950 px-12 py-5 rounded-full text-lg font-black shadow-2xl transition-all hover:scale-105 active:scale-95" in:fly={{ y: 50, delay: 600 }}>
            Mulai Jelajahi Kelas
          </button>
        {/if}
      </div>
    </div>
  {/if}

  <header class="text-center mb-16 space-y-4">
    <span class="bg-orange-100 text-kh-orange px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Katalog Premium</span>
    <h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">Tentukan Jalan Karirmu</h1>
    <p class="text-slate-500 font-medium">Pilih skill yang ingin kamu kuasai dari praktisi terbaik.</p>
  </header>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each catalogData as item (item.id)}
      {@const isOwned = $ownedCourses.includes(item.id)}
      <div class="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div class="relative aspect-video overflow-hidden">
          <img src={item.img} alt={item.title} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

          {#if isOwned}
            <div class="absolute inset-0 bg-emerald-600/90 flex items-center justify-center p-4">
              <span class="inline-flex items-center gap-1.5 px-6 py-2 rounded-full border-2 border-white text-white font-black text-xs uppercase tracking-widest"><Check size={14} strokeWidth={3} /> Siap Belajar</span>
            </div>
          {:else if $isPremium}
            <div class="absolute inset-0 bg-kh-orange/80 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span class="inline-flex items-center gap-2 text-white font-black text-2xl tracking-tighter"><LockOpen size={22} /> UNLOCKED</span>
            </div>
          {/if}
          <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black text-slate-900 uppercase tracking-widest shadow-sm">{item.category}</div>
        </div>

        <div class="p-8 space-y-6 flex flex-col flex-1">
          <h3 class="text-xl font-bold text-slate-900 leading-tight flex-1">{item.title}</h3>

          {#if isOwned}
            <a href="/user/lesson" class="w-full py-4 rounded-2xl bg-emerald-50 text-emerald-700 font-black text-center text-sm transition-all hover:bg-emerald-100 inline-flex items-center justify-center gap-2">Lanjut Belajar <ArrowRight size={16} /></a>
          {:else if $isPremium}
            <button onclick={() => openPayment(item)} class="w-full py-4 rounded-2xl bg-kh-orange text-white font-black text-sm transition-all hover:bg-orange-600 shadow-lg shadow-orange-100">Ambil Kelas (Gratis)</button>
          {:else}
            <button onclick={() => openPayment(item)} class="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm transition-all hover:bg-kh-orange shadow-lg shadow-slate-200">Beli {formatRp(item.price)}</button>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
