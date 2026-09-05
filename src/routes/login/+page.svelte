<script lang="ts">
  import { goto } from "$app/navigation";
  import { fade, fly } from "svelte/transition";
  import { AuthService } from "$lib/services/auth-service";
  import { authStore } from "$lib/stores/auth-store.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import { ArrowLeft, ArrowRight, Eye, EyeOff, Hand, ShieldCheck, GraduationCap, Presentation } from "@lucide/svelte";

  const roleIcon = { admin: ShieldCheck, mentor: Presentation, student: GraduationCap } as const;

  // --- SVELTE 5 RUNES (STATE) ---
  let email = $state("");
  let password = $state("");
  let isLoading = $state(false);
  let showPassword = $state(false);
  let loginStep = $state("form"); // value: "form" | "role"

  // Definisikan tipe role yang valid untuk TypeScript
  type ValidRole = "admin" | "mentor" | "user";

  // Array untuk merender pilihan role secara dinamis
  const availableRoles: ("admin" | "mentor" | "student")[] = ["admin", "mentor", "student"];

  /**
   * Menangani proses login utama ke Backend Laravel
   */
  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    isLoading = true;

    try {
      // Panggil AuthService yang sudah terhubung dengan ApiClient
      const response = await AuthService.login({ email, password });
      isLoading = false;

      // Jika user punya lebih dari 1 role, tampilkan pilihan role
      if (response.user.roles.length > 1) {
        loginStep = "role";
      } else {
        // Jika hanya 1 role, langsung arahkan ke dashboard yang sesuai
        autoRedirect(response.user.roles[0]);
      }
    } catch (err: any) {
      isLoading = false;
      toast.error(err.message || "Email atau password salah!");
    }
  }

  /**
   * Logika pengalihan otomatis berdasarkan role
   */
  function autoRedirect(role: string) {
    if (role === "admin") goto("/admin");
    else if (role === "mentor") goto("/mentor");
    else goto("/user");
  }

  /**
   * Navigasi manual saat user memilih role di UI
   */
  function selectRole(role: ValidRole) {
    if (role === "admin") goto("/admin");
    else if (role === "mentor") goto("/mentor");
    else goto("/user");
  }

  /**
   * Membatalkan login dan membersihkan session
   */
  function handleCancel() {
    AuthService.logout();
    loginStep = "form";
    email = "";
    password = "";
  }
</script>

<svelte:head><title>Login | Khwarizmi Academy</title></svelte:head>

<Toaster />

