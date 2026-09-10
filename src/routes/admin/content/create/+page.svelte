<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import { goto } from "$app/navigation";
  import toast, { Toaster } from "svelte-french-toast"; // Import Toast
  import { ArrowLeft, Rocket, Link2, Trash2, Image as ImageIcon, Lightbulb } from "@lucide/svelte";

  // --- STATE KURSUS (RUNES) ---
  let courseTitle = $state("");
  let category = $state("Development");
  let description = $state("");
  let price = $state(150000);

  // --- STATE MATERI (URL VIDEO) ---
  let lessons = $state([{ id: 1, title: "", url: "" }]);

  function addLesson() {
    lessons = [...lessons, { id: Date.now(), title: "", url: "" }];
    toast.success("Baris materi baru ditambahkan", {
      style: "border-radius: 15px; font-weight: 800; font-size: 13px; border: 1px solid #14B8A6; color: #0D9488;",
    });
  }

  function removeLesson(id: number) {
    if (lessons.length > 1) {
      lessons = lessons.filter((l) => l.id !== id);
      toast.error("Materi dihapus", {
        style: "border-radius: 15px; font-weight: 800;",
      });
    } else {
      toast.error("Minimal harus ada 1 materi!");
    }
  }

  // --- HANDLE PUBLISH ---
  async function handleSave() {
    if (!courseTitle || !description) {
      toast.error("Mohon lengkapi judul dan deskripsi!", {
        duration: 3000,
        position: "top-center",
        style: "border-radius: 20px; font-weight: 900; text-transform: uppercase; font-size: 12px;",
      });
      return;
    }

    // Validasi URL sederhana
    const emptyUrl = lessons.find((l) => !l.url);
    if (emptyUrl) {
      toast.error("Semua URL video materi wajib diisi!");
      return;
    }

    const uploadToast = toast.loading("Sinkronisasi database Khwarizmi...");

    setTimeout(() => {
      toast.success("Hampir selesai, memproses metadata...", { id: uploadToast });

      setTimeout(() => {
        toast.success("Kursus Berhasil Dipublish!", {
          id: uploadToast,
          duration: 4000,
          style: "background: #0D9488; color: white; font-weight: 900;",
        });

        goto("/admin/content");
      }, 1500);
    }, 2000);
  }

  function handleSaveDraft() {
    toast.success("Draft kursus tersimpan aman.", {
      position: "bottom-right",
      style: "border-radius: 15px; font-weight: 800; border: 1px solid #F59E0B; color: #D97706;",
    });
  }
</script>

<Toaster />

