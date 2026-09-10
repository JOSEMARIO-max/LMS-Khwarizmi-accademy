<script lang="ts">
  import { user, ownedCourses } from "$lib/stores";
  import { fly, fade } from "svelte/transition";
  import { GraduationCap, Lock, ArrowRight, Play } from "@lucide/svelte";

  // --- DATA KURSUS ---
  const allCourses = [
    { id: 1, title: "Mastering Mobile App Design", category: "Design", author: "Padhang Satrio", totalMateri: 24, img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80" },
    { id: 2, title: "Fullstack Web Developer", category: "Development", author: "Leonardo Samsul", totalMateri: 45, img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80" },
    { id: 3, title: "Advanced Brand Identity", category: "Design", author: "Bayu Salto", totalMateri: 20, img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80" },
    { id: 4, title: "Python for Data Science", category: "Data", author: "Sarah Vi", totalMateri: 60, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
    { id: 5, title: "Digital Marketing Mastery", category: "Marketing", author: "Kevin H.", totalMateri: 30, img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&q=80" },
    { id: 6, title: "3D Modeling with Blender", category: "Design", author: "Dian Sastro", totalMateri: 25, img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80" },
    { id: 7, title: "Copywriting that Sells", category: "Marketing", author: "Andi Penulis", totalMateri: 15, img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" },
    { id: 8, title: "Flutter Mobile Dev", category: "Development", author: "Rizky K.", totalMateri: 50, img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" },
  ];

  // --- SVELTE 5 RUNES (STATE & DERIVED) ---
  // Reaktivitas otomatis saat ownedCourses di store berubah
  const myLessons = $derived(allCourses.filter((c) => $ownedCourses.includes(c.id)));
</script>

<div class="max-w-7xl mx-auto px-6 py-12 font-plus antialiased">
  <header class="text-center mb-16 space-y-4">
    <div class="inline-block bg-orange-50 text-kh-orange border border-orange-100 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm inline-flex items-center gap-2"><GraduationCap size={13} /> Dashboard Siswa</div>
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
      Selamat Datang, <span class="text-kh-orange">{$user.name}</span>!
    </h1>
    <p class="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
      {#if myLessons.length > 0}
        Lanjutkan progres belajarmu dan raih target karirmu hari ini bersama mentor ahli.
      {:else}
        Akun kamu belum memiliki kelas aktif. Mulai investasikan waktumu sekarang.
      {/if}
    </p>
  </header>

  {#if myLessons.length === 0}
    <div in:fly={{ y: 20 }} class="max-w-2xl mx-auto bg-white p-12 lg:p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center shadow-2xl shadow-slate-100 space-y-8">
      <div class="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-kh-orange"><Lock size={44} /></div>
      <div class="space-y-3">
        <h3 class="text-2xl font-black text-slate-900 tracking-tight">Akses Terkunci</h3>
        <p class="text-slate-500 font-medium leading-relaxed px-4">Kamu belum memiliki kelas aktif. Silakan beli kursus untuk membuka materi belajar dan bimbingan eksklusif.</p>
      </div>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/user/courses" class="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl shadow-slate-200 transition-all hover:bg-kh-orange hover:-translate-y-1 active:scale-95">
          Beli Kelas Sekarang
        </a>
        <a href="/user/profile" class="w-full sm:w-auto border-2 border-slate-100 bg-white text-slate-600 px-10 py-4 rounded-full font-bold text-sm transition-all hover:border-slate-900 hover:text-slate-900"> Cek Langganan </a>
      </div>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each myLessons as lesson (lesson.id)}
        <div in:fly={{ y: 20, duration: 400 }} class="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
          <div class="relative h-56 overflow-hidden">
            <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style="background-image: url('{lesson.img}')"></div>
            <div class="absolute inset-0 bg-black/20 transition-opacity opacity-100 group-hover:opacity-40"></div>

            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <div class="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-kh-orange shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform"><Play size={22} fill="currentColor" /></div>
            </div>

            <div class="absolute top-4 left-4 z-10 bg-white/95 px-4 py-1.5 rounded-xl text-[9px] font-black text-kh-orange uppercase tracking-widest shadow-sm">
              {lesson.category}
            </div>
          </div>

          <div class="p-8 flex flex-col h-full space-y-6">
            <div class="space-y-2">
              <h3 class="text-xl font-bold text-slate-900 leading-tight group-hover:text-kh-orange transition-colors">
                {lesson.title}
              </h3>
              <p class="text-xs font-medium text-slate-400">Mentor: <span class="text-slate-700 font-bold">{lesson.author}</span></p>
            </div>

            <div class="space-y-3 pt-4 border-t border-slate-50">
              <div class="flex justify-between items-end">
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress Belajar</span>
                <span class="text-sm font-black text-slate-900">0%</span>
              </div>
              <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-kh-orange rounded-full w-0 transition-all duration-1000 shadow-[0_0_8px_rgba(246,125,38,0.4)]"></div>
              </div>
              <p class="text-[10px] font-bold text-slate-300 italic">{lesson.totalMateri} Materi Video</p>
            </div>

            <a href="/user/courses/{lesson.id}" class="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm text-center shadow-lg shadow-slate-100 transition-all hover:bg-kh-orange active:scale-95 inline-flex items-center justify-center gap-2">Lanjut Belajar <ArrowRight size={16} /></a>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  /* Menghapus @import manual, font Plus Jakarta Sans ditangani di app.css global */
  :global(body) {
    background-color: #f8fafc;
  }
</style>
