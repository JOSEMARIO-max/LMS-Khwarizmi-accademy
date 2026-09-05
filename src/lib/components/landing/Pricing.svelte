<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import toast, { Toaster } from "svelte-french-toast";
  import { Gem, X, CreditCard, Check, Lock, ShieldCheck, Flame, Rocket } from "@lucide/svelte";
  // Jika menggunakan SvelteKit, gunakan alias $lib atau import path yang sesuai
  // Di Svelte 5, kita bisa menggunakan runes untuk state global atau lokal

  /* --- SVELTE 5 RUNES (STATE) --- */
  let showPaymentModal = $state(false);
  let selectedPayment = $state("bca");
  let isLoading = $state(false);

  // Simulasi state user (biasanya dari context atau store)
  let isPremium = $state(false);

  /* --- LOGIC --- */
  function openPaymentModal() {
    if (isPremium) {
      toast.success("Akun kamu sudah PRO (Active)!");
      // Ganti dengan logic navigasi Anda
      return;
    }
    showPaymentModal = true;
  }

  async function processPayment() {
    showPaymentModal = false;
    isLoading = true;

    const loadingId = toast.loading("Menghubungkan ke Payment Gateway...");

    // Simulasi Delay Network
    setTimeout(() => {
      isPremium = true;
      isLoading = false;
      toast.dismiss(loadingId);

      toast.success(`Pembayaran via ${selectedPayment.toUpperCase()} Berhasil!`, {
        duration: 5000,
      });

      // Redirect logic di sini
    }, 2500);
  }
</script>

<Toaster />

