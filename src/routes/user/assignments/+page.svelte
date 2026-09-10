<script lang="ts">
  import { tasks, isPremium, ownedCourses } from "$lib/stores";
  import { fade, scale, fly } from "svelte/transition";
  import { ClipboardList, CalendarClock, Lock } from "@lucide/svelte";

  // --- SVELTE 5 STATE & DERIVED ---
  let activeFilter = $state("All");

  const filters = ["All", "To Do", "In Progress", "Completed"];

  // Logic Akses menggunakan $derived (Siswa harus Premium atau punya kursus)
  const hasAccess = $derived($isPremium || $ownedCourses.length > 0);

  // Filter Tugas yang diberikan oleh Admin
  const filteredTasks = $derived.by(() => {
    if (activeFilter === "All") return $tasks;
    return $tasks.filter((t) => t.status === activeFilter);
  });

  // Statistik untuk memantau progres belajar siswa
  const stats = $derived({
    total: $tasks.length,
    completed: $tasks.filter((t) => t.status === "Completed").length,
  });

  // --- ACTIONS ---
  function toggleStatus(task: any) {
    const statusMap: Record<string, string> = {
      "To Do": "In Progress",
      "In Progress": "Completed",
      Completed: "To Do",
    };
    task.status = statusMap[task.status];
    $tasks = $tasks; // Trigger store update untuk progres
  }
</script>

<div class="max-w-5xl mx-auto px-6 py-10 pb-24 font-plus">
  <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
    <div>
      <h1 class="flex items-center gap-3 text-3xl font-black text-slate-900 tracking-tight italic uppercase">Assignments <ClipboardList size={26} class="text-kh-orange" /></h1>
      <p class="text-slate-500 font-medium italic">Selesaikan tugas dari instruktur untuk mengasah skill-mu.</p>
    </div>

    {#if hasAccess}
      <div class="bg-slate-100 px-6 py-3 rounded-2xl border border-slate-200">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</p>
        <p class="text-xs font-bold text-slate-700 mt-1 italic">Tugas Diberikan Admin</p>
      </div>
    {/if}
  </header>

  {#if hasAccess}
    <div in:fade>
      <div class="flex gap-4 mb-10">
        <div class="bg-white p-6 rounded-3xl border-b-4 border-kh-orange shadow-sm flex-1 group hover:shadow-md transition-all">
          <span class="block text-3xl font-black text-slate-900 leading-none mb-1">{stats.total}</span>
          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Total Assignment</span>
        </div>
        <div class="bg-white p-6 rounded-3xl border-b-4 border-emerald-500 shadow-sm flex-1 group hover:shadow-md transition-all">
          <span class="block text-3xl font-black text-slate-900 leading-none mb-1">{stats.completed}</span>
          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Success Rate</span>
        </div>
      </div>

      <nav class="flex gap-2 mb-8 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar">
        {#each filters as f}
          <button
            onclick={() => (activeFilter = f)}
            class="px-5 py-2 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all whitespace-nowrap italic
            {activeFilter === f ? 'bg-[#14B8A6] text-white shadow-lg shadow-teal-100' : 'text-slate-400 hover:bg-slate-100'}"
          >
            {f}
          </button>
        {/each}
      </nav>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredTasks as t (t.id)}
          <a
            href="/user/assignments/{t.id}"
            in:fly={{ y: 20, duration: 300 }}
            class="group bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col no-underline relative overflow-hidden
            {t.status === 'Completed' ? 'bg-slate-50/50 border-dashed opacity-75' : ''}"
          >
            <div class="flex justify-between items-start mb-5 relative z-10">
              <span class="text-[10px] font-black text-[#14B8A6] bg-teal-50 px-3 py-1 rounded-full uppercase tracking-tighter italic border border-teal-100">{t.mapel}</span>
              <div
                class="px-3 py-1 rounded-lg text-[9px] font-black uppercase italic
                {t.priority === 'High' ? 'bg-rose-50 text-rose-600' : t.priority === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}"
              >
                {t.priority}
              </div>
            </div>

            <h3 class="text-xl font-black text-slate-900 mb-3 leading-tight italic uppercase tracking-tighter {t.status === 'Completed' ? 'line-through text-slate-400' : ''}">
              {t.title}
            </h3>
            <p class="text-sm text-slate-500 line-clamp-2 mb-8 flex-1 italic font-medium leading-relaxed">{t.desc}</p>

            <div class="flex items-center justify-between pt-5 border-t border-slate-50 relative z-10">
              <span class="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-400 italic uppercase tracking-widest"><CalendarClock size={13} /> {t.due}</span>

              <button
                onclick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleStatus(t);
                }}
                class="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all italic shadow-sm
                {t.status === 'To Do' ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : t.status === 'In Progress' ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-emerald-500 text-white shadow-emerald-100'}"
              >
                {t.status}
              </button>
            </div>
          </a>
        {/each}
      </div>
    </div>
  {:else}
    <div in:scale={{ start: 0.95 }} class="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-16 text-center shadow-inner">
      <div class="mb-6 inline-flex text-slate-300"><Lock size={56} strokeWidth={1.5} /></div>
      <h3 class="text-2xl font-black text-slate-900 mb-3 uppercase italic tracking-tighter">Fitur Tugas Terkunci</h3>
      <p class="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed font-medium italic">Menu ini khusus untuk siswa aktif Khwarizmi Academy. Silakan bergabung untuk mendapatkan tugas eksklusif dari instruktur.</p>
      <div class="flex flex-wrap justify-center gap-4 italic font-black">
        <a href="/user/courses" class="bg-slate-900 text-white px-10 py-4 rounded-2xl text-xs uppercase tracking-widest hover:bg-[#14B8A6] transition-all shadow-xl shadow-slate-200">Katalog Kursus</a>
        <a href="/user/profile" class="bg-white border-2 border-slate-100 text-slate-900 px-10 py-4 rounded-2xl text-xs uppercase tracking-widest hover:border-slate-900 transition-all">Lihat Benefit</a>
      </div>
    </div>
  {/if}
</div>

<style>
  :global(.no-scrollbar::-webkit-scrollbar) {
    display: none;
  }
</style>
