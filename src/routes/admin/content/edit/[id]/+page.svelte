<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import toast, { Toaster } from "svelte-french-toast"; // Import Toast
  import { ArrowLeft, Save, Trash2, Image as ImageIcon, Flag } from "@lucide/svelte";

  // Simulasi pengambilan data berdasarkan ID dari URL
  const courseId = page.params.id;

  // --- STATE DATA LAMA (RUNES) ---
  let courseTitle = $state("Mastering Mobile App Design");
  let category = $state("Design");
  let description = $state("Pelajari cara merancang aplikasi mobile modern menggunakan Figma.");

  // List materi: mencampur data lama dan data baru
  let lessons = $state([
    { id: 101, title: "Pengenalan UI/UX", duration: "05:20", isNew: false, url: "vid_01.mp4" },
    { id: 102, title: "Installasi Figma", duration: "12:45", isNew: false, url: "vid_02.mp4" },
  ]);

  // --- FUNCTIONS ---
  function addNewLesson() {
    lessons = [...lessons, { id: Date.now(), title: "", duration: "", isNew: true, url: null }];
    toast.success("Modul materi baru ditambahkan!", {
      style: "border-radius: 12px; font-size: 13px; font-weight: 800; background: #14B8A6; color: white;",
    });
  }

  function removeLesson(id: number) {
    if (confirm("Hapus materi ini secara permanen?")) {
      lessons = lessons.filter((l) => l.id !== id);
      toast.error("Materi telah dihapus", {
        style: "border-radius: 12px; font-weight: 800;",
      });
    }
  }

  async function handleUpdate() {
    const t = toast.loading(`Sinkronisasi data #${courseId}...`);

    // Simulasi Sinkronisasi Data
    setTimeout(() => {
      toast.success("Kursus Khwarizmi Diperbarui!", { id: t });

      // Delay sedikit sebelum pindah halaman
      setTimeout(() => {
        goto("/admin/content");
      }, 800);
    }, 1500);
  }

  function handleArchive() {
    if (confirm("Arsip kursus ini? Siswa tidak akan bisa mengaksesnya lagi.")) {
      toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
        loading: "Mengarsipkan kursus...",
        success: "Kursus berhasil diarsipkan",
        error: "Gagal mengarsipkan",
      });
    }
  }
</script>

<Toaster />