{#if showPaymentModal}
  <div class="fixed inset-0 z-[9999] grid place-items-center bg-black/60 p-4 backdrop-blur-sm" transition:fade={{ duration: 200 }}>
    <div class="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl" transition:scale={{ duration: 200, start: 0.95 }}>
      <div class="flex items-center justify-between bg-orange-50 px-6 py-5">
        <h3 class="inline-flex items-center gap-2 font-bold text-orange-900 text-lg"><Gem size={18} /> Checkout PRO</h3>
        <button aria-label="Tutup" class="text-orange-900 transition-hover hover:rotate-90" onclick={() => (showPaymentModal = false)}><X size={22} /></button>
      </div>

      <div class="border-b border-gray-100 bg-gray-50 px-8 py-6">
        <div class="flex justify-between text-sm text-gray-500 mb-2">
          <span>Paket Langganan</span>
          <strong class="text-gray-900">Bulanan (PRO)</strong>
        </div>
        <div class="mt-4 flex items-center justify-between border-t border-dashed border-gray-300 pt-4">
          <span class="text-lg font-bold text-gray-900">Total Tagihan</span>
          <span class="text-2xl font-black text-orange-600">Rp 150.000</span>
        </div>
      </div>

      <div class="p-8">
        <label class="mb-4 block text-sm font-bold text-gray-700">Pilih Metode Pembayaran</label>
        <div class="grid grid-cols-2 gap-4">
          {#each ["bca", "mandiri", "card", "gopay"] as method}
            <button
              class="relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all
              {selectedPayment === method ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-gray-100 hover:border-orange-200 hover:bg-orange-50/30'}"
              onclick={() => (selectedPayment = method)}
            >
              <div
                class="flex h-6 items-center text-xs font-black tracking-widest uppercase
                {method === 'bca' ? 'text-blue-700' : method === 'mandiri' ? 'text-yellow-600' : method === 'gopay' ? 'text-cyan-500' : 'text-gray-600'}"
              >
                {#if method === "card"}<CreditCard size={20} />{:else}{method}{/if}
              </div>
              <span class="text-[10px] font-medium text-gray-400">
                {method === "card" ? "Debit/Credit" : method === "gopay" ? "E-Wallet" : "Virtual Account"}
              </span>
              {#if selectedPayment === method}
                <div class="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-white"><Check size={10} strokeWidth={3} /></div>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <div class="px-8 pb-8">
        <button class="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 py-4 font-bold text-white transition-all hover:bg-orange-600 active:scale-95 disabled:bg-gray-300" disabled={isLoading} onclick={processPayment}>
          {#if isLoading}Memproses...{:else}<Lock size={16} /> Bayar Sekarang{/if}
        </button>
        <p class="mt-4 inline-flex w-full items-center justify-center gap-1.5 text-center text-[10px] text-gray-400"><ShieldCheck size={12} /> Pembayaran terenkripsi dan aman.</p>
      </div>
    </div>
  </div>
{/if}

<section id="pricing" class="bg-white py-24">
  <div class="container mx-auto px-6">
    <div class="mb-16 text-center">
      <span class="rounded-full bg-orange-100 px-4 py-1 text-xs font-bold text-orange-600">INVESTASI TERBAIK</span>
      <h2 class="mt-4 text-4xl font-black text-gray-900">Metode Belajar Pilihanmu</h2>
      <p class="mt-4 text-gray-500">Pilih tipe kelas yang sesuai dengan gaya belajar dan budget kamu.</p>
    </div>

    <div class="grid gap-8 lg:grid-cols-3">
      <div class="flex flex-col rounded-[2rem] border border-gray-100 bg-white p-10 transition-all hover:shadow-xl">
        <h3 class="text-xl font-bold text-gray-900">Video Course</h3>
        <div class="my-6">
          <span class="text-sm font-medium text-gray-400">Mulai dari</span>
          <div class="text-3xl font-black text-gray-900">Rp 99rb <span class="text-sm font-medium text-gray-400">/ kursus</span></div>
        </div>
        <ul class="mb-10 flex-1 space-y-4 text-sm text-gray-600">
          <li class="flex items-center gap-3"><Check size={18} class="text-kh-teal shrink-0" /> <span>Akses Video Selamanya</span></li>
          <li class="flex items-center gap-3 text-gray-300"><X size={18} class="shrink-0" /> <span>Akses Kursus Lain</span></li>
        </ul>
        <a href="/courses" class="rounded-full border-2 border-gray-100 py-4 text-center font-bold text-gray-700 transition-hover hover:border-gray-900">Katalog Kelas</a>
      </div>

      <div class="relative flex flex-col rounded-[2rem] bg-gray-900 p-10 text-white shadow-2xl shadow-orange-200 lg:scale-105">
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-1 text-[10px] font-black tracking-widest"><Flame size={12} /> PALING HEMAT</div>
        <h3 class="text-xl font-bold">Khwarizmi PRO</h3>
        <div class="my-6 text-white">
          <span class="text-sm font-medium opacity-60">Hanya</span>
          <div class="text-3xl font-black">Rp 150rb <span class="text-sm font-medium opacity-50">/ bulan</span></div>
        </div>
        <ul class="mb-10 flex-1 space-y-4 text-sm opacity-90">
          <li class="flex items-center gap-3"><Check size={18} class="text-orange-400 shrink-0" /> <strong>Akses SEMUA 8+ Kursus</strong></li>
          <li class="flex items-center gap-3"><Check size={18} class="text-orange-400 shrink-0" /> Sertifikat Jalur Karir</li>
        </ul>
        <button onclick={openPaymentModal} class="inline-flex items-center justify-center gap-2 rounded-full bg-white py-4 font-bold text-orange-600 transition-all hover:scale-105 active:scale-95">Langganan Sekarang <Rocket size={18} /></button>
      </div>

      <div class="flex flex-col rounded-[2rem] border border-gray-100 bg-white p-10 transition-all hover:shadow-xl">
        <h3 class="text-xl font-bold text-gray-900">Career Bundling</h3>
        <div class="my-6">
          <span class="text-sm font-medium text-gray-400">Hemat hingga</span>
          <div class="text-3xl font-black text-gray-900">30% <span class="text-sm font-medium text-gray-400">OFF</span></div>
        </div>
        <p class="mb-10 text-sm text-gray-500">Paket lengkap dari nol sampai mahir dengan alur terstruktur.</p>
        <a href="/courses" class="rounded-full border-2 border-gray-100 py-4 text-center font-bold text-gray-700 hover:border-gray-900">Paket Bundling</a>
      </div>
    </div>
  </div>
</section>
