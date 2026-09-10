<script lang="ts">
  import { page } from "$app/state"; 
  import { tasks } from "$lib/stores";
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { Check, ArrowLeft, CalendarClock, User, Paperclip, CircleCheck, Clock, PartyPopper, FileText, CloudUpload } from "@lucide/svelte";

  // --- SVELTE 5 STATE & DERIVED ---
  const taskId = $derived(page.params.id);

  // Mencari data tugas secara reaktif
  let task = $derived.by(() => {
    const found = $tasks.find((t) => t.id == taskId);
    return (
      found || {
        title: "Tugas Tidak Ditemukan",
        desc: "Silakan kembali ke menu utama untuk melihat daftar tugas terbaru.",
        mapel: "Error",
        priority: "Low",
        due: "-",
        status: "Unknown",
      }
    );
  });

  // State UI
  let isDragging = $state(false);
  let fileUploaded = $state<File | null>(null);

  // --- STATE UNTUK TOAST ---
  let showToast = $state(false);
  let toastMessage = $state("");

  // --- ACTIONS ---
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      fileUploaded = e.dataTransfer.files[0];
    }
  }

  function handleFileSelect(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      fileUploaded = target.files[0];
    }
  }

  function submitAssignment() {
    if (!fileUploaded) return;
    
    // 1. Set pesan toast
    toastMessage = `Berhasil mengirim: ${fileUploaded.name}`;
    
    // 2. Tampilkan toast
    showToast = true;

    // 3. Hilangkan otomatis setelah 3 detik
    setTimeout(() => {
      showToast = false;
    }, 3000);
  }
</script>

