<script lang="ts">
  import { fade, fly, slide, scale } from "svelte/transition";
  import toast, { Toaster } from "svelte-french-toast";
  import { BookMarked, Video, Cloud, MoreVertical, Trash2, Search, SearchX, Plus } from "@lucide/svelte";

  // --- DATA DUMMY KONTEN (RUNES) ---
  let courses = $state([
    { id: 1, title: "Mastering Mobile App Design", videos: 12, students: 450, category: "Design", lastUpdate: "2 Jam yang lalu" },
    { id: 2, title: "Fullstack Web Developer", videos: 45, students: 890, category: "Development", lastUpdate: "Kemarin" },
    { id: 3, title: "Python for Data Science", videos: 32, students: 210, category: "Data", lastUpdate: "3 Hari yang lalu" },
    { id: 4, title: "3D Blender Basic", videos: 20, students: 156, category: "Design", lastUpdate: "1 Minggu yang lalu" },
  ]);

  // --- UI STATE ---
  let searchQuery = $state("");
  let isDeleteModalOpen = $state(false);
  let courseToDelete = $state<{ id: number; title: string } | null>(null);

  const filteredCourses = $derived(courses.filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase())));

  // --- FUNCTIONS ---
  function triggerDelete(id: number, title: string) {
    courseToDelete = { id, title };
    isDeleteModalOpen = true;
  }

  function confirmDelete() {
    if (courseToDelete) {
      const t = toast.loading(`Menghapus ${courseToDelete.title}...`);

      setTimeout(() => {
        courses = courses.filter((c) => c.id !== courseToDelete?.id);
        toast.success("Kursus berhasil dihapus!", { id: t });
        isDeleteModalOpen = false;
        courseToDelete = null;
      }, 1000);
    }
  }

  function handleSearchFocus() {
    if (searchQuery.length > 0) {
      toast.success(`Menyaring ${filteredCourses.length} kursus`, {
        duration: 1000,
        position: "bottom-right",
        style: "font-size: 10px; font-weight: 800; text-transform: uppercase; border-radius: 12px;",
      });
    }
  }
</script>

<Toaster />

