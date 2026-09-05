<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import toast, { Toaster } from "svelte-french-toast"; // Import Toast
  import { TrendingUp, CreditCard, RefreshCw, BarChart3, Copy, Flame } from "@lucide/svelte";

  // --- SVELTE 5 STATE (SALES DATA) ---
  const revenueStats = [
    { label: "Total Revenue", value: "Rp 128.400.000", grow: "+15.2%", icon: TrendingUp, color: "bg-[#14B8A6]/10 text-[#0D9488]" },
    { label: "Sales This Month", value: "Rp 12.500.000", grow: "+5.4%", icon: CreditCard, color: "bg-[#14B8A6]/10 text-[#14B8A6]" },
    { label: "Refund Requests", value: "2", grow: "-12%", icon: RefreshCw, color: "bg-rose-50 text-rose-600" },
    { label: "Average Order", value: "Rp 185.000", grow: "+2.1%", icon: BarChart3, color: "bg-[#F59E0B]/10 text-[#F59E0B]" },
  ];

  const topCourses = [
    { title: "Fullstack Web Developer", sales: 124, revenue: "Rp 31.000.000" },
    { title: "Mastering Mobile Design", sales: 98, revenue: "Rp 14.700.000" },
    { title: "Python Data Science", sales: 85, revenue: "Rp 17.000.000" },
  ];

  const recentTransactions = [
    { id: "TX-9901", user: "Rizky Pratama", course: "UI/UX Design", amount: "Rp 150.000", date: "Today, 09:45", method: "BCA" },
    { id: "TX-9902", user: "Siti Sarah", course: "Web Dev", amount: "Rp 250.000", date: "Today, 08:30", method: "GOPAY" },
    { id: "TX-9903", user: "Budi Tabuti", course: "Data Science", amount: "Rp 200.000", date: "Yesterday", method: "MANDIRI" },
  ];

  // --- FUNCTIONS ---
  function handleExport() {
    const t = toast.loading("Menyiapkan laporan keuangan Khwarizmi...");
    setTimeout(() => {
      toast.success("Laporan Penjualan berhasil diunduh!", { id: t });
    }, 1500);
  }

  function handleFullReport() {
    const t = toast.loading("Sinkronisasi data gateway...");
    setTimeout(() => {
      toast.success("Analisis selesai! Membuka dashboard detail", { id: t });
    }, 2000);
  }

  function copyTxID(id: string) {
    navigator.clipboard.writeText(id);
    toast.success(`ID ${id} disalin!`, {
      position: "bottom-center",
      style: "font-size: 11px; font-weight: 900; border-radius: 50px; background: #0D9488; color: white;",
    });
  }
</script>

<Toaster />

