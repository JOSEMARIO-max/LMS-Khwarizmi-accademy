<script lang="ts">
  import { goto } from "$app/navigation";
  import { fade, fly } from "svelte/transition";
  import { ArrowLeft, Sparkles } from "@lucide/svelte";

  let name = $state("");
  let email = $state("");
  let password = $state("");
  let isLoading = $state(false);

  function handleRegister(e: SubmitEvent) {
    e.preventDefault();
    isLoading = true;
    setTimeout(() => {
      isLoading = false;
      goto("/user");
    }, 1500);
  }
</script>

<svelte:head><title>Create Account | Khwarizmi Academy</title></svelte:head>

<div class="min-h-screen w-full bg-[#fff7ed] flex items-center justify-center p-6 relative overflow-hidden font-sans">
  <div class="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
  <div class="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/10 blur-[100px] -translate-x-1/2 translate-y-1/2"></div>

  <a href="/" class="absolute top-8 left-8 flex items-center gap-2 bg-white px-5 py-2.5 rounded-full text-sm font-bold text-slate-600 shadow-sm border border-slate-100 transition-all hover:-translate-x-1 hover:text-orange-600 z-50">
    <ArrowLeft size={16} /> Back to Home
  </a>

  <div class="w-full max-w-5xl grid lg:grid-cols-2 gap-16 items-center relative z-10">
    <div class="hidden lg:block space-y-8" in:fade>
      <div class="flex items-center gap-3">
        <img src="/logo.jpg" alt="Logo" class="h-12 w-auto rounded-xl shadow-sm" />
        <div class="flex flex-col leading-none text-slate-900">
          <span class="text-xl font-black tracking-tight">KHWARIZMI</span>
          <span class="text-sm font-bold text-orange-500 uppercase tracking-widest">Academy</span>
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="flex items-center gap-2 text-2xl font-semibold text-slate-500">Welcome to the family! <Sparkles size={22} class="text-orange-400" /></h3>
        <h1 class="text-7xl font-black leading-[1.05] tracking-tighter text-slate-900">
          Start Your <br />Bright <span class="text-orange-500 italic">Future</span> Now.
        </h1>
        <p class="text-lg text-slate-500 leading-relaxed max-w-md">Dapatkan akses penuh ke kurikulum industri, komunitas belajar, dan sertifikat resmi Khwarizmi Academy.</p>
      </div>
    </div>

    <div class="flex justify-center lg:justify-end" in:fly={{ y: 20, duration: 800 }}>
      <div class="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-orange-900/5 border border-white/50">
        <div class="text-center mb-10">
          <h3 class="text-3xl font-black text-slate-900 mb-2">Create Account</h3>
          <p class="text-slate-400 text-sm font-medium">Daftar sekarang untuk memulai perjalananmu.</p>
        </div>

        <form onsubmit={handleRegister} class="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            bind:value={name}
            class="w-full px-6 py-4 rounded-full bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            bind:value={email}
            class="w-full px-6 py-4 rounded-full bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            bind:value={password}
            class="w-full px-6 py-4 rounded-full bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
            required
          />

          <p class="text-[11px] text-slate-400 px-2 leading-relaxed">
            By signing up, you agree to our <span class="text-slate-900 font-bold">Terms of Service</span> and <span class="text-slate-900 font-bold">Privacy Policy</span>.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            class="w-full bg-slate-900 py-4 rounded-full text-white font-black text-lg shadow-xl shadow-slate-200 hover:bg-orange-500 hover:-translate-y-1 active:scale-95 transition-all disabled:bg-slate-300 disabled:shadow-none mt-4"
          >
            {isLoading ? "Creating Account..." : "Get Started"}
          </button>
        </form>

        <div class="relative my-8 text-center">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-100"></div></div>
          <span class="relative bg-white px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">OR</span>
        </div>

        <button class="w-full flex items-center justify-center gap-3 py-3 border border-slate-100 rounded-full font-bold text-slate-600 text-sm hover:bg-slate-50 transition-all mb-8">
          <span class="text-red-500 font-black">G</span> Continue with Google
        </button>

        <p class="text-center text-sm font-medium text-slate-400">
          Already have an account? <a href="/login" class="text-orange-600 font-bold hover:underline">Log In</a>
        </p>
      </div>
    </div>
  </div>
</div>