<div class="min-h-screen w-full bg-[#fff7ed] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-orange-100">
  <div class="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-orange-200/20 blur-[80px] sm:blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
  <div class="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-orange-300/20 blur-[80px] sm:blur-[100px] translate-x-1/2 translate-y-1/2"></div>

  <a
    href="/"
    class="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 bg-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-slate-600 shadow-sm border border-slate-100 transition-all hover:-translate-x-1 hover:text-orange-600 z-50"
  >
    <ArrowLeft size={16} /> <span class="hidden sm:inline">Back to Home</span><span class="sm:hidden">Home</span>
  </a>

  <div class="w-full max-w-5xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
    <div class="hidden lg:block space-y-8" in:fade={{ duration: 600 }}>
      <div class="flex items-center gap-3">
        <img src="/logo.jpg" alt="Logo" class="h-12 w-auto rounded-xl shadow-sm" />
        <div class="flex flex-col leading-none">
          <span class="text-xl font-black text-slate-900 tracking-tight">KHWARIZMI</span>
          <span class="text-sm font-bold text-orange-500 uppercase tracking-widest">Academy</span>
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="flex items-center gap-2 text-2xl font-semibold text-slate-500">Assalamualaikum! <Hand size={22} class="text-orange-400" /></h3>
        <h1 class="text-6xl xl:text-7xl font-black leading-[1.05] tracking-tighter text-slate-900">
          Join The <br />Learning <span class="text-orange-500 italic">Revolution.</span>
        </h1>
        <p class="text-lg text-slate-500 leading-relaxed max-w-md">Akses ribuan materi pembelajaran, tugas, dan mentor profesional hanya dalam satu akun terintegrasi.</p>
      </div>
    </div>

    <div class="flex justify-center lg:justify-end w-full" in:fly={{ y: 20, duration: 800 }}>
      <div class="w-full max-w-md bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-orange-900/5 border border-white/50 min-h-[450px] sm:min-h-[500px] flex flex-col justify-center transition-all duration-500">
        {#if loginStep === "form"}
          <div in:fade={{ duration: 300 }}>
            <div class="text-center mb-8 sm:mb-10">
              <div class="lg:hidden flex justify-center mb-4">
                <img src="/logo.jpg" alt="Logo" class="h-10 w-auto rounded-lg shadow-sm" />
              </div>
              <h3 class="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Welcome Back</h3>
              <p class="text-slate-400 text-xs sm:text-sm font-medium">Masukkan akunmu untuk mulai belajar.</p>
            </div>

            <form onsubmit={handleLogin} class="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                bind:value={email}
                class="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-full bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all text-sm sm:text-base font-medium"
                required
              />

              <div class="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  bind:value={password}
                  class="w-full px-5 py-3.5 sm:px-6 sm:py-4 pr-14 sm:pr-16 rounded-full bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all text-sm sm:text-base font-medium"
                  required
                />
                <button type="button" aria-label="Toggle password" onclick={() => (showPassword = !showPassword)} class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors p-1">
                  {#if showPassword}<EyeOff size={20} />{:else}<Eye size={20} />{/if}
                </button>
              </div>

              <div class="text-right px-2">
                <a href="/forgot" class="text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">Lupa Password?</a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                class="w-full bg-orange-500 py-3.5 sm:py-4 rounded-full text-white font-black text-base sm:text-lg shadow-xl shadow-orange-200 hover:bg-orange-600 hover:-translate-y-1 active:scale-95 transition-all disabled:bg-slate-300"
              >
                {isLoading ? "Processing..." : "Login Now"}
              </button>
            </form>

            <div class="relative my-6 sm:my-8 text-center">
              <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-100"></div></div>
              <span class="relative bg-white px-4 text-[9px] sm:text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">OR</span>
            </div>

            <div class="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
              <button class="flex items-center justify-center gap-2 py-2.5 border border-slate-100 rounded-full font-bold text-slate-600 text-xs sm:text-sm hover:bg-slate-50 transition-all">
                <span class="text-red-500 font-black">G</span> Google
              </button>
              <button class="flex items-center justify-center gap-2 py-2.5 border border-slate-100 rounded-full font-bold text-slate-600 text-xs sm:text-sm hover:bg-slate-50 transition-all">
                <span class="text-blue-600 font-black">f</span> Facebook
              </button>
            </div>

            <p class="text-center text-xs sm:text-sm font-medium text-slate-400">
              Don't have an account? <a href="/register" class="text-orange-600 font-bold hover:underline">Sign Up</a>
            </p>
          </div>
        {:else if loginStep === "role"}
          <div in:fly={{ y: 20, duration: 400 }} class="text-center space-y-6 sm:space-y-8">
            <div class="space-y-2">
              <h3 class="text-2xl sm:text-3xl font-black text-slate-900">Select Access</h3>
              <p class="text-slate-400 text-xs sm:text-sm font-medium">Login berhasil! Masuk sebagai apa?</p>
            </div>

            <div class="space-y-3 sm:space-y-4">
              {#each availableRoles as r}
                {#if authStore.hasRole(r)}
                  {@const RoleIcon = roleIcon[r]}
                  <button
                    onclick={() => selectRole(r === "student" ? "user" : (r as ValidRole))}
                    class="w-full group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all text-left"
                  >
                    <div class="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      <RoleIcon size={24} />
                    </div>
                    <div class="flex-1">
                      <h4 class="text-sm sm:text-lg font-bold text-slate-800 capitalize">{r} Area</h4>
                      <p class="text-[10px] sm:text-xs text-slate-400">Access your {r} dashboard</p>
                    </div>
                    <div class="opacity-0 group-hover:opacity-100 transition-all text-orange-500"><ArrowRight size={18} /></div>
                  </button>
                {/if}
              {/each}
            </div>

            <button onclick={handleCancel} class="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-slate-400 hover:text-slate-600"><ArrowLeft size={14} /> Cancel & Logout</button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
