<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import * as XLSX from "xlsx";
  import toast, { Toaster } from "svelte-french-toast";
  import { Users, Wallet, BookMarked, ClipboardList, BarChart3, ArrowRight, CalendarDays } from "@lucide/svelte";

  // --- DATA MANAGEMENT ---
  
  // Fitur 1: Live Class & Mentor Schedule
  let liveClasses = $state([
    { id: 1, mentor: "Jesy", subject: "UI/UX Advanced", time: "14:00", date: "Hari Ini", status: "Ready" },
    { id: 2, mentor: "Budi", subject: "Backend MySQL", time: "16:30", date: "Besok", status: "Pending" }
  ]);

  // Fitur 2: Monitoring Performa Siswa (Tugas)
  let studentTasks = $state([
    { id: 1, name: "Ahmad Fauzi", task: "Landing Page Svelte", progress: 100, status: "Selesai" },
    { id: 2, name: "Siti Aminah", task: "Database Design", progress: 45, status: "Proses" },
    { id: 3, name: "Rizky Ramadhan", task: "API Integration", progress: 10, status: "Belum" }
  ]);

  // Data Statistik & Inventory
  const adminStats = [
    { label: "Total Students", value: "1,205", grow: "+12%", icon: Users, color: "bg-[#0D9488]/10 text-[#0D9488]" },
    { label: "Total Revenue", value: "Rp 45.2M", grow: "+8%", icon: Wallet, color: "bg-[#14B8A6]/10 text-[#14B8A6]" },
    { label: "Active Courses", value: "48", grow: "+2", icon: BookMarked, color: "bg-[#F59E0B]/10 text-[#F59E0B]" },
    { label: "New Assignments", value: "156", grow: "Pending", icon: ClipboardList, color: "bg-slate-100 text-slate-600" },
  ];

  let courseManagement = $state([
    { id: 1, title: "Mastering Mobile App Design", sales: 450, price: 150000, status: "Published" },
    { id: 2, title: "Fullstack Web Developer", sales: 890, price: 250000, status: "Published" },
  ]);

  // --- FUNCTIONS ---
  function exportToExcel() {
    const loadingToast = toast.loading("Menyiapkan laporan...");
    setTimeout(() => {
      const worksheet = XLSX.utils.json_to_sheet(studentTasks);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Performa Siswa");
      XLSX.writeFile(workbook, `Khwarizmi_Performance_${Date.now()}.xlsx`);
      toast.success("Laporan Performa Berhasil!", { id: loadingToast });
    }, 1200);
  }
</script>

<Toaster />

