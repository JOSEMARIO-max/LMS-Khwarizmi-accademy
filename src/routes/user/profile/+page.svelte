<script lang="ts">
  import toast, { Toaster } from "svelte-french-toast";
  import { TriangleAlert, Gem, X, Check, Lock, Camera, Rocket, Wrench } from "@lucide/svelte";
  import { fade, scale } from "svelte/transition";
  import { user, isPremium, ownedCourses } from "$lib/stores";
  import { goto } from "$app/navigation";

  // --- SVELTE 5 STATE (RUNES) ---
  let activeTab = $state("Subscription");
  const tabs = ["Edit Profile", "Subscription", "Password", "Notifications"];

  let fileInput = $state<HTMLInputElement>();
  let isLoading = $state(false);

  // MODAL STATES
  let showCancelModal = $state(false);
  let showPaymentModal = $state(false);
  let selectedPayment = $state("bca");

  // --- ACTIONS ---
  function handlePhotoChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        $user.avatar = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      toast.success("Foto profil diperbarui!");
    }
  }

  // LOGIC BATAL LANGGANAN
  async function confirmCancel() {
    showCancelModal = false;
    isLoading = true;
    const loadingId = toast.loading("Memproses pembatalan...");

    await new Promise((r) => setTimeout(r, 2000));

    $isPremium = false;
    $user.role = "Member";
    $ownedCourses = [];

    isLoading = false;
    toast.dismiss(loadingId);
    toast.error("Langganan Dihentikan.");
  }

  // LOGIC PEMBAYARAN
  async function processPayment() {
    showPaymentModal = false;
    isLoading = true;
    const loadingId = toast.loading("Menghubungkan ke Gateway...");

    await new Promise((r) => setTimeout(r, 2500));

    $isPremium = true;
    $user.role = "PRO Student";
    $ownedCourses = [1, 2, 3, 4, 5, 6, 7, 8];

    isLoading = false;
    toast.dismiss(loadingId);
    toast.success(`Pembayaran ${selectedPayment.toUpperCase()} Berhasil!`);

    setTimeout(() => goto("/user/courses?new=true"), 1500);
  }
</script>

<Toaster />