<div class="max-w-5xl mx-auto pb-20 font-plus antialiased text-slate-700 mt-4 px-4">
  <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
    <div class="flex flex-col">
      <a href="/admin/content" class="text-slate-400 hover:text-[#0D9488] font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 mb-2 italic">
        <ArrowLeft size={16} /> Back to Manager
      </a>
      <h1 class="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Create New Course</h1>
    </div>
    <div class="flex gap-3 w-full md:w-auto">
      <button
        onclick={handleSaveDraft}
        class="flex-1 md:flex-none px-8 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-400 font-black hover:text-[#D97706] hover:border-[#F59E0B] transition-all text-[10px] uppercase tracking-widest cursor-pointer active:scale-95 italic"
      >
        Save Draft
      </button>
      <button
        onclick={handleSave}
        class="flex-1 md:flex-none px-10 py-3.5 rounded-2xl bg-[#14B8A6] text-white font-black shadow-xl shadow-teal-100 hover:bg-slate-900 transition-all active:scale-95 text-[10px] uppercase tracking-[0.2em] cursor-pointer italic"
      >
        <span class="inline-flex items-center justify-center gap-2">Publish Course <Rocket size={15} /></span>
      </button>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
    <div class="space-y-8">
      <section class="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm space-y-8">
        <div class="flex items-center gap-4 border-b border-slate-50 pb-6">
          <div class="w-12 h-12 rounded-2xl bg-[#14B8A6]/10 text-[#0D9488] flex items-center justify-center font-black italic shadow-inner text-xl">01</div>
          <div>
            <h3 class="text-xl font-black text-slate-900 italic tracking-tight uppercase leading-none">Informasi Dasar</h3>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60">Detail Utama Kursus</p>
          </div>
        </div>

        <div class="space-y-6">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Judul Kursus</label>
            <input
              type="text"
              bind:value={courseTitle}
              placeholder="Contoh: Mastering Mobile App Design with Figma"
              class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black text-slate-700 outline-none focus:ring-4 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] transition-all placeholder:font-medium placeholder:text-slate-300 italic"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kategori</label>
              <select bind:value={category} class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black text-slate-600 outline-none focus:border-[#14B8A6] appearance-none cursor-pointer italic">
                <option>Development</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Business</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Harga Jual (IDR)</label>
              <input type="number" bind:value={price} class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black text-slate-700 outline-none focus:border-[#14B8A6] italic" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Deskripsi Singkat</label>
            <textarea
              rows="4"
              bind:value={description}
              placeholder="Berikan gambaran singkat materi yang akan dipelajari..."
              class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium text-slate-600 outline-none focus:border-[#14B8A6] resize-none transition-all focus:bg-white"
            ></textarea>
          </div>
        </div>
      </section>

      <section class="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm space-y-8">
        <div class="flex justify-between items-center border-b border-slate-50 pb-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-[#14B8A6]/10 text-[#0D9488] flex items-center justify-center font-black italic shadow-inner text-xl">02</div>
            <div>
              <h3 class="text-xl font-black text-slate-900 italic tracking-tight uppercase leading-none">Kurikulum & URL Materi</h3>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60 italic">Masukkan Link Video & Urutan</p>
            </div>
          </div>
          <button
            onclick={addLesson}
            class="text-[10px] font-black text-[#0D9488] hover:bg-[#14B8A6] hover:text-white bg-[#14B8A6]/10 px-5 py-2.5 rounded-xl uppercase tracking-widest transition-all border border-[#14B8A6]/20 shadow-sm cursor-pointer active:scale-95 italic"
          >
            + Add Lesson
          </button>
        </div>

        <div class="space-y-5">
          {#each lessons as lesson, i (lesson.id)}
            <div in:slide={{ duration: 400 }} class="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 relative group transition-all hover:border-[#14B8A6] hover:bg-white hover:shadow-2xl hover:shadow-teal-900/5">
              <div class="flex flex-col md:flex-row gap-6 items-center">
                <div
                  class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center font-black text-slate-300 border border-slate-100 shrink-0 shadow-sm group-hover:text-[#0D9488] group-hover:border-[#14B8A6]/30 transition-all italic text-lg"
                >
                  {i + 1}
                </div>

                <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div class="space-y-2">
                    <label class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 opacity-60 italic leading-none">Judul Materi</label>
                    <input
                      type="text"
                      bind:value={lesson.title}
                      placeholder="Contoh: Installasi & Pengenalan"
                      class="w-full bg-white border border-slate-100 rounded-xl p-3.5 text-xs font-black text-slate-700 outline-none focus:border-[#14B8A6] transition-all italic placeholder:font-medium"
                    />
                  </div>
                  <div class="space-y-2 relative">
                    <label class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 opacity-60 italic leading-none">Video URL (YouTube/Cloud)</label>
                    <div class="flex gap-3">
                      <div class="relative flex-1">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"><Link2 size={14} /></span>
                        <input
                          type="url"
                          bind:value={lesson.url}
                          placeholder="https://youtube.com/watch?v=..."
                          class="w-full bg-white border border-slate-100 rounded-xl py-3.5 pl-8 pr-3 text-xs font-black text-[#14B8A6] outline-none focus:border-[#14B8A6] transition-all italic placeholder:font-medium"
                        />
                      </div>
                      <button
                        onclick={() => removeLesson(lesson.id)}
                        class="w-11 h-11 flex items-center justify-center bg-white border border-slate-100 text-slate-300 hover:text-rose-500 hover:border-rose-200 rounded-xl transition-all shadow-sm active:scale-90 cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <button
          onclick={addLesson}
          class="w-full py-10 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 font-black hover:border-[#14B8A6] hover:text-[#0D9488] transition-all uppercase text-[10px] tracking-[0.4em] bg-slate-50/30 cursor-pointer italic shadow-inner"
        >
          Click to add new lesson modul
        </button>
      </section>
    </div>

    <aside class="space-y-8 sticky top-24 h-fit">
      <div class="bg-white border border-slate-200 rounded-[3rem] p-8 space-y-8 shadow-sm">
        <div>
          <h3 class="font-black text-slate-900 text-xs uppercase tracking-[0.2em] italic mb-6 opacity-40">Thumbnail Preview</h3>
          <div
            class="aspect-video bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 group hover:border-[#14B8A6] transition-all cursor-pointer overflow-hidden relative shadow-inner"
          >
            <div class="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform group-hover:rotate-6 text-slate-400"><ImageIcon size={28} /></div>
            <div class="text-center px-4">
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block leading-relaxed italic opacity-60">Upload Cover Image</span>
              <span class="text-[8px] font-bold text-[#14B8A6] uppercase tracking-tighter italic mt-1 block">1280 x 720 px Recommended</span>
            </div>
            <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
        </div>

        <div class="space-y-4 pt-8 border-t border-slate-50 italic">
          <div class="flex justify-between items-center text-[10px]">
            <span class="text-slate-400 font-black uppercase tracking-widest opacity-60">Total Modul</span>
            <span class="text-slate-900 font-black px-3 py-1 bg-slate-100 rounded-full italic">{lessons.length} Modules</span>
          </div>
          <div class="flex justify-between items-center text-[10px]">
            <span class="text-slate-400 font-black uppercase tracking-widest opacity-60">Visibility</span>
            <span class="text-[#D97706] font-black px-4 py-1 bg-[#F59E0B]/10 rounded-full border border-[#F59E0B]/20 italic tracking-widest">DRAFT</span>
          </div>
        </div>
      </div>

      <div class="bg-slate-900 p-10 rounded-[3rem] text-white space-y-6 relative overflow-hidden shadow-2xl shadow-teal-100 group">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#14B8A6]/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
        <div class="relative z-10 italic">
          <p class="text-[10px] font-black text-[#14B8A6] uppercase tracking-[0.3em] mb-4 opacity-80 leading-none inline-flex items-center gap-2"><Lightbulb size={13} /> Khwarizmi Tip</p>
          <p class="text-sm text-slate-300 leading-relaxed font-medium italic opacity-90">"Gunakan link dari YouTube (Unlisted) atau Vimeo untuk menghemat penyimpanan server internal Khwarizmi Academy."</p>
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
