<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { UserService } from "$lib/services/user/user-service";
  import { authStore } from "$lib/stores/auth-store.svelte";
  import type { CategoryStat, Mentor, Course, LearningActivity } from "$lib/types/user/dashboard";
  import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, MoreVertical } from "@lucide/svelte";

  // --- SVELTE 5 RUNES (PENGGANTI STORES LAMA) ---
  let categoryStats = $state<CategoryStat[]>([]);
  let mentors = $state<Mentor[]>([]);
  let myCourses = $state<Course[]>([]);
  let activity = $state<LearningActivity[]>([]);
  let isLoading = $state(true);

  // Fallback data user agar UI tidak error jika backend belum mengirim avatar
  let userName = $derived(authStore.user?.name || "Student");
  let userAvatar = $derived(authStore.user?.profile?.avatar || `https://ui-avatars.com/api/?name=${userName}&background=0D8ABC&color=fff`);

  onMount(async () => {
    try {
      // Ambil semua data dari Laravel secara paralel
      const [statsRes, mentorsRes, coursesRes, activityRes] = await Promise.all([UserService.getCategoryStats(), UserService.getMyMentors(), UserService.getMyCourses(), UserService.getLearningActivity()]);

      categoryStats = statsRes;
      mentors = mentorsRes;
      myCourses = coursesRes;
      activity = activityRes;
    } catch (error) {
      console.error("Gagal memuat dashboard:", error);
    } finally {
      isLoading = false;
    }
  });

  // LOGIK CAROUSEL TETAP SAMA
  let scrollContainer: HTMLDivElement;

  function scroll(direction: "left" | "right") {
    if (scrollContainer) {
      const scrollAmount = 320; // Sesuaikan dengan lebar kartu + gap
      scrollContainer.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }
</script>

<div class="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
  {#if isLoading}
    <div class="p-10 text-center col-span-2 text-slate-400 font-bold animate-pulse">Memuat Dashboard Khwarizmi...</div>
  {:else}
    <main class="space-y-6 overflow-hidden">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-400 to-kh-orange p-8 text-white shadow-lg shadow-orange-100">
        <div class="relative z-10 max-sm:max-w-full max-w-sm space-y-4">
          <span class="inline-block bg-white/20 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider">Online Course</span>
          <h1 class="text-2xl font-black leading-tight tracking-tight">Sharpen Your Skills with <br /> Professional Courses</h1>
          <a href="#catalog" class="inline-flex items-center gap-2 bg-slate-900 px-5 py-2.5 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20">Join Now <ArrowRight size={14} /></a>
        </div>
        <div class="absolute -right-6 -bottom-6 opacity-10 select-none"><Sparkles size={140} strokeWidth={1.2} /></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each categoryStats as stat}
          <div class="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm transition-hover hover:shadow-md">
            <div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-xl">{stat.icon}</div>
            <div class="flex-1 min-w-0">
              <p class="text-[11px] font-black text-slate-800 leading-none">{stat.watched} watched</p>
              <p class="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-wider">{stat.name}</p>
            </div>
          </div>
        {/each}
      </div>

      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-black text-slate-900 tracking-tight">Continue Watching</h3>

          {#if myCourses.length > 2}
            <div class="flex gap-1.5">
              <button aria-label="Sebelumnya" onclick={() => scroll("left")} class="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-400 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center"><ChevronLeft size={16} /></button>
              <button aria-label="Berikutnya" onclick={() => scroll("right")} class="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-400 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center"><ChevronRight size={16} /></button>
            </div>
          {/if}
        </div>

        {#if myCourses.length > 0}
          <div bind:this={scrollContainer} class="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
            {#each myCourses as c (c.id)}
              <div in:fade class="group bg-white p-3 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all min-w-[300px] md:min-w-[calc(50%-12px)] xl:min-w-[320px] snap-start">
                <div class="relative aspect-video rounded-2xl overflow-hidden mb-4">
                  <img src={c.img} alt={c.title} class="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div class="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity"></div>
                </div>
                <div class="px-2 space-y-3 pb-2">
                  <h4 class="font-bold text-slate-900 text-sm leading-snug truncate">{c.title}</h4>
                  <div class="flex items-center gap-2">
                    <img src="https://ui-avatars.com/api/?name={c.author || 'M'}" class="w-6 h-6 rounded-full border border-slate-50" alt="m" />
                    <span class="text-[10px] font-bold text-slate-400">{c.author}</span>
                  </div>
                  <div class="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                    <div class="h-full bg-kh-orange rounded-full shadow-[0_0_8px_rgba(249,115,22,0.4)]" style="width: {c.progress_percentage ?? 45}%"></div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="bg-white border-2 border-dashed border-slate-200 rounded-3xl py-10 text-center">
            <p class="text-slate-400 font-bold text-xs">Belum ada kursus yang aktif.</p>
            <a href="#catalog" class="inline-flex items-center gap-1 text-kh-orange font-black text-xs mt-2 hover:underline">Mulai Belajar <ArrowRight size={14} /></a>
          </div>
        {/if}
      </section>
    </main>

    <aside class="space-y-6">
      <div class="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="font-black text-slate-800 text-xs">Statistic</h3>
          <span class="text-slate-300"><MoreVertical size={16} /></span>
        </div>

        <div class="text-center space-y-3">
          <div class="relative w-24 h-24 mx-auto">
            <svg class="w-full h-full -rotate-90 transform"
              ><circle cx="48" cy="48" r="44" stroke="currentColor" stroke-width="6" fill="transparent" class="text-orange-50" /><circle
                cx="48"
                cy="48"
                r="44"
                stroke="currentColor"
                stroke-width="6"
                fill="transparent"
                stroke-dasharray="276"
                stroke-dashoffset="180"
                class="text-kh-orange"
              /></svg
            >
            <img src={userAvatar} alt="me" class="absolute inset-0 m-auto w-16 h-16 rounded-full object-cover p-1" />
          </div>
          <div>
            <h4 class="font-black text-slate-900 text-[13px]">Good Morning, {userName.split(" ")[0]}!</h4>
            <p class="text-[10px] text-slate-400 font-bold">Keep learning, achieve your target!</p>
          </div>
        </div>

        <div class="space-y-3 pt-4 border-t border-slate-50">
          <div class="flex items-end justify-between gap-1.5 h-16 px-1">
            {#each [40, 70, 50, 100, 30] as h, i}
              <div class="flex-1 rounded-t-sm {i === 3 ? 'bg-kh-orange' : 'bg-slate-100'}" style="height: {h}%"></div>
            {/each}
          </div>
          <div class="flex justify-between text-[8px] font-black text-slate-300 uppercase">
            <span>Aug 1-10</span><span>Aug 11-20</span><span>Aug 21-30</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm space-y-5">
        <div class="flex items-center justify-between">
          <h3 class="font-black text-slate-800 text-xs">Your Mentor</h3>
          <button class="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-black">+</button>
        </div>

        <div class="space-y-4">
          {#each mentors as m}
            <div class="flex items-center gap-3 group">
              <img src={m.img} alt="m" class="w-9 h-9 rounded-xl object-cover transition-transform group-hover:scale-105" />
              <div class="flex-1 min-w-0">
                <strong class="block text-[11px] text-slate-900 truncate tracking-tight">{m.name}</strong>
                <small class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{m.role}</small>
              </div>
              <button class="text-[9px] font-black text-kh-orange px-2 py-1 rounded-md border border-orange-50 hover:bg-kh-orange hover:text-white transition-all">+ Follow</button>
            </div>
          {/each}
        </div>
      </div>
    </aside>
  {/if}
</div>

<style>
  /* CSS Utility untuk menyembunyikan scrollbar tapi fungsi scroll tetap jalan */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
