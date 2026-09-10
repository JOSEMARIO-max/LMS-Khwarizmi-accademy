<script lang="ts">
  import { fade, slide, scale, fly } from "svelte/transition";
  import toast, { Toaster } from "svelte-french-toast";
  import { Search, Pencil, Trash2, Zap } from "@lucide/svelte";

  // --- SVELTE 5 STATE (RUNES) ---
  let siteName = $state("Khwarizmi Academy");
  let siteEmail = $state("support@khwarizmi.ac");
  let maintenanceMode = $state(false);
  let searchQuery = $state(""); // Fitur Baru: Search

  // Modal & Form State
  let isCouponModalOpen = $state(false);
  let isDeleteModalOpen = $state(false);
  let editingId = $state<number | null>(null);
  let deletingId = $state<number | null>(null);
  let couponForm = $state({ code: "", discount: "10%", limit: 100 });

  let coupons = $state([
    { id: 1, code: "NEWYEAR2026", discount: "20%", limit: 50, used: 12, status: "Active" },
    { id: 2, code: "PROMOFEB", discount: "15%", limit: 100, used: 85, status: "Active" },
    { id: 3, code: "FLASHDEAL", discount: "50%", limit: 10, used: 10, status: "Expired" },
  ]);

  // --- COMPUTED: FILTER KUPON ---
  // Di Svelte 5, kita pakai function atau getter untuk nilai turunan
  const filteredCoupons = $derived(
    coupons.filter(c => c.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // --- FUNCTIONS ---
  function toggleMaintenance() {
    maintenanceMode = !maintenanceMode;
    if(maintenanceMode) {
      toast("Mode Pemeliharaan Aktif", { style: 'border-radius: 12px; background: #334155; color: #fff;' });
    } else {
      toast.success("Sistem Kembali Online!");
    }
  }

  function openCreateModal() {
    editingId = null;
    couponForm = { code: "", discount: "10%", limit: 100 };
    isCouponModalOpen = true;
  }

  function openEditModal(coupon: any) {
    editingId = coupon.id;
    couponForm = { code: coupon.code, discount: coupon.discount, limit: coupon.limit };
    isCouponModalOpen = true;
  }

  function triggerDelete(id: number) {
    deletingId = id;
    isDeleteModalOpen = true;
  }

  async function saveCoupon() {
    if (!couponForm.code) return toast.error("Kode kupon wajib diisi!");
    const t = toast.loading(editingId ? "Memperbarui..." : "Mendaftarkan...");

    setTimeout(() => {
      if (editingId) {
        coupons = coupons.map((c) => (c.id === editingId ? { ...c, ...couponForm, code: couponForm.code.toUpperCase() } : c));
        toast.success("Berhasil diupdate", { id: t });
      } else {
        coupons = [{ id: Date.now(), ...couponForm, code: couponForm.code.toUpperCase(), used: 0, status: "Active" }, ...coupons];
        toast.success("Kupon Aktif!", { id: t });
      }
      isCouponModalOpen = false;
    }, 800);
  }

  function confirmDelete() {
    if (deletingId) {
      const target = coupons.find((c) => c.id === deletingId);
      coupons = coupons.filter((c) => c.id !== deletingId);
      toast.success(`${target?.code} Dihapus`);
      isDeleteModalOpen = false;
      deletingId = null;
    }
  }

  function handleSaveSettings() {
    const saveToast = toast.loading("Sinkronisasi...");
    setTimeout(() => toast.success("Sistem diperbarui!", { id: saveToast }), 1000);
  }
</script>

<Toaster />

<div class="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 pb-20 font-plus antialiased text-slate-700 mt-8 px-4">
  <main class="space-y-8">
    <section class="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-50 pb-6 mb-8">
        <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center text-white text-2xl shadow-lg shadow-teal-200 font-black italic">K</div>
            <div>
              <h3 class="text-xl font-black text-slate-900 uppercase italic">General Settings</h3>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Update metadata akademi</p>
            </div>
        </div>
        
        <button onclick={toggleMaintenance} 
          class="flex items-center gap-3 px-6 py-3 rounded-2xl transition-all font-black text-[10px] uppercase tracking-tighter {maintenanceMode ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}">
          <span class="w-2 h-2 rounded-full {maintenanceMode ? 'bg-rose-500 animate-ping' : 'bg-slate-300'}"></span>
          Maintenance Mode: {maintenanceMode ? 'ON' : 'OFF'}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Academy Name</label>
          <input type="text" bind:value={siteName} class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black text-slate-700 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all italic" />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Support Email</label>
          <input type="email" bind:value={siteEmail} class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all italic" />
        </div>
      </div>

      <div class="flex justify-end pt-8">
        <button onclick={handleSaveSettings} class="bg-teal-500 hover:bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-teal-100 transition-all active:scale-95 italic">
          Update Identity
        </button>
      </div>
    </section>

    <section class="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col">
      <div class="p-8 space-y-6">
        <div class="flex justify-between items-center">
            <div>
              <h3 class="font-black text-slate-900 text-lg italic uppercase tracking-tight">Marketing Engine</h3>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">List kupon diskon siswa</p>
            </div>
            <button onclick={openCreateModal} class="text-[10px] font-black text-white bg-slate-900 px-8 py-4 rounded-xl uppercase tracking-[0.2em] hover:bg-teal-500 transition-all shadow-lg active:scale-95 italic">+ Add Coupon</button>
        </div>

        <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity"><Search size={16} /></span>
            <input 
              type="text" 
              bind:value={searchQuery}
              placeholder="Cari kode kupon..."
              class="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-teal-500/5 transition-all italic"
            />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-slate-50/50 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
              <th class="px-8 py-5">Code</th>
              <th class="px-6 py-5">Value</th>
              <th class="px-6 py-5 text-center">Usage Progress</th>
              <th class="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            {#each filteredCoupons as c (c.id)}
              <tr in:fade class="group hover:bg-teal-500/5 transition-all duration-300">
                <td class="px-8 py-6">
                    <span class="px-3 py-1 bg-teal-50 text-teal-700 rounded-lg font-mono text-sm font-black italic">{c.code}</span>
                </td>
                <td class="px-6 py-6 text-sm font-black text-slate-700 italic">{c.discount}</td>
                <td class="px-6 py-6">
                  <div class="w-44 mx-auto space-y-1.5">
                    <div class="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-400 italic">
                      <span>{c.used}/{c.limit}</span>
                      <span class="text-teal-600">{Math.round((c.used / c.limit) * 100)}%</span>
                    </div>
                    <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div class="h-full bg-teal-500 transition-all duration-700" style="width: {(c.used / c.limit) * 100}%"></div>
                    </div>
                  </div>
                </td>
                <td class="px-8 py-6 text-right">
                  <div class="flex justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                    <button onclick={() => openEditModal(c)} class="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-all active:scale-90" aria-label="Edit"><Pencil size={16} /></button>
                    <button onclick={() => triggerDelete(c.id)} class="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:border-rose-500 hover:text-rose-600 transition-all active:scale-90" aria-label="Hapus"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            {:else}
              <tr>
                <td colspan="4" class="p-20 text-center text-slate-300 italic font-bold uppercase text-[10px] tracking-widest">Data tidak ditemukan</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <aside class="space-y-6">
    <div class="bg-slate-900 p-10 rounded-[2.5rem] text-white space-y-8 relative overflow-hidden shadow-2xl">
      <div class="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl"></div>
      
      <div class="relative z-10 flex items-center gap-4">
        <div class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10"><Zap size={20} /></div>
        <div>
          <h4 class="font-black text-sm uppercase tracking-widest italic leading-none">System Health</h4>
          <p class="text-[9px] text-teal-400 font-bold mt-2 uppercase tracking-widest italic">All systems operational</p>
        </div>
      </div>

      <div class="space-y-4 relative z-10">
        <div class="p-4 bg-white/5 border border-white/10 rounded-2xl">
            <p class="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1 italic">Last Backup</p>
            <p class="text-xs font-bold italic">22 Feb 2026, 08:30 AM</p>
        </div>
        <button onclick={() => toast.success("Cache Cleared!")} class="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all italic"> Purge Cache </button>
        <button onclick={() => toast.promise(new Promise(r => setTimeout(r, 2000)), { loading: 'Backup...', success: 'Data Aman!', error: 'Gagal' })} 
            class="w-full py-5 bg-amber-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-amber-900/40 active:scale-95 italic">
          BACKUP DATABASE
        </button>
      </div>
    </div>
  </aside>
</div>

<style>
  :global(body) {
    background-color: #f1f5f9;
  }
</style>