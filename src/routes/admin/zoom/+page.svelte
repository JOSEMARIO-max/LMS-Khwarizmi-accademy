<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import { goto } from "$app/navigation";
  import toast, { Toaster } from "svelte-french-toast";
  import { ArrowRight, Link2, Lightbulb } from "@lucide/svelte";

  // --- STATE FORM (RUNES) ---
  let meetingTitle = $state("");
  let mentorName = $state("Padhang Satrio");
  let meetingDate = $state("");
  let meetingTime = $state("");
  let zoomLink = $state("");
  let meetingId = $state("");
  let passcode = $state("");
  let sendNotification = $state(true);

  // --- DATA KELAS (Untuk Dropdown) ---
  const activeClasses = ["Visual Design", "Fullstack Web", "Python Data Science", "UI/UX Research"];
  let selectedClass = $state(activeClasses[0]);

  // --- FUNCTIONS ---
  async function handleCreateMeeting() {
    // Validasi Sederhana
    if (!meetingTitle || !zoomLink || !meetingDate) {
      toast.error("Mohon lengkapi data meeting penting!");
      return;
    }

    const t = toast.loading("Mendaftarkan jadwal Zoom ke sistem...");

    // Simulasi API Call
    setTimeout(() => {
      toast.success("Link Zoom berhasil dipublish ke siswa!", {
        id: t,
        style: "border-radius: 15px; font-weight: 800; background: #0D9488; color: white;",
      });

      // Reset Form atau Redirect
      setTimeout(() => goto("/admin/schedule"), 1000);
    }, 1500);
  }

  function generateId() {
    meetingId = Math.floor(1000000000 + Math.random() * 9000000000)
      .toString()
      .replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
    passcode = "KH-" + Math.random().toString(36).substring(7).toUpperCase();
    toast.success("ID & Passcode tergenerasi otomatis", { position: "bottom-right" });
  }
</script>

<Toaster />

<div class="max-w-5xl mx-auto pb-20 font-plus antialiased text-slate-700 mt-6 px-4">
  <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
    <div>
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center text-white text-2xl shadow-lg italic font-black">Z</div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Create Zoom Meeting</h1>
      </div>
      <p class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-3 ml-1">Jadwalkan sesi live interaktif untuk siswa</p>
    </div>

    <div class="flex gap-3">
      <button onclick={() => goto("/admin/schedule")} class="px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-all">Cancel</button>
      <button onclick={handleCreateMeeting} class="inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-2xl bg-[#14B8A6] text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-teal-100 hover:bg-slate-900 transition-all active:scale-95 italic"
        >Publish Meeting <ArrowRight size={15} /></button
      >
    </div>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
    <div class="space-y-8">
      <section class="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm space-y-8 relative overflow-hidden">
        <div class="flex items-center gap-4 border-b border-slate-50 pb-6">
          <div class="w-10 h-10 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center font-black italic shadow-inner">01</div>
          <h3 class="text-lg font-black text-slate-900 italic uppercase">Informasi Sesi</h3>
        </div>

        <div class="space-y-6">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Judul Pertemuan</label>
            <input
              type="text"
              bind:value={meetingTitle}
              placeholder="Contoh: Live Review: Color Theory Implementation"
              class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black text-slate-700 outline-none focus:ring-4 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] transition-all italic"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Pilih Kelas</label>
              <select bind:value={selectedClass} class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black text-slate-700 outline-none appearance-none cursor-pointer italic">
                {#each activeClasses as cls}
                  <option value={cls}>{cls}</option>
                {/each}
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Nama Mentor</label>
              <input type="text" bind:value={mentorName} class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black text-slate-700 outline-none italic" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Tanggal</label>
              <input type="date" bind:value={meetingDate} class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-600 italic outline-none" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Waktu Mulai (WIB)</label>
              <input type="time" bind:value={meetingTime} class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-600 outline-none" />
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm space-y-8">
        <div class="flex items-center gap-4 border-b border-slate-50 pb-6">
          <div class="w-10 h-10 rounded-xl bg-[#14B8A6]/10 text-[#0D9488] flex items-center justify-center font-black italic shadow-inner">02</div>
          <h3 class="text-lg font-black text-slate-900 italic uppercase">Zoom Credentials</h3>
        </div>

        <div class="space-y-6">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Zoom Join URL</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"><Link2 size={18} /></span>
              <input
                type="url"
                bind:value={zoomLink}
                placeholder="https://zoom.us/j/..."
                class="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-black text-[#0D9488] outline-none focus:ring-4 focus:ring-[#14B8A6]/10 transition-all italic"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic flex justify-between">
                Meeting ID
                <button onclick={generateId} class="text-[#F59E0B] hover:underline decoration-2">Auto Generate</button>
              </label>
              <input type="text" bind:value={meetingId} placeholder="882 1928 3301" class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-mono font-black text-slate-700 outline-none tracking-widest" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Passcode</label>
              <input type="text" bind:value={passcode} placeholder="KHWARIZMI" class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-mono font-black text-slate-700 outline-none uppercase tracking-widest" />
            </div>
          </div>
        </div>
      </section>
    </div>

    <aside class="space-y-8 sticky top-24 h-fit">
      <div class="bg-white border border-slate-200 rounded-[3rem] p-8 space-y-8 shadow-sm">
        <h3 class="font-black text-slate-900 text-xs uppercase tracking-[0.2em] italic opacity-40">Preview Card</h3>

        <div class="p-6 bg-[#14B8A6]/5 border border-[#14B8A6]/20 rounded-[2.5rem] space-y-4">
          <div class="flex justify-between items-start">
            <span class="px-2 py-0.5 bg-[#F59E0B] text-white text-[8px] font-black rounded-md italic uppercase">Live Soon</span>
            <span class="text-[10px] font-black text-slate-400 italic">2h Remaining</span>
          </div>
          <h4 class="font-black text-slate-800 text-base leading-tight italic uppercase">{meetingTitle || "Your Meeting Title"}</h4>
          <div class="flex items-center gap-3 pt-2">
            <div class="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-[10px] font-black text-[#0D9488] italic">LH</div>
            <div class="leading-none">
              <p class="text-[10px] font-black text-slate-900 uppercase italic leading-none">{mentorName}</p>
              <p class="text-[9px] font-bold text-slate-400 mt-1 uppercase italic leading-none">{selectedClass}</p>
            </div>
          </div>
        </div>

        <div class="space-y-4 border-t border-slate-100 pt-8">
          <label class="flex items-center gap-4 cursor-pointer group">
            <div class="relative w-12 h-6 rounded-full transition-all {sendNotification ? 'bg-[#14B8A6]' : 'bg-slate-200'}">
              <input type="checkbox" bind:checked={sendNotification} class="hidden" />
              <div class="absolute top-1 w-4 h-4 bg-white rounded-full transition-all {sendNotification ? 'left-7' : 'left-1'} shadow-sm"></div>
            </div>
            <span class="text-[10px] font-black text-slate-600 uppercase tracking-widest italic group-hover:text-[#0D9488]">Push Notification</span>
          </label>
        </div>
      </div>

      <div class="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#14B8A6]/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
        <div class="relative z-10 italic">
          <p class="text-[10px] font-black text-[#14B8A6] uppercase tracking-[0.3em] mb-4 opacity-80 leading-none inline-flex items-center gap-2"><Lightbulb size={13} /> Admin Tip</p>
          <p class="text-sm text-slate-300 leading-relaxed font-medium italic opacity-90">"Gunakan meeting link permanen untuk kelas reguler agar siswa tidak bingung mencari link baru setiap minggu."</p>
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
