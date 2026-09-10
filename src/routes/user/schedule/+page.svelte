<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { CalendarDays, Download, ArrowRight, Bell } from "@lucide/svelte";

  // --- SVELTE 5 RUNES (CALENDAR LOGIC) ---
  const now = new Date();
  const currYear = now.getFullYear();
  const currMonth = now.getMonth();
  const currDate = now.getDate();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Format Header menggunakan $derived
  const todayLabel = $derived(`TODAY, ${currDate} ${monthNames[currMonth].substring(0, 3).toUpperCase()}`);

  // Generator Kalender reaktif menggunakan $derived.by
  const calendarDays = $derived.by(() => {
    let days = [];
    const firstDayIndex = new Date(currYear, currMonth, 1).getDay();
    const lastDay = new Date(currYear, currMonth + 1, 0).getDate();
    const prevLastDay = new Date(currYear, currMonth, 0).getDate();

    // 1. Bulan Lalu
    for (let i = firstDayIndex; i > 0; i--) {
      days.push({ num: prevLastDay - i + 1, type: "mute" });
    }
    // 2. Bulan Ini
    for (let i = 1; i <= lastDay; i++) {
      days.push({ num: i, type: i === currDate ? "active" : "normal" });
    }
    // 3. Bulan Depan
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ num: i, type: "mute" });
    }
    return days;
  });

  // --- DATA JADWAL ---
  const todayClasses = [
    { id: 1, time: "08:00 - 09:30", mapel: "Visual Design Principle", mentor: "Padhang Satrio", status: "Live Now" },
    { id: 2, time: "10:00 - 11:30", mapel: "User Experience Research", mentor: "Zakir Horizontal", status: "Upcoming" },
  ];

  const upcomingDays = [
    {
      day: "Tomorrow",
      classes: [
        { time: "09:00", mapel: "Front-End Fundamental", color: "bg-blue-500" },
        { time: "13:00", mapel: "Branding Identity", color: "bg-purple-500" },
      ],
    },
    { day: "Next Day", classes: [{ time: "08:00", mapel: "React JS Advanced", color: "bg-orange-500" }] },
  ];
</script>

<div class="max-w-7xl mx-auto px-6 py-10 font-plus antialiased">
  <div class="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-10">
    <main class="space-y-8">
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="flex items-center gap-3 text-3xl font-black text-slate-900 tracking-tight">Schedule <CalendarDays size={26} class="text-kh-orange" /></h1>
          <p class="text-slate-500 font-medium mt-1">Don't miss your class today!</p>
        </div>
        <button class="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:border-kh-orange hover:text-kh-orange transition-all shadow-sm"><Download size={16} /> Download PDF</button>
      </header>

      <section>
        <div class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{todayLabel}</div>

        <div class="space-y-4">
          {#each todayClasses as c}
            <div
              in:fly={{ y: 20 }}
              class="group flex flex-col md:flex-row md:items-center gap-6 bg-white p-6 rounded-[2.5rem] border border-slate-100 transition-all hover:shadow-xl hover:shadow-slate-200/50
              {c.status === 'Live Now' ? 'ring-2 ring-kh-orange bg-orange-50/30' : ''}"
            >
              <div class="flex flex-col gap-1 min-w-[120px]">
                <span class="text-lg font-black text-slate-900 leading-none">{c.time.split(" ")[0]}</span>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-tighter">{c.time.split(" ")[2]}</span>
                {#if c.status === "Live Now"}
                  <span class="inline-flex items-center gap-1.5 mt-2 bg-rose-500 text-white text-[9px] font-black px-2 py-1 rounded-lg animate-pulse w-fit">
                    <span class="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
                  </span>
                {/if}
              </div>

              <div class="flex-1 space-y-3">
                <h3 class="text-lg font-bold text-slate-900 leading-tight group-hover:text-kh-orange transition-colors">{c.mapel}</h3>
                <div class="flex items-center gap-2">
                  <img src="https://ui-avatars.com/api/?name={c.mentor}" alt="m" class="w-6 h-6 rounded-full border border-white shadow-sm" />
                  <span class="text-xs font-bold text-slate-500">{c.mentor}</span>
                </div>
              </div>

              <div class="pt-4 md:pt-0">
                {#if c.status === "Live Now"}
                  <a href="/user/class/{c.id}" class="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-sm font-black shadow-lg shadow-slate-200 hover:bg-kh-orange transition-all active:scale-95">Join Class <ArrowRight size={16} /></a>
                {:else}
                  <button disabled class="bg-slate-50 text-slate-300 px-8 py-3.5 rounded-2xl text-sm font-black cursor-not-allowed"> Upcoming </button>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </section>

      <section class="space-y-6">
        {#each upcomingDays as d}
          <div>
            <div class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{d.day}</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {#each d.classes as c}
                <div class="flex items-center gap-4 bg-white p-5 rounded-3xl border border-slate-50 shadow-sm group hover:border-slate-200 transition-all">
                  <div class="w-1.5 h-10 rounded-full {c.color} group-hover:scale-y-110 transition-transform"></div>
                  <div class="flex-1">
                    <p class="text-sm font-black text-slate-900 leading-none mb-1">{c.time}</p>
                    <p class="text-[11px] font-bold text-slate-400 uppercase truncate">{c.mapel}</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </section>
    </main>

    <aside class="space-y-8">
      <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h3 class="text-center font-black text-slate-900 mb-6">{monthNames[currMonth]} {currYear}</h3>

        <div class="grid grid-cols-7 gap-1 text-center font-bold text-[10px]">
          {#each ["S", "M", "T", "W", "T", "F", "S"] as day}
            <span class="text-slate-300 py-2 uppercase tracking-widest">{day}</span>
          {/each}

          {#each calendarDays as day}
            <span
              class="aspect-square flex items-center justify-center rounded-xl text-xs transition-all
              {day.type === 'active' ? 'bg-kh-orange text-white shadow-lg shadow-orange-200' : ''}
              {day.type === 'mute' ? 'text-slate-200' : 'text-slate-600 hover:bg-slate-50 cursor-pointer'}"
            >
              {day.num}
            </span>
          {/each}
        </div>
      </div>

      <div class="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden">
        <div class="absolute -top-6 -right-6 w-24 h-24 bg-kh-orange/10 rounded-full blur-2xl"></div>

        <div class="flex items-center gap-4 relative z-10">
          <div class="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-kh-orange"><Bell size={24} /></div>
          <div>
            <h4 class="text-kh-orange font-black text-sm uppercase tracking-widest">Mid-Term Exam</h4>
            <p class="text-[10px] text-slate-400 font-bold">Don't forget to prepare!</p>
          </div>
        </div>

        <div class="bg-white/5 border border-white/10 p-4 rounded-2xl text-center space-y-1 relative z-10">
          <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Starts In</p>
          <p class="font-mono text-xl font-black text-kh-orange tracking-tighter">02d : 14h : 35m</p>
        </div>
      </div>
    </aside>
  </div>
</div>

<style>
  /* Menghilangkan scrollbar manual jika ada list yang overflow */
  :global(body) {
    background-color: #f8fafc;
  }
</style>
