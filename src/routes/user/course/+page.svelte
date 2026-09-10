<script lang="ts">
  import { ownedCourses } from "$lib/stores";
  import { fade, fly } from "svelte/transition";
  import { BookOpen, FolderOpen } from "@lucide/svelte";

  // --- DATA MASTER ---
  const allLessons = [
    { id: 1, title: "Mastering Mobile App Design (Figma)", mentor: "Padhang Satrio", total: 24, done: 18, img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80", status: "active" },
    { id: 2, title: "Fullstack Web Developer: HTML to React", mentor: "Leonardo Samsul", total: 45, done: 12, img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80", status: "completed" },
    { id: 3, title: "Advanced Brand Identity & Logo", mentor: "Bayu Salto", total: 20, done: 0, img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80", status: "active" },
    { id: 4, title: "Python for Data Science Bootcamp", mentor: "Sarah Vi", total: 60, done: 0, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80", status: "active" },
    { id: 5, title: "Digital Marketing: Ads & SEO Mastery", mentor: "Kevin H.", total: 30, done: 0, img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80", status: "active" },
    { id: 6, title: "3D Modeling with Blender for Beginners", mentor: "Dian Sastro", total: 25, done: 0, img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80", status: "active" },
    { id: 7, title: "Copywriting that Sells", mentor: "Andi Penulis", total: 15, done: 0, img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80", status: "active" },
    { id: 8, title: "Flutter Mobile Dev: iOS & Android", mentor: "Rizky K.", total: 50, done: 0, img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80", status: "active" },
  ];

  // --- SVELTE 5 RUNES (STATE & DERIVED) ---
  // Kita menggunakan Signal reaktif untuk memfilter kursus yang dimiliki
  let myLessons = $derived(allLessons.filter((l) => $ownedCourses.includes(l.id)));

  // Helper function untuk progress
  const calculateProgress = (done: number, total: number) => {
    if (!total) return 0;
    return Math.round((done / total) * 100);
  };
</script>

<div class="max-w-7xl mx-auto px-6 py-10 pb-24 font-plus">
  <header class="mb-10 border-b border-slate-100 pb-8">
    <h1 class="flex items-center gap-3 text-3xl font-black text-slate-900 tracking-tight">My Learning <BookOpen size={26} class="text-kh-orange" /></h1>
    <p class="text-slate-500 font-medium mt-1">Lanjutkan perjalanan belajarmu dan raih mimpimu.</p>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {#if myLessons.length === 0}
      <div class="col-span-full py-20 bg-white border-2 border-dashed border-slate-200 rounded-[3rem] text-center" in:fade>
        <span class="mb-6 inline-flex text-slate-300"><FolderOpen size={64} strokeWidth={1.5} /></span>
        <h3 class="text-xl font-black text-slate-800">Kamu belum memiliki kursus</h3>
        <p class="text-slate-400 font-medium mt-2">Investasi ilmu adalah investasi terbaik untuk masa depan.</p>
        <a href="/user/courses" class="mt-8 inline-block bg-slate-900 hover:bg-kh-orange text-white px-8 py-3.5 rounded-full font-bold transition-all hover:-translate-y-1"> Eksplorasi Katalog </a>
      </div>
    {:else}
      {#each myLessons as item (item.id)}
        {@const progress = calculateProgress(item.done, item.total)}

        <div class="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2" in:fly={{ y: 20, duration: 400 }}>
          <div class="relative aspect-video overflow-hidden">
            <img src={item.img} alt={item.title} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            {#if item.status === "completed"}
              <div class="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200">Completed</div>
            {/if}
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <span class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">BY {item.mentor}</span>
            <h3 class="text-lg font-bold text-slate-900 leading-tight mb-6 group-hover:text-kh-orange transition-colors line-clamp-2">
              {item.title}
            </h3>

            <div class="mt-auto space-y-3">
              <div class="flex justify-between items-end">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Learning Progress</span>
                <span class="text-sm font-black text-slate-900">{progress}%</span>
              </div>
              <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-kh-orange rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(246,125,38,0.4)]" style="width: {progress}%"></div>
              </div>
              <p class="text-[11px] font-bold text-slate-400 italic">
                {item.done} dari {item.total} materi selesai
              </p>
            </div>

            <div class="mt-6 pt-6 border-t border-slate-50">
              <a
                href="/user/courses/{item.id}"
                class="block w-full py-4 rounded-2xl text-center font-bold text-sm transition-all
                {item.status === 'completed' ? 'bg-slate-50 text-slate-400' : 'bg-slate-900 text-white hover:bg-kh-orange shadow-lg shadow-slate-200'}"
              >
                {item.status === "completed" ? "Review Materi" : "Lanjut Belajar"}
              </a>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  /* Menghapus gaya yang sudah ditangani oleh Tailwind v4 */
  :global(body) {
    background-color: #f8fafc;
  }
</style>
