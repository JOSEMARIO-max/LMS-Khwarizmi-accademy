<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import { page } from "$app/state";
  import { ArrowLeft, Video, Rocket, FolderOpen, NotebookPen, ArrowRight, Lightbulb } from "@lucide/svelte";

  // --- DATA KELAS (Simulasi Berdasarkan ID) ---
  const classId = page.params.id;

  const classDetail = {
    title: "Visual Design Principle",
    mentor: "Padhang Satrio",
    role: "Senior Product Designer",
    time: "08:00 - 09:30",
    zoomLink: "https://zoom.us/j/1234567890", // Contoh Link
    meetingId: "882 1928 3301",
    passcode: "KHWARIZMI",
    description: "Pertemuan hari ini akan membahas tentang keseimbangan visual (Balance), hierarki, dan penggunaan White Space dalam UI Design.",
  };

  let isCameraOn = $state(false);
  let isMicOn = $state(true);
</script>

<div class="max-w-7xl mx-auto px-6 py-8 font-plus antialiased text-slate-800">
  <nav class="mb-8">
    <a href="/user/schedule" class="group flex items-center gap-2 text-slate-400 font-bold text-xs transition-all hover:text-kh-orange uppercase tracking-widest">
      <span class="inline-flex transition-transform group-hover:-translate-x-1"><ArrowLeft size={16} /></span>
      Back to Schedule
    </a>
  </nav>

  <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
    <div class="space-y-8">
      <div class="relative aspect-video bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white group">
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
          <div class="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center text-white/90 mb-6 backdrop-blur-xl border border-white/20 group-hover:scale-110 transition-transform"><Video size={44} /></div>
          <h2 class="text-white text-2xl font-black italic uppercase tracking-tight mb-2">Ready to Join the Class?</h2>
          <p class="text-slate-400 text-sm font-medium max-w-sm mb-8">Siswa disarankan menggunakan aplikasi Zoom untuk pengalaman interaksi yang lebih stabil.</p>

          <div class="flex flex-wrap justify-center gap-4">
            <a
              href={classDetail.zoomLink}
              target="_blank"
              class="bg-indigo-600 hover:bg-kh-orange text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-900/50 active:scale-95"
            >
              <span class="inline-flex items-center gap-2">Launch Zoom App <Rocket size={15} /></span>
            </a>
            <a href={classDetail.zoomLink} target="_blank" class="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all backdrop-blur-md">
              Join via Browser
            </a>
          </div>
        </div>

        <div class="absolute top-6 left-6 flex items-center gap-2">
          <span class="flex h-3 w-3 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          <span class="bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">Live Connection</span>
        </div>
      </div>

      <div class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 class="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-3">{classDetail.title}</h1>
            <p class="text-slate-500 font-medium text-lg italic opacity-80 leading-relaxed max-w-2xl">"{classDetail.description}"</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-y border-slate-100">
          <div class="flex items-center gap-4">
            <img src="https://ui-avatars.com/api/?name={classDetail.mentor}" alt="m" class="w-14 h-14 rounded-2xl border-2 border-white shadow-md" />
            <div>
              <span class="block font-black text-slate-900 leading-none mb-1">{classDetail.mentor}</span>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{classDetail.role}</span>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-center">
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Meeting ID</span>
            <span class="font-mono font-black text-indigo-600 tracking-widest">{classDetail.meetingId}</span>
          </div>
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-center">
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Passcode</span>
            <span class="font-mono font-black text-kh-orange tracking-widest">{classDetail.passcode}</span>
          </div>
        </div>
      </div>
    </div>

    <aside class="space-y-6">
      <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-6">
        <h3 class="font-black text-slate-900 text-xs uppercase tracking-[0.2em] opacity-40">Class Tools</h3>

        <div class="space-y-3">
          <button class="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 border border-slate-100 rounded-2xl transition-all group">
            <div class="flex items-center gap-3">
              <span class="text-indigo-500"><FolderOpen size={20} /></span>
              <span class="text-xs font-black uppercase text-slate-600 group-hover:text-indigo-600">Module Material</span>
            </div>
            <span class="text-slate-300"><ArrowRight size={16} /></span>
          </button>

          <button class="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-teal-50 border border-slate-100 rounded-2xl transition-all group">
            <div class="flex items-center gap-3">
              <span class="text-teal-500"><NotebookPen size={20} /></span>
              <span class="text-xs font-black uppercase text-slate-600 group-hover:text-teal-600">Class Notes</span>
            </div>
            <span class="text-slate-300"><ArrowRight size={16} /></span>
          </button>
        </div>
      </div>

      <div class="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-indigo-100">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>

        <div class="relative z-10 space-y-6">
          <div>
            <h4 class="font-black uppercase tracking-widest text-[10px] text-indigo-200 mb-2">Student Attendance</h4>
            <p class="text-sm font-medium opacity-80 italic">Pastikan Anda mengklik tombol di bawah ini untuk terhitung hadir dalam sesi ini.</p>
          </div>

          <button class="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all hover:bg-kh-orange hover:text-white shadow-xl active:scale-95 italic"> Check-In Presence </button>
        </div>
      </div>

      <div class="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
        <div class="flex items-start gap-4 italic">
          <span class="text-[#14B8A6]"><Lightbulb size={22} /></span>
          <div>
            <h4 class="font-black text-xs uppercase tracking-widest text-[#14B8A6] mb-2">Khwarizmi Tip</h4>
            <p class="text-[11px] text-slate-400 leading-relaxed font-medium">Gunakan headphone untuk fokus maksimal. Jangan ragu menyalakan mic jika ingin bertanya langsung pada mentor.</p>
          </div>
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