{#if showCancelModal || showPaymentModal}
  <div class="fixed inset-0 z-[100] grid place-items-center bg-slate-900/60 backdrop-blur-sm p-4" transition:fade>
    {#if showCancelModal}
      <div class="bg-white p-8 rounded-[2.5rem] w-full max-w-sm text-center shadow-2xl" transition:scale={{ start: 0.9 }}>
        <div class="mb-4 inline-flex text-amber-500"><TriangleAlert size={44} /></div>
        <h3 class="text-xl font-black text-slate-900 mb-2">Berhenti Berlangganan?</h3>
        <p class="text-sm text-slate-500 mb-8 leading-relaxed font-medium">Akses premium dicabut dan semua kursus di Dashboard akan dihapus.</p>
        <div class="flex flex-col gap-3">
          <button onclick={confirmCancel} class="w-full py-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-sm hover:bg-rose-100 transition-all">Ya, Berhenti</button>
          <button onclick={() => (showCancelModal = false)} class="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all">Kembali</button>
        </div>
      </div>
    {/if}

    {#if showPaymentModal}
      <div class="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl" transition:scale={{ start: 0.95 }}>
        <div class="flex justify-between items-center bg-orange-50 px-8 py-5 border-b border-orange-100">
          <h3 class="inline-flex items-center gap-2 font-black text-orange-900"><Gem size={18} /> Checkout PRO</h3>
          <button onclick={() => (showPaymentModal = false)} aria-label="Tutup" class="text-orange-900 font-bold"><X size={20} /></button>
        </div>
        <div class="p-8 bg-slate-50 space-y-2 border-b border-slate-100 text-sm">
          <div class="flex justify-between font-medium text-slate-400"><span>Paket</span><strong class="text-slate-800">Bulanan (Auto-renew)</strong></div>
          <div class="flex justify-between items-center pt-4 border-t border-dashed border-slate-200">
            <span class="font-black text-slate-900">Total Tagihan</span>
            <span class="text-2xl font-black text-orange-600">Rp 150.000</span>
          </div>
        </div>
        <div class="p-8 space-y-6">
          <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Pilih Metode Pembayaran</label>
          <div class="grid grid-cols-2 gap-3">
            {#each ["bca", "mandiri", "card", "gopay"] as method}
              <button
                onclick={() => (selectedPayment = method)}
                class={`relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${selectedPayment === method ? "border-kh-orange bg-orange-50" : "border-slate-100 hover:border-orange-100"}`}
              >
                <span class="font-black text-[10px] uppercase">{method}</span>
                <span class="text-[8px] font-bold text-slate-400">PAYMENT</span>
                {#if selectedPayment === method}
                  <div class="absolute top-2 right-2 text-kh-orange"><Check size={12} strokeWidth={3} /></div>
                {/if}
              </button>
            {/each}
          </div>
          <button onclick={processPayment} class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-kh-orange shadow-lg shadow-slate-200 transition-all active:scale-95 inline-flex items-center justify-center gap-2"><Lock size={16} /> Bayar Sekarang</button>
          <p class="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest italic">Encrypted Secure Payment</p>
        </div>
      </div>
    {/if}
  </div>
{/if}

<div class="max-w-5xl mx-auto px-6 py-10 font-plus antialiased">
  <div class="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 mb-10">
    <div class="h-40 bg-gradient-to-r from-kh-orange to-rose-400 relative">
      <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
    </div>
    <div class="px-8 pb-8 flex flex-col md:flex-row items-end gap-6 -mt-16 relative z-10">
      <div class="relative shrink-0">
        <img src={$user.avatar} alt="avatar" class="w-32 h-32 rounded-full border-8 border-white bg-white shadow-xl object-cover" />
        <button onclick={() => fileInput?.click()} class="absolute bottom-2 right-0 w-10 h-10 bg-slate-900 text-white rounded-full border-4 border-white flex items-center justify-center hover:bg-kh-orange transition-all" aria-label="Ubah foto"><Camera size={16} /></button>
        <input type="file" hidden bind:this={fileInput} onchange={handlePhotoChange} />
      </div>
      <div class="flex-1 pb-2">
        <h1 class="text-3xl font-black text-slate-900 flex items-center gap-3">
          {$user.name}
          {#if $isPremium}<span class="bg-orange-50 text-kh-orange px-3 py-1 rounded-lg text-[10px] border border-orange-100 font-black">PRO</span>{/if}
        </h1>
        <p class="font-bold text-slate-400 text-sm">{$user.role} • {$user.location}</p>
      </div>
      <button onclick={() => toast.success("Profil Disimpan")} class="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-kh-orange transition-all active:scale-95 mb-2 shadow-lg shadow-slate-200"
        >Simpan Perubahan</button
      >
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
    <aside class="space-y-6">
      <nav class="bg-white/50 backdrop-blur-md p-2 rounded-[2rem] border border-slate-100 flex flex-col gap-1">
        {#each tabs as tab}
          <button
            onclick={() => (activeTab = tab)}
            class={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === tab ? "bg-white text-kh-orange shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"}`}
          >
            <div class={`w-1.5 h-1.5 rounded-full transition-all ${activeTab === tab ? "bg-kh-orange scale-100" : "bg-transparent scale-0"}`}></div>
            {tab}
          </button>
        {/each}
      </nav>

      <div class="bg-slate-900 p-8 rounded-[2rem] text-white flex justify-between">
        <div class="text-center">
          <span class="block text-2xl font-black text-kh-orange">{$ownedCourses.length}</span>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Courses</span>
        </div>
        <div class="w-px bg-slate-800"></div>
        <div class="text-center">
          <span class="block text-2xl font-black text-kh-orange">{$isPremium ? "98" : "0"}</span>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Points</span>
        </div>
      </div>
    </aside>

    <main class="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm min-h-[500px]">
      {#if activeTab === "Edit Profile"}
        <div in:fade class="space-y-8">
          <h3 class="text-xl font-black text-slate-900 border-b border-slate-50 pb-6">Personal Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label><input
                type="text"
                bind:value={$user.name}
                class="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div class="space-y-2">
              <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Role (View Only)</label><input
                type="text"
                bind:value={$user.role}
                disabled
                class="w-full bg-slate-50/50 border-none rounded-2xl p-4 text-sm font-bold text-slate-300"
              />
            </div>
            <div class="space-y-2">
              <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Email</label><input
                type="email"
                bind:value={$user.email}
                class="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none"
              />
            </div>
            <div class="space-y-2">
              <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Location</label><input
                type="text"
                bind:value={$user.location}
                class="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none"
              />
            </div>
          </div>
        </div>
      {:else if activeTab === "Subscription"}
        <div in:fade class="space-y-8">
          <h3 class="text-xl font-black text-slate-900 border-b border-slate-50 pb-6">Status Langganan</h3>

          {#if $isPremium}
            <div class="bg-orange-50/50 rounded-[2.5rem] p-8 border-2 border-orange-100 space-y-8 relative overflow-hidden">
              <div class="absolute -top-6 -right-6 text-kh-orange/5 select-none"><Gem size={150} strokeWidth={1} /></div>
              <div class="flex flex-wrap justify-between items-start gap-4">
                <div class="space-y-2">
                  <h4 class="text-2xl font-black text-orange-900">Khwarizmi PRO Plan</h4>
                  <span class="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm shadow-emerald-200">Active • Auto Renew</span>
                </div>
                <div class="text-3xl font-black text-orange-600 leading-none">Rp 150k<span class="text-sm text-orange-400 font-bold tracking-normal">/bln</span></div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p class="flex items-center gap-3 text-sm font-bold text-orange-800/70"><Check size={16} class="text-kh-teal shrink-0" /> Full Access Courses</p>
                <p class="flex items-center gap-3 text-sm font-bold text-orange-800/70"><Check size={16} class="text-kh-teal shrink-0" /> Premium Assets Download</p>
                <p class="flex items-center gap-3 text-sm font-bold text-orange-800/70"><Check size={16} class="text-kh-teal shrink-0" /> Industry Certificates</p>
                <p class="flex items-center gap-3 text-sm font-bold text-orange-800/70"><Check size={16} class="text-kh-teal shrink-0" /> Mentor Community Access</p>
              </div>
              <div class="flex items-center justify-between pt-8 border-t border-orange-100/50">
                <span class="text-[10px] font-bold text-orange-300 uppercase tracking-[0.2em]">Next Invoice: 24 Feb 2026</span>
                <button onclick={() => (showCancelModal = true)} class="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline">Batalkan Langganan</button>
              </div>
            </div>
          {:else}
            <div class="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 text-center space-y-6">
              <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto text-kh-orange shadow-sm"><Rocket size={30} /></div>
              <div class="space-y-2">
                <h4 class="text-xl font-black text-slate-900">Free Starter Plan</h4>
                <p class="text-slate-400 text-sm font-medium leading-relaxed">Upgrade untuk mengakses kembali kursus Anda dan membuka fitur Dashboard eksklusif.</p>
              </div>
              <button onclick={() => (showPaymentModal = true)} class="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-12 py-4 rounded-full font-black text-sm hover:bg-kh-orange transition-all shadow-xl shadow-slate-200"
                >Aktifkan Kembali PRO <Rocket size={16} /></button
              >
            </div>
          {/if}
        </div>
      {:else}
        <div in:fade class="text-center py-20">
          <div class="mb-6 inline-flex text-slate-300"><Wrench size={44} /></div>
          <h3 class="text-lg font-black text-slate-900">Segera Hadir</h3>
          <p class="text-slate-400 font-medium">Fitur Notifications & Password Security sedang dikembangkan.</p>
        </div>
      {/if}
    </main>
  </div>
</div>