<div class="max-w-6xl mx-auto px-6 py-10 pb-24 font-plus relative">

  {#if showToast}
    <div 
      transition:fly={{ y: 50, duration: 300, easing: cubicOut }}
      class="fixed bottom-10 right-10 z-50 flex items-center gap-4 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-700"
    >
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
        <Check size={16} strokeWidth={3} />
      </div>
      <div>
        <h4 class="text-sm font-black text-emerald-400">Submission Success!</h4>
        <p class="text-xs font-medium text-slate-300">{toastMessage}</p>
      </div>
    </div>
  {/if}
  <a href="/user/assignments" class="group inline-flex items-center gap-2 text-slate-400 font-bold text-sm mb-8 transition-all hover:text-kh-orange">
    <span class="inline-flex transition-transform group-hover:-translate-x-1"><ArrowLeft size={16} /></span>
    Back to Assignments
  </a>

  <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
    
    <div class="space-y-6">
      <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div class="flex flex-wrap gap-3 mb-6">
          <span class="px-4 py-1.5 rounded-xl bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-100">
            {task.mapel}
          </span>
          <span
            class={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border
            ${task.priority === "High" ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-orange-50 text-orange-600 border-orange-100"}`}
          >
            {task.priority} Priority
          </span>
        </div>

        <h1 class="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">{task.title}</h1>

        <div class="flex flex-wrap gap-6 text-sm font-bold text-slate-400">
          <div class="flex items-center gap-2">
            <CalendarClock size={16} /> Due: <span class="text-slate-600">{task.due}</span>
          </div>
          <div class="flex items-center gap-2">
            <User size={16} /> Team: <span class="text-slate-600">Individual</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
        <div>
          <h3 class="text-lg font-black text-slate-900 mb-4">Description</h3>
          <p class="text-slate-500 leading-relaxed font-medium">{task.desc}</p>
        </div>

        <div class="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group transition-all hover:bg-orange-50/50">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 grid place-items-center bg-white rounded-xl shadow-sm text-slate-500"><Paperclip size={18} /></div>
            <div>
              <p class="text-sm font-bold text-slate-800">Reference_Guide.pdf</p>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Teacher's Guide • 2.4 MB</p>
            </div>
          </div>
          <button class="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm"> Download </button>
        </div>
      </div>

      <div class="space-y-6 pt-4">
        <h3 class="text-lg font-black text-slate-900 flex items-center gap-3">
          Comments <span class="text-xs px-2 py-1 bg-slate-100 rounded-lg text-slate-400">2</span>
        </h3>
        <div class="flex gap-4">
          <img src="https://ui-avatars.com/api/?name=Teacher&background=0c2e28&color=fff" alt="t" class="w-10 h-10 rounded-full shadow-sm" />
          <div class="bg-white p-5 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex-1">
            <div class="flex justify-between items-center mb-2">
              <strong class="text-sm text-slate-900">Mr. Mentor Khwarizmi</strong>
              <span class="text-[10px] text-slate-300 font-bold">2 HOURS AGO</span>
            </div>
            <p class="text-sm text-slate-500 leading-relaxed font-medium">Jangan lupa perhatikan konsistensi warna sesuai dengan desain sistem di modul 4 ya!</p>
          </div>
        </div>
      </div>
    </div>

    <aside class="space-y-6">
      <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 sticky top-24">
        <h3 class="text-lg font-black text-slate-900 mb-6">Your Submission</h3>

        <div
          class={`flex items-center gap-3 p-4 rounded-2xl mb-8 border font-bold text-sm
          ${task.status === "Completed" ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-orange-50 border-orange-100 text-kh-orange"}`}
        >
          <span class="inline-flex">{#if task.status === "Completed"}<CircleCheck size={17} />{:else}<Clock size={17} />{/if}</span>
          Status: {task.status}
        </div>

        {#if task.status === "Completed"}
          <div class="text-center py-6" in:fade>
            <div class="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500"><PartyPopper size={34} /></div>
            <p class="font-black text-slate-900 mb-1">Handed In!</p>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">12 Feb 2026 • 10:00 AM</p>
            <button class="w-full py-3 rounded-2xl border-2 border-slate-100 text-slate-400 text-sm font-bold transition-all hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100"> Unsubmit </button>
          </div>
        {:else}
          <div
            class={`border-2 border-dashed rounded-[2rem] p-8 text-center transition-all duration-300
            ${isDragging ? "border-kh-orange bg-orange-50" : "border-slate-200 bg-slate-50/50"}`}
            ondragover={(e) => {
              e.preventDefault();
              isDragging = true;
            }}
            ondragleave={() => (isDragging = false)}
            ondrop={handleDrop}
          >
            {#if fileUploaded}
              <div class="space-y-4" in:fly={{ y: 10 }}>
                <div class="inline-flex text-slate-500"><FileText size={34} /></div>
                <div class="space-y-1 px-2">
                  <p class="text-xs font-black text-slate-900 truncate max-w-full">{fileUploaded.name}</p>
                  <p class="text-[10px] text-slate-400">{(fileUploaded.size / 1024).toFixed(1)} KB</p>
                </div>
                <button onclick={() => (fileUploaded = null)} class="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"> Remove File </button>
              </div>
            {:else}
              <div class="space-y-4">
                <div class="inline-flex text-slate-300"><CloudUpload size={34} /></div>
                <div class="space-y-1">
                  <p class="text-xs font-bold text-slate-500 leading-tight">Drag & Drop files here</p>
                  <p class="text-[10px] text-slate-400">PDF, ZIP, or Image (Max 10MB)</p>
                </div>
                <label class="inline-block px-5 py-2 rounded-xl bg-white border border-slate-200 text-[10px] font-black text-slate-600 cursor-pointer shadow-sm hover:bg-slate-50 transition-all">
                  Browse File
                  <input type="file" hidden onchange={handleFileSelect} />
                </label>
              </div>
            {/if}
          </div>

          <button
            onclick={submitAssignment}
            disabled={!fileUploaded}
            class="w-full mt-6 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-lg shadow-slate-200 transition-all hover:bg-kh-orange active:scale-95 disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none"
          >
            Turn In Assignment
          </button>
        {/if}
      </div>

      <p class="text-center text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">Assignment ID: {taskId}</p>
    </aside>
  </div>
</div>