<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import toast, { Toaster } from "svelte-french-toast";
  import { ArrowLeft, ArrowRight, Send, CheckCircle, Clock, MessageSquare, FileText, Download, Plus, Calendar, User, Trash2, UploadCloud, Paperclip, ExternalLink, X, Image as ImageIcon } from "@lucide/svelte";

  // --- TYPES ---
  type Attachment = {
    name: string;
    size: string;
    type?: "image" | "file";
  };

  type Assignment = {
    id: number;
    title: string;
    status: string;
    deadline: string;
    desc: string;
    adminAttachment: Attachment | null;
    userAttachment: Attachment | null;
    studentNote: string;
    feedbackHistory: {
      sender: string;
      text: string;
      date: string;
      attachment?: Attachment | null;
    }[];
  };

  // --- STATE ---
  let studentName = $state("Ahmad Dahlan");
  let studentRole = $state("PRO Student");

  // Form State (Tambah Tugas Baru)
  let isAddingTask = $state(false);
  let newTask = $state({ title: "", deadline: "", desc: "" });
  let adminFile = $state<File | null>(null);

  // Feedback State
  let feedbackInput = $state<Record<number, string>>({});
  let feedbackFile = $state<Record<number, File | null>>({});

  // Data Tugas
  let assignments = $state<Assignment[]>([
    {
      id: 1,
      title: "Slicing Landing Page Khwarizmi",
      status: "Completed",
      deadline: "15 Feb 2026",
      desc: "Lakukan slicing dari Figma ke Svelte 5 dengan Tailwind CSS.",
      adminAttachment: { name: "Landing_Page_Wireframe.pdf", size: "2.4 MB" },
      userAttachment: { name: "Ahmad_Dahlan_Project.zip", size: "15.8 MB" },
      studentNote: "Sudah saya selesaikan, mohon dicek bagian responsifnya.",
      feedbackHistory: [{ sender: "Admin", text: "Tolong perbaiki padding di section hero.", date: "16 Feb", attachment: null }],
    },
    {
      id: 2,
      title: "Integrasi API Laravel 12",
      status: "In Progress",
      deadline: "25 Feb 2026",
      desc: "Hubungkan form pendaftaran ke endpoint API Laravel.",
      adminAttachment: { name: "API_Documentation.docx", size: "540 KB" },
      userAttachment: null,
      studentNote: "",
      feedbackHistory: [],
    },
  ]);

  // --- FUNCTIONS ---
  function handleAdminFile(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) {
      adminFile = target.files[0];
      toast.success(`File brief terpilih`);
    }
  }

  function handleSendTask() {
    if (!newTask.title) return toast.error("Judul tugas wajib diisi!");
    assignments = [
      {
        id: Date.now(),
        ...newTask,
        status: "To Do",
        adminAttachment: adminFile
          ? {
              name: adminFile.name,
              size: (adminFile.size / 1024 / 1024).toFixed(2) + " MB",
            }
          : null,
        userAttachment: null,
        feedbackHistory: [],
        studentNote: "",
      },
      ...assignments,
    ];
    isAddingTask = false;
    newTask = { title: "", deadline: "", desc: "" };
    adminFile = null;
    toast.success("Tugas & Brief berhasil dikirim!");
  }

  function handleFeedbackFile(e: Event, id: number) {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) {
      feedbackFile[id] = target.files[0];
      toast.success(`File feedback siap`);
    }
  }

  function sendFeedback(id: number) {
    if (!feedbackInput[id] && !feedbackFile[id]) return;
    const task = assignments.find((a) => a.id === id);
    if (task) {
      const file = feedbackFile[id];
      task.feedbackHistory = [
        ...task.feedbackHistory,
        {
          sender: "Admin",
          text: feedbackInput[id] || "",
          date: "Today",
          attachment: file
            ? {
                name: file.name,
                size: (file.size / 1024).toFixed(0) + " KB",
                type: file.type.startsWith("image/") ? "image" : "file",
              }
            : null,
        },
      ];
      feedbackInput[id] = "";
      feedbackFile[id] = null;
      toast.success("Feedback terkirim!");
    }
  }
