<script lang="ts">
  import type { Component } from "svelte";

  let {
    href,
    icon,
    label,
    isSidebarOpen,
    active = false,
    isLogout = false
  }: {
    href: string;
    icon: Component<{ size?: number; strokeWidth?: number; class?: string }>;
    label: string;
    isSidebarOpen: boolean;
    active?: boolean;
    isLogout?: boolean;
  } = $props();

  const Icon = $derived(icon);
</script>

<a
  {href}
  class="group relative flex items-center gap-3.5 h-11 px-3 rounded-xl font-semibold transition-colors duration-200 whitespace-nowrap
  {active
    ? 'bg-kh-orange-soft text-kh-orange-hover'
    : 'text-kh-gray hover:bg-kh-surface-2 hover:text-kh-ink'}
  {isLogout ? 'mt-1 text-rose-500 hover:bg-rose-50 hover:text-rose-600' : ''}"
  aria-current={active ? "page" : undefined}
>
  {#if active && !isLogout}
    <span class="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-kh-orange"></span>
  {/if}

  <span class="shrink-0 flex justify-center transition-transform duration-200 group-hover:scale-110">
    <Icon size={20} strokeWidth={2} />
  </span>

  {#if isSidebarOpen}
    <span class="text-sm tracking-tight">{label}</span>
  {:else}
    <span
      class="pointer-events-none absolute left-14 z-50 scale-0 origin-left rounded-lg bg-kh-ink px-2.5 py-1.5 text-xs font-semibold text-white shadow-lg transition-transform duration-150 group-hover:scale-100"
    >
      {label}
    </span>
  {/if}
</a>

<style>
  a {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }
</style>
