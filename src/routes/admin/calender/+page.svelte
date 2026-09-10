<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import { ArrowLeft, Pencil } from "@lucide/svelte";

  // --- DATA JADWAL LENGKAP ---
  let selectedDate = $state("2026-02-23");
  
  let schedules = $state([
    { id: 1, mentor: "Jesy", subject: "UI/UX Advanced", time: "14:00 - 15:30", room: "Zoom Room A", status: "Upcoming", color: "bg-teal-500" },
    { id: 2, mentor: "Budi", subject: "Backend MySQL", time: "16:30 - 18:00", room: "Google Meet", status: "Upcoming", color: "bg-amber-500" },
    { id: 3, mentor: "Anisa", subject: "Svelte Basics", time: "09:00 - 10:30", room: "Zoom Room B", status: "Completed", color: "bg-slate-400" },
  ]);

  // Simulasi hari dalam kalender
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const dates = Array.from({ length: 28 }, (_, i) => i + 1);

  function addSchedule() {
    // Logic untuk tambah jadwal baru bisa ditaruh di sini
    console.log("Membuka modal tambah jadwal...");
  }
</script>

<div class="min-h-screen bg-[#F8FAFC] font-plus antialiased p-8 lg:p-12">
  <div class="max-w-6xl mx-auto space-y-10">
    
   
    <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div class="flex items-center gap-4">
        <a href="/admin" class="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#14B8A6] hover:border-[#14B8A6] transition-all group shadow-sm">
          <span class="inline-flex group-hover:-translate-x-1 transition-transform"><ArrowLeft size={18} /></span>
        </a>
        <div>
          <h1 class="text-3xl font-black text-slate-900 italic uppercase tracking-tight">Class Scheduler</h1>
          <p class="text-[10px] font-black text-[#14B8A6] uppercase tracking-[0.3em] mt-1">Management Live & Mentor Session</p>
        </div>
      </div>

      <button onclick={addSchedule} class="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest italic hover:bg-[#14B8A6] transition-all shadow-xl shadow-slate-200 active:scale-95">
        + Buat Jadwal Baru
      </button>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-10 items-start">
      
     
      <aside class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8">
        <div class="text-center space-y-1">
          <h3 class="font-black text-slate-900 uppercase italic">Februari 2026</h3>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Pilih Tanggal</p>
        </div>

        <div class="grid grid-cols-7 gap-2">
          {#each days as day}
            <div class="text-[9px] font-black text-slate-300 uppercase text-center mb-2">{day}</div>
          {/each}
          {#each dates as date}
            <button 
              class="w-full aspect-square rounded-xl text-[10px] font-black transition-all flex items-center justify-center
              {date === 23 ? 'bg-[#14B8A6] text-white shadow-lg shadow-teal-100' : 'hover:bg-slate-50 text-slate-500'}"
            >
              {date}
            </button>
          {/each}
        </div>

        <div class="pt-6 border-t border-slate-50 space-y-4">
          <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Summary</h4>
          <div class="flex justify-between p-4 bg-slate-50 rounded-2xl">
            <div class="text-center">
              <p class="text-lg font-black text-slate-900 italic">12</p>
              <p class="text-[8px] font-bold text-slate-400 uppercase">Total Kelas</p>
            </div>
            <div class="text-center">
              <p class="text-lg font-black text-[#14B8A6] italic">05</p>
              <p class="text-[8px] font-bold text-slate-400 uppercase">Live Hari Ini</p>
            </div>
          </div>
        </div>
      </aside>

     
      <main class="space-y-6">
        <div class="flex items-center justify-between px-4">
          <h3 class="font-black text-slate-900 text-lg italic uppercase tracking-tight">Timeline: Senin, 23 Feb</h3>
          <div class="flex gap-2">
            <span class="w-3 h-3 rounded-full bg-teal-500"></span>
            <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Upcoming Session</span>
          </div>
        </div>

        <div class="space-y-4">
          {#each schedules as schedule}
            <div 
              class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col md:flex-row justify-between items-center gap-6"
              in:fly={{ y: 20 }}
            >
              <div class="flex items-center gap-6 w-full md:w-auto">
                <div class="w-16 h-16 {schedule.color} rounded-[1.5rem] flex items-center justify-center text-white text-xl shadow-lg shadow-slate-200 group-hover:rotate-12 transition-transform italic font-black">
                  {schedule.mentor.charAt(0)}
                </div>
                <div>
                  <h4 class="text-lg font-black text-slate-900 italic uppercase leading-none group-hover:text-[#14B8A6] transition-colors">{schedule.subject}</h4>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Mentor: {schedule.mentor} • {schedule.room}</p>
                </div>
              </div>

              <div class="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                <div class="text-right">
                  <p class="text-sm font-black text-slate-800 italic uppercase">{schedule.time}</p>
                  <p class="text-[9px] font-bold text-[#14B8A6] uppercase tracking-widest">{schedule.status}</p>
                </div>
                <button aria-label="Edit jadwal" class="bg-slate-50 text-slate-400 p-4 rounded-2xl hover:bg-slate-900 hover:text-white transition-all">
                  <Pencil size={16} />
                </button>
              </div>
            </div>
          {/each}
        </div>
      </main>

    </div>
  </div>
</div>

<style>
  :global(body) { background-color: #F8FAFC; }
</style>