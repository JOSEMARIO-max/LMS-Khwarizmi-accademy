<script lang="ts">
  import { page } from "$app/state";
  import { fade } from "svelte/transition";
  import SidebarLink from "$lib/components/SidebarLink.svelte";
  import { authStore } from "$lib/stores/auth-store.svelte";
  import {
    LayoutDashboard,
    BookOpen,
    MonitorPlay,
    ClipboardList,
    Users,
    Settings,
    LogOut,
    Bell,
    Menu,
    X
  } from "@lucide/svelte";

  let { children } = $props();

  let isSidebarOpen = $state(true);
  let isMobile = $state(false);

  const isPublicPage = $derived(
    !page.url.pathname.startsWith("/user") ||
      ["/login", "/register"].includes(page.url.pathname)
  );

  const pageTitle = $derived.by(() => {
    const path = page.url.pathname;
    if (path === "/user") return "Overview";
    if (path.startsWith("/user/lesson")) return "Pelajaran Saya";
    if (path.startsWith("/user/courses")) return "Katalog Kursus";
    if (path === "/user/profile") return "Profil Pengguna";
    if (path === "/user/assignments") return "Tugas Akademik";
    if (path === "/user/schedule") return "Jadwal Komunitas";
    return "Dashboard";
  });

  const userName = $derived(authStore.user?.name || "Student");
  const userAvatar = $derived(
    authStore.user?.profile?.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=f67d26&color=fff`
  );
  const isPremiumUser = $derived(authStore.hasRole("premium") || authStore.hasRole("pro"));

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  $effect(() => {
    const checkScreen = () => {
      isMobile = window.innerWidth < 1024;
      if (isMobile) isSidebarOpen = false;
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  });

  $effect(() => {
    if (isMobile && page.url.pathname) isSidebarOpen = false;
  });
</script>

<svelte:head><title>Khwarizmi Academy | {pageTitle}</title></svelte:head>

{#if isPublicPage}
  {@render children()}
{:else}
  <div class="flex h-screen overflow-hidden bg-kh-page antialiased">
    {#if isMobile && isSidebarOpen}
      <button
        aria-label="Tutup menu"
        class="fixed inset-0 z-40 bg-kh-ink/40 backdrop-blur-sm"
        transition:fade={{ duration: 200 }}
        onclick={toggleSidebar}
      ></button>
    {/if}

    <aside
      class="bg-kh-surface border-r border-kh-border transition-all duration-300 z-50 flex flex-col
      {isMobile ? 'fixed inset-y-0 left-0 shadow-2xl' : 'relative'}
      {isSidebarOpen ? 'w-64' : 'w-20'}
      {isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}"
    >
      <div class="flex items-center gap-3 px-5 h-20 shrink-0 overflow-hidden">
        <div class="w-9 h-9 rounded-xl overflow-hidden border border-kh-border shrink-0 bg-white">
          <img src="/logo.jpg" alt="Logo Khwarizmi" class="w-full h-full object-contain" />
        </div>
        {#if isSidebarOpen}
          <div class="flex flex-col whitespace-nowrap leading-tight" transition:fade>
            <span class="font-extrabold text-kh-ink text-sm">KHWARIZMI</span>
            <span class="text-[10px] font-bold text-kh-orange tracking-[0.2em] uppercase">Academy</span>
          </div>
        {/if}
      </div>

      <div class="flex-1 overflow-y-auto px-3.5 py-4 space-y-7 custom-scrollbar">
        <div>
          {#if isSidebarOpen}<small class="px-2 text-[10px] font-bold text-kh-gray/70 tracking-[0.15em] uppercase">Utama</small>{/if}
          <nav class="mt-3 space-y-1">
            <SidebarLink href="/user" icon={LayoutDashboard} label="Overview" {isSidebarOpen} active={page.url.pathname === "/user"} />
            <SidebarLink href="/user/lesson" icon={BookOpen} label="Pelajaran" {isSidebarOpen} active={page.url.pathname.startsWith("/user/lesson")} />
            <SidebarLink href="/user/courses" icon={MonitorPlay} label="Kursus IT" {isSidebarOpen} active={page.url.pathname.startsWith("/user/courses")} />
          </nav>
        </div>

        <div>
          {#if isSidebarOpen}<small class="px-2 text-[10px] font-bold text-kh-gray/70 tracking-[0.15em] uppercase">Akademik</small>{/if}
          <nav class="mt-3 space-y-1">
            <SidebarLink href="/user/assignments" icon={ClipboardList} label="Tugas" {isSidebarOpen} active={page.url.pathname.startsWith("/user/assignments")} />
            <SidebarLink href="/user/schedule" icon={Users} label="Komunitas" {isSidebarOpen} active={page.url.pathname === "/user/schedule"} />
          </nav>
        </div>
      </div>

      <div class="p-3.5 border-t border-kh-border">
        {#if authStore.isAuthenticated && isSidebarOpen}
          <div class="flex items-center gap-3 p-3 bg-kh-surface-2 rounded-2xl mb-3" transition:fade>
            <img src={userAvatar} alt="Avatar" class="w-9 h-9 rounded-xl object-cover" />
            <div class="flex flex-col min-w-0">
              <span class="text-xs font-bold text-kh-ink truncate">{userName}</span>
              <span class="text-[9px] font-bold text-kh-orange uppercase tracking-wide">{isPremiumUser ? "PRO Member" : "Free"}</span>
            </div>
          </div>
        {/if}
        <nav class="space-y-1">
          <SidebarLink href="/user/profile" icon={Settings} label="Pengaturan" {isSidebarOpen} active={page.url.pathname === "/user/profile"} />
          <SidebarLink href="/login" icon={LogOut} label="Keluar" {isSidebarOpen} isLogout />
        </nav>
      </div>
    </aside>

    <main class="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <header class="h-16 flex items-center px-4 lg:px-8 sticky top-0 bg-kh-page/80 backdrop-blur-xl z-30 justify-between border-b border-kh-border">
        <div class="flex items-center gap-4">
          <button
            onclick={toggleSidebar}
            aria-label="Toggle menu"
            class="w-10 h-10 rounded-xl bg-kh-surface border border-kh-border flex items-center justify-center text-kh-gray hover:text-kh-orange hover:border-kh-orange/40 hover:bg-kh-orange-soft transition-all active:scale-90"
          >
            {#if isSidebarOpen && isMobile}<X size={20} />{:else}<Menu size={20} />{/if}
          </button>

          <div class="flex flex-col leading-none">
            <h1 class="font-extrabold text-kh-ink text-lg tracking-tight">{pageTitle}</h1>
            <span class="text-[10px] font-semibold text-kh-gray/70 uppercase tracking-[0.15em] mt-1">Khwarizmi / {pageTitle}</span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button aria-label="Notifikasi" class="relative w-10 h-10 flex items-center justify-center rounded-xl text-kh-gray hover:bg-kh-surface-2 hover:text-kh-ink transition-all">
            <Bell size={20} />
            <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-kh-page rounded-full"></span>
          </button>

          <div class="h-6 w-px bg-kh-border mx-1"></div>

          <a href="/user/profile" class="flex items-center gap-3 p-1 pr-3 rounded-full border border-transparent hover:border-kh-border hover:bg-kh-surface transition-all">
            <img src={userAvatar} class="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover" alt="Avatar" />
            <div class="hidden sm:flex flex-col text-left leading-none">
              <span class="text-xs font-bold text-kh-ink truncate max-w-[100px]">{userName.split(" ")[0]}</span>
              <span class="text-[9px] font-bold text-kh-orange uppercase tracking-wide mt-0.5">{isPremiumUser ? "PRO Student" : "Free"}</span>
            </div>
          </a>
        </div>
      </header>

      <div class="px-4 lg:px-10 pt-8 pb-20">
        {#key page.url.pathname}
          <div in:fade={{ duration: 200, delay: 100 }}>
            {@render children()}
          </div>
        {/key}
      </div>
    </main>
  </div>
{/if}

<style>
  :global(.custom-scrollbar::-webkit-scrollbar) {
    width: 4px;
  }
  :global(.custom-scrollbar::-webkit-scrollbar-thumb) {
    background: var(--kh-border-strong);
    border-radius: 10px;
  }
</style>
