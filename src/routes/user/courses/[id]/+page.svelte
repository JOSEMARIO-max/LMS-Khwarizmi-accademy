<script lang="ts">
  import { page } from "$app/state";
  import { fade, fly, slide } from "svelte/transition";
  import { Check, ArrowRight, Star, Users, Wrench, Clock, Play } from "@lucide/svelte";

  // --- SVELTE 5 STATE (RUNES) ---
  const courseId = $derived(page.params.id);
  let activeTab = $state("deskripsi");

  // State untuk melacak video yang sudah selesai (ID)
  let completedVideos = $state<number[]>([]);

  // Data Detail Kursus
  const courseDetail = {
    id: courseId,
    title: "Mastering Mobile App Design (Figma)",
    description: "Pelajari cara merancang aplikasi mobile yang menarik dan fungsional dari nol menggunakan palet warna branding Khwarizmi Academy.",
    mentor: "Padhang Satrio",
    role: "Senior Product Designer",
    students: 1205,
    rating: 4.8,
  };

  // Playlist: Menggunakan Video ID YouTube
  const playlist = [
    { id: 101, title: "Introduction to Mobile Design", duration: "10:45", ytId: "VdYvSQZC1KI" },
    { id: 102, title: "UI/UX Case Study Deep Dive", duration: "15:20", ytId: "jn06QvzBFUo" },
    { id: 103, title: "Advanced Figma Prototyping", duration: "12:10", ytId: "pHUUXIEyLnQ" },
    { id: 104, title: "Micro-interactions 101", duration: "08:40", ytId: "VdYvSQZC1KI" },
  ];

  // Video yang sedang diputar
  let currentVideo = $state(playlist[0]);

  // Derivasi Progress (%) secara reaktif
  const progressPercent = $derived(playlist.length > 0 ? Math.round((completedVideos.length / playlist.length) * 100) : 0);

  // --- ACTIONS ---
  function playVideo(video: any) {
    currentVideo = video;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleComplete(id: number) {
    if (completedVideos.includes(id)) {
      completedVideos = completedVideos.filter((vId) => vId !== id);
    } else {
      completedVideos = [...completedVideos, id];
    }
  }
</script>

<div class="max-w-7xl mx-auto px-6 py-8 font-plus antialiased text-slate-800 mt-4">
  <div class="mb-10 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
    <div class="flex-1 w-full">
      <div class="flex justify-between items-end mb-4">
        <div>
          <h2 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic mb-1">Learning Progress</h2>
          <p class="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">{progressPercent}% Completed</p>
        </div>
        <div class="text-right">
          <span class="text-[10px] font-black text-[#0D9488] bg-[#14B8A6]/10 px-4 py-1.5 rounded-full uppercase italic border border-[#14B8A6]/20">
            {completedVideos.length} / {playlist.length} Lessons Done
          </span>
        </div>
      </div>
      <div class="h-4 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-inner">
        <div class="h-full bg-gradient-to-r from-[#14B8A6] to-[#0D9488] transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(20,184,166,0.4)]" style="width: {progressPercent}%"></div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
    <div class="space-y-8">
      <div class="relative aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl shadow-teal-900/20 border-4 border-white">
        {#key currentVideo.ytId}
          <iframe
            class="w-full h-full shadow-inner"
            src="https://www.youtube.com/embed/{currentVideo.ytId}?autoplay=1&modestbranding=1&rel=0&color=white"
            title={currentVideo.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        {/key}
      </div>

      <div class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 bg-[#14B8A6]/10 text-[#0D9488] text-[9px] font-black rounded-full uppercase tracking-widest italic border border-[#14B8A6]/20">Active Lesson</span>
              <span class="text-slate-300">/</span>
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">ID: KH-{currentVideo.id}</span>
            </div>
            <h1 class="text-4xl font-black text-slate-900 leading-tight italic uppercase tracking-tighter">
              {currentVideo.title}
            </h1>
          </div>

          <button
            onclick={() => toggleComplete(currentVideo.id)}
            class="shrink-0 flex items-center justify-center gap-3 px-8 py-4 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all italic shadow-xl active:scale-95
            {completedVideos.includes(currentVideo.id) ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-slate-900 text-white hover:bg-[#14B8A6] shadow-slate-200'}"
          >
            {#if completedVideos.includes(currentVideo.id)}
              <span class="inline-flex items-center gap-2"><Check size={15} strokeWidth={3} /> Selesai Menonton</span>
            {:else}
              <span class="inline-flex items-center gap-2">Tandai Selesai <ArrowRight size={15} /></span>
            {/if}
          </button>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] p-0.5 shadow-lg">
              <img src="https://ui-avatars.com/api/?name={courseDetail.mentor}&background=fff&color=0D9488&bold=true" alt="m" class="w-full h-full rounded-[0.8rem] object-cover" />
            </div>
            <div>
              <span class="block font-black text-slate-900 text-base italic uppercase leading-none">{courseDetail.mentor}</span>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1.5 block">{courseDetail.role}</span>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-white px-6 py-4 rounded-3xl border border-slate-100 font-black text-xs text-slate-600 shadow-sm">
            <span class="inline-flex items-center gap-1.5 text-[#F59E0B] italic"><Star size={14} fill="currentColor" /> {courseDetail.rating}</span>
            <div class="w-1 h-1 bg-slate-200 rounded-full"></div>
            <span class="inline-flex items-center gap-1.5 italic tracking-tighter"><Users size={14} /> {courseDetail.students} Enrolled</span>
          </div>
        </div>

        <div class="space-y-6 pt-4">
          <nav class="flex gap-10 border-b border-slate-100">
            {#each ["deskripsi", "diskusi", "materi-pendukung"] as tab}
              <button
                onclick={() => (activeTab = tab)}
                class="pb-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative italic
                {activeTab === tab ? 'text-[#0D9488]' : 'text-slate-400 hover:text-slate-600'}"
              >
                {tab.replace("-", " ")}
                {#if activeTab === tab}
                  <div class="absolute bottom-0 left-0 w-full h-1 bg-[#14B8A6] rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]" in:slide={{ axis: "x" }}></div>
                {/if}
              </button>
            {/each}
          </nav>

          <div class="min-h-[150px] py-4" in:fade>
            {#if activeTab === "deskripsi"}
              <p class="text-slate-500 leading-relaxed font-medium text-lg italic opacity-90">
                "{courseDetail.description}"
              </p>
            {:else if activeTab === "materi-pendukung"}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="group flex items-center gap-5 p-5 bg-white rounded-[2.5rem] border border-slate-100 hover:border-[#14B8A6]/30 hover:shadow-xl hover:shadow-teal-900/5 transition-all">
                  <div class="w-14 h-14 shrink-0 bg-rose-50 rounded-[1.5rem] flex items-center justify-center group-hover:bg-rose-500 transition-colors shadow-inner">
                    <span class="text-rose-500 group-hover:text-white text-xs font-black italic uppercase">PDF</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-[12px] font-black text-slate-800 uppercase tracking-tight truncate italic">E-Book: UI Design Mastery</h4>
                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Format: PDF • 12.5 MB</p>
                    <button class="text-[10px] font-black text-[#0D9488] uppercase tracking-widest mt-2 inline-flex items-center gap-1.5 hover:underline">Download File <ArrowRight size={13} /></button>
                  </div>
                </div>

                <div class="group flex items-center gap-5 p-5 bg-white rounded-[2.5rem] border border-slate-100 hover:border-[#14B8A6]/30 hover:shadow-xl hover:shadow-teal-900/5 transition-all">
                  <div class="w-14 h-14 shrink-0 bg-amber-50 rounded-[1.5rem] flex items-center justify-center group-hover:bg-[#F59E0B] transition-colors shadow-inner">
                    <span class="text-[#F59E0B] group-hover:text-white text-xs font-black italic uppercase">ZIP</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-[12px] font-black text-slate-800 uppercase tracking-tight truncate italic">Project Assets Pack</h4>
                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Icon, Font, & Images</p>
                    <button class="text-[10px] font-black text-[#0D9488] uppercase tracking-widest mt-2 inline-flex items-center gap-1.5 hover:underline">Download ZIP <ArrowRight size={13} /></button>
                  </div>
                </div>

                {#each playlist.slice(0, 1) as ref}
                  <button class="group flex items-center gap-5 p-5 bg-[#14B8A6]/5 rounded-[2.5rem] border border-[#14B8A6]/10 hover:border-[#14B8A6] hover:shadow-xl transition-all text-left" onclick={() => playVideo(ref)}>
                    <div class="w-14 h-14 shrink-0 bg-[#14B8A6] rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-teal-100">
                      <span class="text-white text-xs font-black italic uppercase">VID</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-[12px] font-black text-slate-800 uppercase tracking-tight truncate italic">Ref: {ref.title}</h4>
                      <p class="text-[9px] font-bold text-[#0D9488] uppercase tracking-widest mt-1">Video Tutorial Tambahan</p>
                      <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 inline-flex items-center gap-1.5">Klik untuk Putar <Play size={12} fill="currentColor" /></span>
                    </div>
                  </button>
                {/each}
              </div>
            {:else}
              <div class="bg-slate-50 rounded-[2.5rem] p-12 text-center border-2 border-dashed border-slate-200">
                <span class="mb-4 inline-flex text-slate-300"><Wrench size={30} /></span>
                <p class="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em]">Fitur sedang dioptimasi oleh admin Khwarizmi.</p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <aside class="sticky top-10 space-y-6">
      <div class="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-teal-900/5 overflow-hidden flex flex-col">
        <div class="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <h3 class="font-black text-slate-900 uppercase text-xs tracking-widest italic leading-none">Playlist Kursus</h3>
          <span class="px-4 py-1.5 bg-[#F59E0B] text-white text-[10px] font-black rounded-full italic shadow-lg shadow-orange-100">
            {completedVideos.length} / {playlist.length}
          </span>
        </div>

        <div class="p-4 max-h-[550px] overflow-y-auto no-scrollbar space-y-3">
          {#each playlist as item, i}
            <button
              onclick={() => playVideo(item)}
              class="w-full flex items-center gap-4 p-5 rounded-[2.5rem] transition-all group relative overflow-hidden
              {currentVideo.id === item.id ? 'bg-[#14B8A6]/5 border border-[#14B8A6]/20' : 'hover:bg-slate-50 border border-transparent'}"
            >
              <div
                class={`w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl font-black text-sm transition-all italic shadow-sm
                ${completedVideos.includes(item.id) ? "bg-emerald-100 text-emerald-600" : currentVideo.id === item.id ? "bg-[#14B8A6] text-white rotate-6" : "bg-white text-slate-400 group-hover:text-[#0D9488]"}`}
              >
                {#if completedVideos.includes(item.id)}
                  <Check size={16} strokeWidth={3} />
                {:else}
                  {i + 1}
                {/if}
              </div>

              <div class="flex-1 text-left min-w-0">
                <span
                  class={`block text-[13px] font-black leading-tight truncate mb-1.5 transition-colors italic uppercase tracking-tighter
                  ${currentVideo.id === item.id ? "text-[#0D9488]" : "text-slate-700"}`}
                >
                  {item.title}
                </span>
                <div class="flex items-center gap-3">
                  <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60 inline-flex items-center gap-1.5">
                    <Clock size={12} /> {item.duration}
                  </span>
                </div>
              </div>

              {#if currentVideo.id === item.id}
                <div class="flex gap-1 items-end h-4 pr-2">
                  <div class="w-1 h-full bg-[#14B8A6] animate-[bounce_1s_infinite_0s] rounded-full"></div>
                  <div class="w-1 h-1/2 bg-[#14B8A6] animate-[bounce_1s_infinite_0.2s] rounded-full"></div>
                  <div class="w-1 h-3/4 bg-[#14B8A6] animate-[bounce_1s_infinite_0.4s] rounded-full"></div>
                </div>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <div class="bg-slate-900 rounded-[3rem] p-10 text-white space-y-6 relative overflow-hidden group shadow-2xl">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#14B8A6]/20 rounded-full blur-3xl group-hover:bg-[#F59E0B]/20 transition-all duration-700"></div>
        <div class="relative z-10 italic">
          <h4 class="font-black uppercase tracking-widest text-xs text-[#14B8A6] mb-3 leading-none">Tanya Mentor?</h4>
          <p class="text-[11px] text-slate-400 leading-relaxed font-medium italic opacity-90">Bergabunglah dengan Discord komunitas Khwarizmi Academy untuk tanya jawab materi ini.</p>
        </div>
        <button class="w-full py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-[#F59E0B] hover:text-white active:scale-95 shadow-xl italic relative z-10">
          <span class="inline-flex items-center justify-center gap-2">Open Community <ArrowRight size={15} /></span>
        </button>
      </div>
    </aside>
  </div>
</div>

<style>
  :global(.no-scrollbar::-webkit-scrollbar) {
    display: none;
  }
  :global(body) {
    background-color: #fcfcfd;
  }
</style>