<div class="space-y-8 max-w-7xl mx-auto px-4 font-plus antialiased pb-20 mt-8">
  <header class="flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100">
          <img src="/logo.webp" alt="Logo" class="w-7 h-7 object-contain" />
        </div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight  uppercase">Admin Console</h1>
        <span class="px-3 py-1 bg-[#14B8A6]/10 text-[#0D9488] text-[10px] font-black rounded-full uppercase tracking-widest border border-[#14B8A6]/20">v4.0.0</span>
      </div>
      <p class="text-slate-500 font-medium mt-1  uppercase text-[11px] tracking-wider opacity-80">Management System for Jesy</p>
    </div>

    <div class="flex items-center gap-4">
      <button onclick={exportToExcel} class="group flex items-center gap-2 bg-white border border-slate-200 px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-700 hover:border-[#14B8A6] hover:text-[#0D9488] transition-all shadow-sm active:scale-95 cursor-pointer">
        <BarChart3 size={18} /> Export Performance
      </button>
      <a href="/admin/content/create" class="bg-[#F59E0B] text-white px-8 py-3.5 rounded-2xl text-sm font-black hover:bg-slate-900 transition-all shadow-lg active:scale-95 no-underline uppercase tracking-widest ">
        + New Course
      </a>
    </div>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each adminStats as stat}
      {@const StatIcon = stat.icon}
      <div class="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4 hover:shadow-xl transition-all group">
        <div class="flex justify-between items-start">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center {stat.color} group-hover:scale-110 transition-transform">
            <StatIcon size={26} />
          </div>
          <span class="text-[10px] font-black px-3 py-1 rounded-full bg-slate-50 border border-slate-100 uppercase tracking-tighter">
            {stat.grow}
          </span>
        </div>
        <div>
          <h4 class="text-2xl font-black text-slate-900  uppercase leading-none">{stat.value}</h4>
          <p class="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.2em]">{stat.label}</p>
        </div>
      </div>
    {/each}
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
    <div class="space-y-8">
      <section class="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div class="p-8 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 class="font-black text-slate-900 text-lg  uppercase tracking-tight">Student Performance</h3>
            <p class="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest opacity-60">Monitoring Tugas Siswa</p>
          </div>
          <span class="text-[9px] font-black text-[#14B8A6] uppercase tracking-[0.2em] border border-[#14B8A6]/30 px-3 py-1 rounded-full bg-white animate-pulse">Live Tracking</span>
        </div>
        <div class="p-4 space-y-4">
          {#each studentTasks as student}
            <a 
  href="/admin/users" 
  class="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-[#14B8A6] hover:shadow-lg transition-all group no-underline block"
>
  <div class="flex items-center gap-4">
    <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-slate-300 border border-slate-100 group-hover:text-[#14B8A6] transition-colors">
      {student.name.charAt(0)}
    </div>
    <div>
      <h5 class="text-sm font-black text-slate-800 uppercase italic">{student.name}</h5>
      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.task}</p>
    </div>
  </div>

  <div class="flex items-center gap-6">
    <div class="w-32 hidden md:block space-y-2">
      <div class="flex justify-between text-[8px] font-black uppercase text-slate-400 italic">
        <span>Progress</span><span>{student.progress}%</span>
      </div>
      <div class="h-1.5 w-full bg-white rounded-full overflow-hidden border border-slate-200">
        <div class="h-full bg-[#14B8A6] transition-all duration-1000" style="width: {student.progress}%"></div>
      </div>
    </div>
    
    <span class="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border {student.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}">
      {student.status}
    </span>
    
    <span class="text-slate-300 group-hover:text-[#14B8A6] transition-transform group-hover:translate-x-1 duration-300">
      <ArrowRight size={18} />
    </span>
  </div>
</a>
          {/each}
        </div>
      </section>

      <section class="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div class="p-8 border-b border-slate-50">
          <h3 class="font-black text-slate-900 text-lg  uppercase tracking-tight">Quick Inventory</h3>
        </div>
        <table class="w-full text-left">
          <tbody class="divide-y divide-slate-50">
            {#each courseManagement as course}
              <tr class="hover:bg-slate-50 transition-all">
                <td class="px-10 py-5 font-black text-slate-700 text-xs  uppercase">{course.title}</td>
                <td class="px-10 py-5 text-right"><span class="px-3 py-1 bg-slate-100 text-[9px] font-black rounded-lg uppercase  text-slate-400">{course.status}</span></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </section>
    </div>

    <aside class="space-y-8 h-fit sticky top-8">
      <div class="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5 group">
        <div class="absolute -top-20 -right-20 w-64 h-64 bg-[#F59E0B]/20 rounded-full blur-[100px]"></div>
        
        <div class="relative z-10 space-y-8">
          <div class="flex items-center justify-between border-b border-white/10 pb-6">
            <h3 class="font-black text-xl  tracking-tight uppercase text-[#F59E0B]">Live Sessions</h3>
            <span class="text-[9px] font-black uppercase text-slate-400 tracking-widest ">Februari 2026</span>
          </div>

          <div class="space-y-4">
            {#each liveClasses as item}
              <div class="p-5 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-all group/card">
                <div class="flex justify-between items-start mb-3">
                  <span class="text-[10px] font-black px-3 py-1 rounded-full {item.status === 'Ready' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/10 text-slate-400 border border-white/10'} uppercase tracking-widest ">{item.status}</span>
                  <span class="text-xs font-mono font-black text-white">{item.time}</span>
                </div>
                <h4 class="text-sm font-black  uppercase group-hover/card:text-[#14B8A6] transition-colors">{item.subject}</h4>
                <div class="flex items-center gap-2 mt-4">
                  <div class="w-6 h-6 rounded-full bg-[#14B8A6] flex items-center justify-center text-[10px] font-black uppercase text-white shadow-lg">{item.mentor.charAt(0)}</div>
                  <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest ">Mentor: {item.mentor}</span>
                </div>
              </div>
            {/each}
          </div>

          <a href="/admin/calender" class="w-full py-5 bg-white text-slate-900 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all hover:bg-[#F59E0B] hover:text-white shadow-xl flex items-center justify-center gap-2 no-underline">
            <CalendarDays size={16} /> CHECK SCHEDULE
          </a>
        </div>
      </div>

     
    </aside>
  </div>
</div>

<style>
  :global(body) { background-color: #f8fafc; }
</style>