<script lang="ts">
  import { fade, fly, slide, scale } from "svelte/transition";
  import { goto } from "$app/navigation";
  import toast, { Toaster } from "svelte-french-toast";
  import { Search, Users, Send, CheckCircle2, MessageSquare, ArrowRight, X, FileText, LayoutList, UserPlus, Trash2 } from "@lucide/svelte";

  // --- DATA STATE (Gabungan) ---
  let users = $state([
    { id: 1, name: "Ahmad Dahlan", email: "ahmad@khwarizmi.com", role: "PRO Student", taskCount: 3, progress: 65, status: "Active", joinDate: "12 Jan 2026" },
    { id: 2, name: "Siti Sarah", email: "siti@khwarizmi.com", role: "Free Member", taskCount: 1, progress: 0, status: "Inactive", joinDate: "05 Feb 2026" },
  ]);

  let userTasks = $state([
    { id: 101, userId: 1, title: "Slicing Hero Section", status: "Completed", deadline: "2026-02-20", feedback: "Bagus, tapi perhatikan spacing.", studentNote: "Sudah saya revisi bagian mobile." },
    { id: 102, userId: 1, title: "Responsive Dashboard", status: "In Progress", deadline: "2026-02-25", feedback: "", studentNote: "" },
  ]);

  // --- UI STATE ---
  let searchQuery = $state("");
  let selectedUser = $state<any>(null);
  let isUserDrawerOpen = $state(false);
  let isUserModalOpen = $state(false);
  let showPassword = $state(false);

  // --- FORM STATE (Untuk Tambah User Baru) ---
  let newUser = $state({ name: "", email: "", role: "Free Member", password: "" });

  // --- DERIVED LOGIC ---
  const filteredUsers = $derived(users.filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())));

  const selectedUserTasks = $derived(userTasks.filter((t) => t.userId === selectedUser?.id));

  // --- FUNCTIONS ---

  // 1. Fungsi Tambah User (Dari Teman)
  function addUser() {
    if (newUser.name && newUser.email && newUser.password) {
      const loadingToast = toast.loading("Mendaftarkan siswa baru...");
      setTimeout(() => {
        users = [
          ...users,
          {
            id: Date.now(),
            ...newUser,
            taskCount: 0,
            progress: 0,
            status: "Active",
            joinDate: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
          },
        ];
        newUser = { name: "", email: "", role: "Free Member", password: "" };
        isUserModalOpen = false;
        showPassword = false;
        toast.success("Siswa berhasil ditambahkan!", { id: loadingToast });
      }, 1000);
    } else {
      toast.error("Mohon lengkapi semua data!");
    }
  }

  // 2. Fungsi Hapus User (Dari Teman)
  function deleteUser(u: any, event: Event) {
    event.stopPropagation(); // Agar tidak memicu openQuickPreview
    if (confirm(`Hapus ${u.name} secara permanen?`)) {
      users = users.filter((usr) => usr.id !== u.id);
      toast.success("Pengguna berhasil dihapus");
    }
  }

  // 3. Fungsi Navigasi (Dari Anda)
  function openQuickPreview(user: any) {
    selectedUser = user;
    isUserDrawerOpen = true;
  }

  function goToFullAssignmentPage(userId: number) {
    isUserDrawerOpen = false;
    goto(`/admin/users/${userId}`);
  }
</script>

<Toaster />