<div class="space-y-8 pb-20 font-plus antialiased text-slate-700 mt-4">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each revenueStats as stat}
      {@const StatIcon = stat.icon}
      <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 transition-all hover:shadow-xl hover:-translate-y-1 group">
        <div class="flex justify-between items-center">
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center {stat.color} shadow-inner group-hover:scale-110 transition-transform">
            <StatIcon size={22} />
          </div>
          <span class="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 uppercase italic">
            {stat.grow}
          </span>
        </div>
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 opacity-60">{stat.label}</p>
          <h4 class="text-xl font-black text-slate-900 leading-none tracking-tight italic uppercase">{stat.value}</h4>
        </div>
      </div>
    {/each}
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
    <section class="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm flex flex-col">
      <div class="p-8 flex justify-between items-center border-b border-slate-50 bg-white sticky top-0 z-10">
        <div>
          <h3 class="font-black text-slate-900 text-lg italic uppercase tracking-tight">Recent Transactions</h3>
          <p class="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest opacity-60">Live updates from Khwarizmi Gateway</p>
        </div>
        <button
          onclick={handleExport}
          class="text-[10px] font-black text-white bg-[#F59E0B] px-6 py-2.5 rounded-xl uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-orange-100 active:scale-95 cursor-pointer italic"
        >
          Export Report
        </button>
      </div>

      <div class="overflow-x-auto flex-1">
        <table class="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/50 italic">
              <th class="px-8 py-5 border-b border-slate-50">Transaction ID</th>
              <th class="px-6 py-5 border-b border-slate-50">Student & Course</th>
              <th class="px-6 py-5 border-b border-slate-50">Amount</th>
              <th class="px-6 py-5 border-b border-slate-50">Method</th>
              <th class="px-8 py-5 text-right border-b border-slate-50">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            {#each recentTransactions as tx}
              <tr in:fade class="group hover:bg-[#14B8A6]/5 transition-all duration-300">
                <td class="px-8 py-5">
                  <button onclick={() => copyTxID(tx.id)} class="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-tighter hover:text-[#0D9488] transition-colors cursor-pointer flex items-center gap-2">
                    {tx.id} <span class="opacity-0 group-hover:opacity-100 transition-opacity"><Copy size={12} /></span>
                  </button>
                </td>
                <td class="px-6 py-5">
                  <p class="text-sm font-black text-slate-800 leading-none mb-1 italic uppercase group-hover:text-[#0D9488] transition-colors">{tx.user}</p>
                  <p class="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{tx.course}</p>
                </td>
                <td class="px-6 py-5 text-sm font-black text-slate-900 italic">{tx.amount}</td>
                <td class="px-6 py-5">
                  <span class="text-[9px] font-black text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm uppercase tracking-widest">{tx.method}</span>
                </td>
                <td class="px-8 py-5 text-right">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14B8A6]/10 text-[#0D9488] text-[9px] font-black uppercase tracking-widest border border-[#14B8A6]/20 shadow-sm">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse"></span> Success
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>

    <aside class="space-y-8 h-fit sticky top-24">
      <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
        <h3 class="font-black text-slate-900 leading-none uppercase text-[10px] tracking-[0.2em] opacity-40 italic">Best Selling</h3>
        <div class="space-y-6">
          {#each topCourses as course}
            <div class="flex items-center gap-4 group cursor-pointer transition-all hover:translate-x-1">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-black text-slate-800 truncate group-hover:text-[#0D9488] transition-colors italic leading-none">{course.title}</p>
                <p class="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-tighter italic opacity-60">{course.sales} Terjual</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-black text-[#0D9488] italic tracking-tighter">{course.revenue.split(".")[0]}M</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="bg-gradient-to-br from-[#14B8A6] to-[#0D9488] p-8 rounded-[3rem] text-white space-y-6 relative overflow-hidden shadow-2xl shadow-teal-100 group">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
        <div class="absolute -bottom-10 -left-10 w-24 h-24 bg-[#F59E0B]/20 rounded-full blur-2xl opacity-50"></div>

        <div class="flex justify-between items-start relative z-10">
          <div>
            <h4 class="text-teal-50 text-[10px] font-black uppercase tracking-[0.25em] mb-1 italic opacity-80">Monthly Growth</h4>
            <p class="text-4xl font-black italic tracking-tighter">+24.8%</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg transition-transform group-hover:rotate-12"><Flame size={24} /></div>
        </div>

        <div class="flex items-end gap-2 h-20 pt-4 relative z-10">
          {#each [30, 50, 40, 80, 60, 95, 75] as h}
            <div class="flex-1 bg-white/20 rounded-t-lg transition-all hover:bg-white/60 cursor-help" style="height: {h}%" title="{h}%"></div>
          {/each}
        </div>

        <div class="pt-6 border-t border-white/10 relative z-10">
          <button
            onclick={handleFullReport}
            class="w-full py-4.5 bg-white text-[#0D9488] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-slate-900 hover:text-white active:scale-95 shadow-xl shadow-teal-900/20 cursor-pointer italic"
          >
            Generate Full Report
          </button>
        </div>
      </div>
    </aside>
  </div>
</div>

<style>
  :global(body) {
    background-color: #f8fafc;
  }
</style>