<div class="max-w-5xl mx-auto pb-20 font-plus antialiased text-slate-700 mt-4">
  <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
    <div class="flex flex-col">
      <a href="/admin/content" class="text-slate-400 hover:text-[#0D9488] font-bold text-[10px] uppercase tracking-widest transition-all mb-2 flex items-center gap-2 italic">
        <ArrowLeft size={15} /> Back to Content Manager
      </a>
      <h1 class="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
        Edit Course <span class="text-[#14B8A6]">#{courseId}</span>
      </h1>
    </div>
    <div class="flex gap-3 w-full md:w-auto">
      <button
        onclick={handleUpdate}
        class="w-full md:w-auto px-10 py-4 rounded-2xl bg-[#14B8A6] text-white font-black text-sm shadow-xl shadow-teal-100 hover:bg-slate-900 transition-all active:scale-95 cursor-pointer uppercase tracking-widest italic"
      >
        <span class="inline-flex items-center justify-center gap-2">Update Course <Save size={15} /></span>
      </button>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
    <div class="space-y-8">
      <section class="bg-white border border-slate-200 rounded-[3rem] p-8 space-y-8 shadow-sm">
        <div class="flex items-center gap-4 border-b border-slate-50 pb-6">
          <div class="w-2 h-8 bg-[#14B8A6] rounded-full shadow-[0_0_10px_rgba(20,184,166,0.4)]"></div>
          <div>
            <h3 class="text-lg font-black text-slate-900 leading-none italic uppercase">Informasi Utama</h3>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 opacity-60 italic">Metadata inti kursus</p>
          </div>
        </div>

        <div class="space-y-6">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Judul Kursus</label>
            <input
              type="text"
              bind:value={courseTitle}
              class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black text-slate-700 outline-none focus:ring-4 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] transition-all italic"
            />
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Deskripsi Singkat</label>
            <textarea
              rows="4"
              bind:value={description}
              class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium text-slate-600 outline-none focus:ring-4 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] transition-all resize-none"
            ></textarea>
          </div>
        </div>
      </section>

      <section class="bg-white border border-slate-200 rounded-[3rem] p-8 space-y-8 shadow-sm">
        <div class="flex justify-between items-center border-b border-slate-50 pb-6">
          <div class="flex items-center gap-4">
            <div class="w-2 h-8 bg-[#14B8A6] rounded-full shadow-[0_0_10px_rgba(20,184,166,0.4)]"></div>
            <h3 class="text-lg font-black text-slate-900 leading-none italic uppercase">Modul Pembelajaran</h3>
          </div>
          <button
            onclick={addNewLesson}
            class="bg-[#14B8A6]/10 hover:bg-[#14B8A6] hover:text-white text-[#0D9488] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm border border-[#14B8A6]/20 cursor-pointer active:scale-95 italic"
          >
            + Add New Video
          </button>
        </div>

        <div class="space-y-4">
          {#each lessons as lesson, i (lesson.id)}
            <div
              in:slide={{ duration: 400 }}
              class="group bg-slate-50 border {lesson.isNew
                ? 'border-[#14B8A6] bg-[#14B8A6]/5 ring-2 ring-[#14B8A6]/5'
                : 'border-slate-100'} rounded-[2rem] p-6 relative overflow-hidden transition-all hover:bg-white hover:shadow-xl hover:border-[#14B8A6]/30"
            >
              {#if lesson.isNew}
                <div class="absolute top-0 right-0 bg-[#F59E0B] px-4 py-1 rounded-bl-xl text-[8px] font-black uppercase tracking-tighter text-white animate-pulse">New Modul</div>
              {/if}

              <div class="flex flex-col md:flex-row gap-6 items-center relative z-10">
                <div
                  class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center font-black text-slate-400 border border-slate-100 shrink-0 shadow-sm group-hover:text-[#0D9488] group-hover:border-[#14B8A6]/30 transition-all italic text-lg"
                >
                  {i + 1}
                </div>

                <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div class="space-y-1">
                    <input
                      type="text"
                      bind:value={lesson.title}
                      placeholder="Ketik judul materi di sini..."
                      class="w-full bg-transparent border-none p-0 text-sm font-black text-slate-800 outline-none focus:text-[#0D9488] italic transition-colors"
                    />
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">
                      {lesson.isNew ? "Silakan upload file video" : "ID: VID-" + lesson.id + " • " + lesson.url}
                    </p>
                  </div>

                  <div class="flex items-center justify-end gap-6">
                    {#if !lesson.isNew}
                      <button class="text-[9px] font-black text-[#14B8A6] uppercase tracking-[0.2em] hover:text-slate-900 transition-colors cursor-pointer italic">Ganti Video</button>
                    {:else}
                      <input
                        type="file"
                        class="text-[9px] text-slate-400 font-bold w-full max-w-[150px] file:bg-slate-900 file:text-white file:border-none file:rounded-lg file:px-3 file:py-1.5 file:text-[8px] file:font-black file:uppercase file:mr-2 cursor-pointer hover:file:bg-[#14B8A6] transition-all"
                      />
                    {/if}
                    <button
                      onclick={() => removeLesson(lesson.id)}
                      class="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 text-slate-300 hover:text-rose-500 hover:border-rose-200 rounded-xl transition-all shadow-sm cursor-pointer active:scale-90"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </section>
    </div>

    <aside class="space-y-8 h-fit sticky top-24">
      <div class="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-teal-900/20 overflow-hidden relative group">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#14B8A6]/20 rounded-full blur-3xl group-hover:bg-[#14B8A6]/30 transition-all duration-700"></div>

        <h4 class="font-black text-[10px] uppercase tracking-[0.2em] mb-8 text-[#14B8A6] italic opacity-80 relative z-10">Course Live Status</h4>

        <div class="aspect-video bg-white/5 rounded-[1.5rem] border border-white/10 flex flex-col items-center justify-center mb-8 group/thumb hover:bg-white/10 transition-all cursor-pointer relative z-10 overflow-hidden">
          <span class="mb-2 group-hover/thumb:scale-110 transition-transform text-white/60"><ImageIcon size={28} /></span>
          <span class="text-[9px] font-black uppercase tracking-widest opacity-40 group-hover/thumb:opacity-100">Update Thumbnail</span>
        </div>

        <div class="space-y-4 border-t border-white/5 pt-8 relative z-10">
          <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
            <span class="text-slate-500">Visibility</span>
            <span class="bg-[#F59E0B] text-white px-3 py-1 rounded-full text-[8px] shadow-[0_0_15px_rgba(245,158,11,0.3)] italic">PUBLISHED</span>
          </div>
          <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
            <span class="text-slate-500">Modul</span>
            <span class="text-[#14B8A6] italic">{lessons.length} Pelajaran</span>
          </div>
        </div>

        <button
          onclick={handleUpdate}
          class="w-full py-4.5 mt-10 bg-[#14B8A6] text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] hover:bg-[#0D9488] transition-all active:scale-95 shadow-xl shadow-teal-900/40 cursor-pointer italic relative z-10"
        >
          Save Changes
        </button>
      </div>

      <button
        onclick={handleArchive}
        class="w-full py-5 bg-white border border-rose-100 rounded-[2.5rem] text-[9px] font-black uppercase tracking-[0.3em] text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer italic"
      >
        <span class="inline-flex items-center justify-center gap-2">Arsip Kursus <Flag size={13} /></span>
      </button>
    </aside>
  </div>
</div>

<style>
  :global(body) {
    background-color: #f8fafc;
  }
</style>