<div class="p-8 max-w-7xl mx-auto space-y-8 font-plus antialiased text-slate-700">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div>
      <h1 class="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">User Monitoring</h1>
      <p class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-3 italic">Manajemen siswa dan kontrol progres tugas</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
      <div class="relative flex-1 group">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          bind:value={searchQuery}
          type="text"
          placeholder="Cari nama atau email..."
          class="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-4 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] outline-none transition-all italic shadow-sm"
        />
      </div>

      <button
        onclick={() => (isUserModalOpen = true)}
        class="bg-[#14B8A6] hover:bg-[#0D9488] text-white px-8 py-4 rounded-2xl text-xs font-black shadow-lg shadow-teal-100 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest italic whitespace-nowrap"
      >
        <UserPlus size={18} /> Tambah Siswa
      </button>
    </div>
  </div>

  <div class="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr class="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
            <th class="px-10 py-6 border-b border-slate-100">Siswa Information</th>
            <th class="px-6 py-6 border-b border-slate-100">Membership</th>
            <th class="px-6 py-6 border-b border-slate-100 text-center">Tugas</th>
            <th class="px-6 py-6 border-b border-slate-100 text-center">Progres</th>
            <th class="px-10 py-6 text-right border-b border-slate-100">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          {#each filteredUsers as u (u.id)}
            <tr in:fade class="group hover:bg-[#14B8A6]/5 transition-all cursor-pointer" onclick={() => openQuickPreview(u)}>
              <td class="px-10 py-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black italic uppercase shadow-lg group-hover:bg-[#14B8A6] transition-colors">{u.name.charAt(0)}</div>
                  <div class="flex flex-col min-w-0">
                    <span class="text-sm font-black text-slate-800 truncate italic uppercase">{u.name}</span>
                    <span class="text-[10px] font-bold text-slate-400 truncate">{u.email}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-6">
                <span class="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border {u.role.includes('PRO') ? 'bg-[#F59E0B]/10 text-[#D97706] border-[#F59E0B]/20' : 'bg-slate-100 text-slate-400 border-slate-200'}">
                  {u.role}
                </span>
              </td>
              <td class="px-6 py-6 text-center font-black text-slate-700 italic">{u.taskCount} Item</td>
              <td class="px-6 py-6">
                <div class="flex items-center gap-3 justify-center">
                  <div class="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-[#14B8A6]" style="width: {u.progress}%"></div>
                  </div>
                  <span class="text-[10px] font-black text-[#14B8A6]">{u.progress}%</span>
                </div>
              </td>
              <td class="px-10 py-6 text-right">
                <div class="flex items-center justify-end gap-3">
                  <button onclick={(e) => deleteUser(u, e)} class="p-2.5 text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 size={18} />
                  </button>
                  <button
                    onclick={(e) => {
                      e.stopPropagation();
                      goToFullAssignmentPage(u.id);
                    }}
                    class="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#14B8A6] transition-all shadow-lg active:scale-95 flex items-center gap-2 italic"
                  >
                    Manage <ArrowRight size={14} />
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

{#if isUserModalOpen}
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onclick={() => (isUserModalOpen = false)} transition:fade></div>
    <div class="bg-white w-full max-w-md rounded-[3rem] p-10 relative z-[110] shadow-2xl border border-slate-100" in:fly={{ y: 20 }}>
      <h3 class="text-xl font-black text-slate-900 mb-8 tracking-tight italic uppercase">Tambah Siswa Baru</h3>

      <div class="space-y-5">
        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Nama Lengkap</label>
          <input bind:value={newUser.name} type="text" placeholder="Masukkan nama..." class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-1 text-sm font-bold outline-none focus:border-[#14B8A6] transition-all italic" />
        </div>

        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Email Address</label>
          <input bind:value={newUser.email} type="email" placeholder="email@gmail.com" class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-1 text-sm font-bold outline-none focus:border-[#14B8A6] transition-all italic" />
        </div>

        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Password</label>
          <div class="relative">
            <input
              bind:value={newUser.password}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-1 text-sm outline-none focus:border-[#14B8A6] transition-all"
            />
            <button type="button" onclick={() => (showPassword = !showPassword)} class="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#14B8A6] uppercase italic">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Membership</label>
          <select bind:value={newUser.role} class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-1 text-sm font-bold outline-none focus:border-[#14B8A6] transition-all appearance-none italic">
            <option value="Free Member">Free Member</option>
            <option value="PRO Student">PRO Student</option>
          </select>
        </div>

        <div class="flex gap-4 pt-6 italic">
          <button onclick={() => (isUserModalOpen = false)} class="flex-1 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">BATAL</button>
          <button onclick={addUser} class="flex-2 bg-[#14B8A6] text-white rounded-2xl py-4 text-xs font-black shadow-lg shadow-teal-100 hover:bg-[#0D9488] transition-all active:scale-95 uppercase tracking-[0.2em]">SIMPAN USER</button>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if isUserDrawerOpen}
  <div class="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md" onclick={() => (isUserDrawerOpen = false)} transition:fade></div>
  <aside class="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col overflow-hidden" transition:fly={{ x: 450, duration: 400 }}>
    <div class="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black italic uppercase shadow-lg text-lg">{selectedUser.name.charAt(0)}</div>
        <div>
          <h3 class="font-black text-slate-900 italic leading-none uppercase">{selectedUser.name}</h3>
          <p class="text-[9px] font-black text-[#14B8A6] uppercase mt-1 italic tracking-widest">Quick Preview</p>
        </div>
      </div>
      <button onclick={() => (isUserDrawerOpen = false)} class="text-slate-400 hover:text-slate-600 transition-all cursor-pointer"><X size={20} /></button>
    </div>

    <div class="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
      <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic px-2">Active Tasks Progres</h4>
      {#each selectedUserTasks as task}
        <div class="p-6 rounded-[2rem] border border-slate-100 bg-white shadow-sm space-y-3 group hover:border-[#14B8A6]/20 transition-all">
          <div class="flex justify-between items-center">
            <span class="text-[8px] font-black px-2 py-0.5 rounded bg-orange-50 text-[#D97706] uppercase italic border border-orange-100">{task.status}</span>
            <p class="text-[9px] font-bold text-slate-300 italic">{task.deadline}</p>
          </div>
          <h5 class="font-black text-slate-800 text-sm leading-tight italic uppercase tracking-tighter">{task.title}</h5>
        </div>
      {/each}
      {#if selectedUserTasks.length === 0}
        <div class="text-center py-20 opacity-30">
          <FileText class="mx-auto mb-2" />
          <p class="text-[10px] font-black uppercase italic">Belum ada tugas</p>
        </div>
      {/if}
    </div>

    <div class="p-8 bg-slate-50 border-t border-slate-100">
      <button
        onclick={() => goToFullAssignmentPage(selectedUser.id)}
        class="w-full bg-[#14B8A6] text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-teal-100 hover:bg-[#0D9488] transition-all active:scale-95 italic flex items-center justify-center gap-2"
      >
        Go to Full Control Panel <LayoutList size={18} />
      </button>
    </div>
  </aside>
{/if}

<style>
  :global(body) {
    background-color: #f8fafc;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
  }
</style>