<div class="space-y-8 pb-10 font-plus antialiased mt-6">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white p-6 rounded-[2rem] border border-slate-100 flex justify-between items-center shadow-sm hover:shadow-md transition-all">
      <div>
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-60 italic">Total Kursus</p>
        <h4 class="text-2xl font-black text-slate-800 italic uppercase">{courses.length}</h4>
      </div>
      <div class="w-12 h-12 rounded-2xl bg-[#14B8A6]/10 text-[#0D9488] flex items-center justify-center shadow-inner"><BookMarked size={24} /></div>
    </div>

    <div class="bg-white p-6 rounded-[2rem] border border-slate-100 flex justify-between items-center shadow-sm hover:shadow-md transition-all">
      <div>
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 opacity-60 italic">Total Video</p>
        <h4 class="text-2xl font-black text-slate-800 italic uppercase">109</h4>
      </div>
      <div class="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center shadow-inner"><Video size={24} /></div>
    </div>

    <div class="bg-gradient-to-br from-[#14B8A6] to-[#0D9488] p-6 rounded-[2rem] shadow-xl shadow-teal-100 flex justify-between items-center text-white group overflow-hidden relative">
      <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div class="relative z-10">
        <p class="text-[10px] font-black text-teal-50 uppercase tracking-widest mb-1 opacity-80 italic">Storage Used</p>
        <h4 class="text-2xl font-black italic tracking-tighter">45.8 GB</h4>
      </div>
      <div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl relative z-10 border border-white/10 backdrop-blur-sm shadow-lg"><Cloud size={24} /></div>
    </div>
  </div>

  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div class="relative w-full max-w-md group">
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0D9488] transition-colors"><Search size={18} /></span>
      <input
        type="text"
        bind:value={searchQuery}
        oninput={handleSearchFocus}
        placeholder="Filter by course title..."
        class="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-700 focus:ring-4 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all shadow-sm italic"
      />
    </div>

    <a
      href="/admin/content/create"
      class="bg-[#F59E0B] hover:bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-sm font-black transition-all active:scale-95 shadow-xl shadow-orange-100 flex items-center justify-center gap-2 italic uppercase tracking-widest"
    >
      <Plus size={18} /> Create New Course
    </a>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    {#each filteredCourses as course (course.id)}
      <div in:fly={{ y: 20, duration: 400 }} class="bg-white border border-slate-100 rounded-[3rem] p-8 space-y-6 group hover:border-[#14B8A6] transition-all shadow-sm hover:shadow-2xl hover:shadow-teal-900/5 relative overflow-hidden">
        <div class="flex justify-between items-start relative z-10">
          <div class="space-y-1">
            <span class="text-[9px] font-black text-[#0D9488] bg-[#14B8A6]/10 px-3 py-1 rounded-full uppercase tracking-[0.25em] border border-[#14B8A6]/20 italic">{course.category}</span>
            <h3 class="text-2xl font-black text-slate-800 group-hover:text-[#0D9488] transition-colors leading-tight mt-3 tracking-tight italic uppercase">{course.title}</h3>
          </div>
          <button class="w-10 h-10 rounded-xl border border-slate-100 text-slate-300 hover:bg-[#0D9488] hover:text-white transition-all flex items-center justify-center font-bold shadow-sm cursor-pointer"><MoreVertical size={18} /></button>
        </div>

        <div class="grid grid-cols-2 gap-6 py-6 border-y border-slate-100/60 relative z-10 italic">
          <div class="text-left space-y-1">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-60 leading-none">Materi Video</p>
            <span class="text-xl font-black text-slate-800">{course.videos} <small class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Vids</small></span>
          </div>
          <div class="text-left border-l border-slate-100 pl-6 space-y-1">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-60 leading-none">Total Siswa</p>
            <span class="text-xl font-black text-slate-800">{course.students} <small class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Students</small></span>
          </div>
        </div>

        <div class="flex items-center justify-between relative z-10">
          <div class="flex items-center gap-2">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="text-[10px] font-black text-slate-400 uppercase italic tracking-tighter">Updated {course.lastUpdate}</span>
          </div>
          <div class="flex gap-3">
            <a
              href="/admin/content/edit/{course.id}"
              class="px-6 py-3 bg-slate-50 hover:bg-[#0D9488] text-slate-600 hover:text-white rounded-2xl text-[10px] font-black uppercase transition-all tracking-[0.15em] flex items-center justify-center border border-slate-200 hover:border-[#14B8A6] shadow-sm active:scale-95 italic"
            >
              Edit Content
            </a>
            <button
              onclick={() => triggerDelete(course.id, course.title)}
              class="w-12 h-12 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-100 rounded-2xl flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer shadow-rose-100/50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredCourses.length === 0}
    <div in:fade class="py-24 text-center bg-white border-2 border-dashed border-slate-200 rounded-[4rem] shadow-inner">
      <div class="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm grayscale opacity-50"><SearchX size={36} /></div>
      <h3 class="text-xl font-black text-slate-300 uppercase tracking-[0.3em] italic">No Courses Found</h3>
      <p class="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">Maaf, kursus tidak ditemukan dalam database Khwarizmi.</p>
      <button
        onclick={() => (searchQuery = "")}
        class="mt-8 px-8 py-3 bg-[#F59E0B] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all active:scale-95 shadow-lg shadow-orange-100 italic">Reset Filter</button
      >
    </div>
  {/if}
</div>

{#if isDeleteModalOpen}
  <div class="fixed inset-0 z-120 flex items-center justify-center p-6">
    <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" transition:fade onclick={() => (isDeleteModalOpen = false)}></div>
    <div class="bg-white w-full max-w-sm rounded-[3.5rem] p-10 relative z-[130] shadow-2xl border border-rose-50 text-center" in:fly={{ y: 20 }} out:scale={{ start: 0.9 }}>
      <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner animate-pulse italic font-black">!</div>
      <h3 class="text-2xl font-black text-slate-900 italic tracking-tight uppercase leading-none">Hapus Kursus?</h3>
      <p class="text-sm font-medium text-slate-500 mt-5 leading-relaxed italic">
        Anda akan menghapus <span class="text-rose-600 font-black underline uppercase">{courseToDelete?.title}</span>. Seluruh data video & statistik siswa di kursus ini akan hilang permanen.
      </p>

      <div class="flex flex-col gap-3 mt-10 italic font-black uppercase">
        <button onclick={confirmDelete} class="w-full bg-rose-500 text-white rounded-2xl py-4.5 text-[11px] tracking-[0.2em] shadow-xl shadow-rose-200 active:scale-95 hover:bg-rose-600 transition-all"> Ya, Hapus Selamanya </button>
        <button onclick={() => (isDeleteModalOpen = false)} class="w-full py-4 text-xs text-slate-400 tracking-widest hover:text-slate-600 transition-all"> Batalkan </button>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    background-image: radial-gradient(#cbd5e1 0.5px, transparent 0.5px);
    background-size: 32px 32px;
    background-color: #f8fafc;
  }
</style>
