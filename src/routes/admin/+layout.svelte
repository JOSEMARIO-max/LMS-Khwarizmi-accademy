<script lang="ts">
  import { page } from "$app/state";
  import { fade, fly } from "svelte/transition";
  import SidebarLink from "$lib/components/SidebarLink.svelte";
  import {
    LayoutDashboard,
    Users,
    FolderOpen,
    Video,
    Wallet,
    Settings,
    LogOut,
    Menu,
    X
  } from "@lucide/svelte";

  let { children } = $props();

  let isSidebarOpen = $state(true);
  let isMobile = $state(false);

  const pageTitle = $derived.by(() => {
    const path = page.url.pathname;
    if (path === "/admin") return "Admin Overview";
    if (path.includes("/users")) return "User Management";
    if (path.includes("/content")) return "Content Manager";
    if (path.includes("/sales")) return "Sales Analytics";
    if (path.includes("/settings")) return "System Settings";
    if (path.includes("/zoom")) return "Zoom Management";
    return "Admin Console";
  });

  $effect(() => {
    const checkScreen = () => {
      isMobile = window.innerWidth < 1024;
      isSidebarOpen = !isMobile;
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  });

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }
</script>

<div class="flex h-screen overflow-hidden bg-kh-page antialiased text-kh-ink">
  {#if isMobile && isSidebarOpen}
    <button aria-label="Tutup menu" class="fixed inset-0 z-40 bg-kh-ink/30 backdrop-blur-md" transition:fade={{ duration: 200 }} onclick={toggleSidebar}></button>
  {/if}

  <aside
    class="bg-kh-surface border-r border-kh-border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 flex flex-col
    {isMobile ? 'fixed inset-y-0 left-0 shadow-2xl' : 'relative'}
    {isSidebarOpen ? 'w-72' : 'w-24'}
    {isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}"
  >
    <div class="h-20 flex items-center px-6 shrink-0 overflow-hidden">
      <div class="w-10 h-10 flex items-center justify-center shrink-0">
        <img src="/logo.webp" alt="Logo Khwarizmi" class="w-full h-full object-contain" />
      </div>
      {#if isSidebarOpen}
        <div class="ml-3.5 flex flex-col leading-tight whitespace-nowrap" transition:fade>
          <span class="text-base font-extrabold tracking-tight text-kh-ink">Khwarizmi</span>
          <span class="text-[10px] font-bold text-kh-teal uppercase tracking-[0.25em]">Console</span>
        </div>
      {/if}
    </div>

    <div class="flex-1 overflow-y-auto px-4 py-4 space-y-8 custom-scrollbar">
      <div>
        {#if isSidebarOpen}<p class="px-3 text-[10px] font-bold text-kh-gray/70 uppercase tracking-[0.15em] mb-3">Menu Utama</p>{/if}
        <nav class="space-y-1">
          <SidebarLink href="/admin" icon={LayoutDashboard} label="Dashboard" {isSidebarOpen} active={page.url.pathname === "/admin"} />
          <SidebarLink href="/admin/users" icon={Users} label="Siswa" {isSidebarOpen} active={page.url.pathname.startsWith("/admin/users")} />
          <SidebarLink href="/admin/content" icon={FolderOpen} label="Kursus" {isSidebarOpen} active={page.url.pathname.startsWith("/admin/content")} />
          <SidebarLink href="/admin/zoom" icon={Video} label="Zoom" {isSidebarOpen} active={page.url.pathname.startsWith("/admin/zoom")} />
        </nav>
      </div>

      <div>
        {#if isSidebarOpen}<p class="px-3 text-[10px] font-bold text-kh-gray/70 uppercase tracking-[0.15em] mb-3">Laporan</p>{/if}
        <nav class="space-y-1">
          <SidebarLink href="/admin/sales" icon={Wallet} label="Keuangan" {isSidebarOpen} active={page.url.pathname.startsWith("/admin/sales")} />
          <SidebarLink href="/admin/settings" icon={Settings} label="Setelan" {isSidebarOpen} active={page.url.pathname.startsWith("/admin/settings")} />
        </nav>
      </div>
    </div>

    <div class="p-4 border-t border-kh-border">
      <SidebarLink href="/login" icon={LogOut} label="Logout" {isSidebarOpen} isLogout />
    </div>
  </aside>

  <main class="flex-1 flex flex-col min-w-0">
    <header class="h-20 flex items-center px-6 lg:px-10 sticky top-0 bg-kh-page/80 backdrop-blur-xl z-30 justify-between border-b border-kh-border">
      <div class="flex items-center gap-5">
        <button
          onclick={toggleSidebar}
          aria-label="Toggle menu"
          class="w-11 h-11 rounded-xl bg-kh-surface border border-kh-border flex items-center justify-center text-kh-gray hover:text-kh-teal hover:border-kh-teal/40 transition-all active:scale-90 shadow-sm"
        >
          {#if isSidebarOpen && isMobile}<X size={20} />{:else}<Menu size={20} />{/if}
        </button>

        <div class="flex flex-col leading-none">
          <h1 class="font-extrabold text-kh-ink text-xl tracking-tight">{pageTitle}</h1>
          <div class="flex items-center gap-2 mt-1.5">
            <span class="text-[10px] font-semibold text-kh-gray/70 uppercase tracking-[0.15em]">Workspace</span>
            <span class="text-[10px] text-kh-border-strong">/</span>
            <span class="text-[10px] font-bold text-kh-teal uppercase tracking-[0.15em]">{pageTitle.split(" ")[0]}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4 lg:gap-6">
        <div class="hidden md:flex flex-col text-right leading-none">
          <p class="text-[11px] font-bold text-kh-ink">Luthfi Hakim</p>
          <p class="text-[10px] font-semibold text-kh-teal uppercase mt-1 tracking-wide flex items-center justify-end gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-kh-teal animate-pulse"></span>
            Online
          </p>
        </div>

        <a href="/admin/settings" class="w-11 h-11 rounded-xl bg-kh-ink flex items-center justify-center font-bold text-white shadow-md border-2 border-white hover:border-kh-teal hover:scale-105 transition-all no-underline">
          LH
        </a>
      </div>
    </header>

    <div class="flex-1 overflow-y-auto px-6 lg:px-10 pb-12">
      <div class="max-w-[1400px] mx-auto w-full">
        {#key page.url.pathname}
          <div in:fly={{ y: 20, duration: 400, delay: 100 }} out:fade={{ duration: 100 }} class="mt-6">
            {@render children()}
          </div>
        {/key}
      </div>
    </div>
  </main>
</div>

<style>
  :global(.custom-scrollbar::-webkit-scrollbar) {
    width: 5px;
  }
  :global(.custom-scrollbar::-webkit-scrollbar-thumb) {
    background: var(--kh-border-strong);
    border-radius: 10px;
  }
</style>