</script>

<Toaster />

<div class="max-w-6xl mx-auto p-8 space-y-10 font-plus antialiased">
  <nav class="flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div class="space-y-2">
      <a href="/admin/users" class="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-[#14B8A6] transition-all italic">
        <ArrowLeft size={14} /> Back to User List
      </a>
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center text-xl font-black italic shadow-xl uppercase">
          {studentName.charAt(0)}
        </div>
        <div>
          <h1 class="text-3xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">{studentName}</h1>
          <p class="text-[10px] font-black text-[#14B8A6] uppercase tracking-[0.2em] mt-2 italic">{studentRole} Control Panel</p>
        </div>
      </div>
    </div>
    <button
      onclick={() => (isAddingTask = !isAddingTask)}
      class="bg-[#14B8A6] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-teal-100 hover:bg-slate-900 transition-all active:scale-95 italic"
    >
      {#if isAddingTask}<span class="inline-flex items-center gap-2"><X size={14} /> Close Form</span>{:else}<span class="inline-flex items-center gap-2"><Plus size={14} /> Give New Assignment</span>{/if}
    </button>
  </nav>

  {#if isAddingTask}
    <div transition:slide class="bg-white border-2 border-[#14B8A6]/20 rounded-[3rem] p-10 shadow-sm space-y-6">
      <h3 class="font-black text-slate-900 uppercase italic tracking-tight">Setup New Assignment</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Task Title</label>
          <input bind:value={newTask.title} type="text" placeholder="e.g. Database Schema Design" class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold outline-none focus:border-[#14B8A6] italic" />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Deadline Date</label>
          <input bind:value={newTask.deadline} type="date" class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-500 outline-none" />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Instructions</label>
          <textarea bind:value={newTask.desc} rows="4" placeholder="Describe the task details..." class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium outline-none italic"></textarea>
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Brief File (Admin Only)</label>
          <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50 hover:bg-slate-50 hover:border-[#14B8A6]/50 transition-all cursor-pointer group">
            <div class="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
              <UploadCloud class="w-8 h-8 mb-2 text-slate-400 group-hover:text-[#14B8A6]" />
              <p class="text-[10px] font-black text-slate-400 group-hover:text-slate-600 uppercase italic">
                {adminFile ? adminFile.name : "Click to upload brief file"}
              </p>
            </div>
            <input type="file" class="hidden" onchange={handleAdminFile} />
          </label>
        </div>
      </div>
      <div class="flex justify-end pt-4">
        <button onclick={handleSendTask} class="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#14B8A6] transition-all italic inline-flex items-center gap-2">Confirm & Send <ArrowRight size={14} /></button>
      </div>
    </div>
  {/if}

  <div class="space-y-8">
    <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.3em] italic px-2">Monitoring History</h2>

    <div class="grid grid-cols-1 gap-8">
      {#each assignments as assignment (assignment.id)}
        <div in:fly={{ y: 20 }} class="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm group hover:border-[#14B8A6]/40 transition-all flex flex-col xl:flex-row gap-10">
          <div class="flex-1 space-y-6">
            <div class="flex items-start justify-between">
              <div class="space-y-1">
                <span class="px-3 py-1 bg-slate-100 text-slate-500 text-[9px] font-black rounded-full uppercase italic border border-slate-200">{assignment.status}</span>
                <h3 class="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mt-3">{assignment.title}</h3>
                <div class="flex items-center gap-4 text-slate-400 mt-2 text-[10px] font-bold uppercase italic"><Calendar size={12} /> Deadline: {assignment.deadline}</div>
              </div>
            </div>

            <p class="text-sm font-medium text-slate-500 leading-relaxed italic">"{assignment.desc}"</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {#if assignment.adminAttachment}
                <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#14B8A6] shadow-sm"><Paperclip size={18} /></div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[8px] font-black text-slate-400 uppercase italic mb-1 leading-none">Brief File</p>
                    <p class="text-[11px] font-black text-slate-700 truncate italic">{assignment.adminAttachment.name}</p>
                  </div>
                  <button class="p-2 text-slate-400 hover:text-[#14B8A6]"><Download size={16} /></button>
                </div>
              {/if}

              {#if assignment.userAttachment}
                <div class="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 flex items-center gap-3">
                  <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#F59E0B] shadow-sm"><FileText size={18} /></div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[8px] font-black text-[#D97706] uppercase italic mb-1 leading-none">Student Result</p>
                    <p class="text-[11px] font-black text-slate-700 truncate italic">{assignment.userAttachment.name}</p>
                  </div>
                  <button class="p-2 text-slate-400 hover:text-[#F59E0B]"><Download size={16} /></button>
                </div>
              {:else}
                <div class="p-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 italic">
                  <p class="text-[10px] font-bold uppercase tracking-tighter">No submission yet</p>
                </div>
              {/if}
            </div>

            {#if assignment.studentNote}
              <div class="p-6 bg-[#14B8A6]/5 rounded-3xl border-l-4 border-[#14B8A6] space-y-2">
                <p class="text-[9px] font-black text-[#0D9488] uppercase italic">Student Notes:</p>
                <p class="text-sm font-bold text-slate-700 italic leading-relaxed">"{assignment.studentNote}"</p>
              </div>
            {/if}
          </div>

          <div class="w-full xl:w-[400px] flex flex-col bg-slate-50 rounded-[2.5rem] p-8 space-y-6">
            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2"><MessageSquare size={14} /> Mentor Feedback</h4>

            <div class="flex-1 space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {#each assignment.feedbackHistory as chat}
                <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                  <p class="text-[10px] font-black text-[#F59E0B] uppercase italic mb-1 leading-none">{chat.sender} • {chat.date}</p>
                  {#if chat.text}<p class="text-xs font-medium text-slate-600 leading-relaxed italic">{chat.text}</p>{/if}
                  {#if chat.attachment}
                    <div class="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100 italic">
                      {#if chat.attachment.type === "image"}<ImageIcon size={14} class="text-[#14B8A6]" />
                      {:else}<FileText size={14} class="text-[#14B8A6]" />{/if}
                      <span class="text-[9px] font-bold text-slate-700 truncate flex-1">{chat.attachment.name}</span>
                      <Download size={12} class="text-slate-400" />
                    </div>
                  {/if}
                </div>
              {/each}
              {#if assignment.feedbackHistory.length === 0}
                <p class="text-center text-[10px] font-bold text-slate-300 uppercase py-14 tracking-widest italic">No feedback yet</p>
              {/if}
            </div>

            <div class="space-y-2">
              {#if feedbackFile[assignment.id]}
                <div transition:slide class="flex items-center gap-2 px-4 py-2 bg-[#14B8A6]/10 rounded-xl border border-[#14B8A6]/20">
                  <Paperclip size={12} class="text-[#14B8A6]" />
                  <span class="text-[9px] font-black text-[#0D9488] truncate flex-1">{feedbackFile[assignment.id]?.name}</span>
                  <button onclick={() => (feedbackFile[assignment.id] = null)} class="text-rose-500 font-bold" aria-label="Hapus"><X size={14} /></button>
                </div>
              {/if}
              <div class="relative flex items-center gap-2">
                <input type="file" id="feed-{assignment.id}" class="hidden" onchange={(e) => handleFeedbackFile(e, assignment.id)} />
                <label for="feed-{assignment.id}" class="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#14B8A6] cursor-pointer shadow-sm"><Paperclip size={16} /></label>
                <input
                  bind:value={feedbackInput[assignment.id]}
                  placeholder="Write feedback..."
                  class="flex-1 bg-white border border-slate-200 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:border-[#F59E0B] italic"
                  onkeydown={(e) => e.key === "Enter"}
                />
                <button onclick={() => sendFeedback(assignment.id)} class="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-[#F59E0B] transition-all shadow-lg"><Send size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-color: #f8fafc;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
  }
</style>
