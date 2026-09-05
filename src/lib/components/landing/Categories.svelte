<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import type { Component } from "svelte";
  import { Laptop, BookOpenText, Landmark, Languages, ArrowUpRight, X } from "@lucide/svelte";

  // --- Types ---
  type ProgramItem = { name: string; items?: string[] };
  type Academy = {
    id: string;
    title: string;
    icon: Component<{ size?: number }>;
    theme: "teal" | "orange";
    shortDesc: string;
    fullDesc: string;
    programs: ProgramItem[];
  };

  // --- Data ---
  const academies: Academy[] = [
    {
      id: "it",
      title: "IT ACADEMY",
      icon: Laptop,
      theme: "orange",
      shortDesc: "Master Tech & Values",
      fullDesc: "Mulai perjalanan teknologimu dari dasar hingga mahir dengan pondasi mindset Islami.",
      programs: [
        { name: "ITMI (Islamic Tech Mindset)" },
        { name: "Computer for Beginner", items: ["Word", "Office", "PPT"] },
        { name: "Skill Set Academy", items: ["Design", "UI/UX", "Video"] },
        { name: "Programming Class", items: ["Web Dev", "Frontend", "Backend"] },
        { name: "Freelance Academy", items: ["Portofolio", "Cuan Skill"] },
      ],
    },
    {
      id: "quran",
      title: "QURAN ACADEMY",
      icon: BookOpenText,
      theme: "teal",
      shortDesc: "Interact with Quran",
      fullDesc: "Perbaiki bacaan, hafalan, hingga pemahaman makna ayat suci Al-Quran.",
      programs: [{ name: "RBQ (Reflek Baca Quran)" }, { name: "RTQ (Reflek Tahsin Quran)" }, { name: "RHQ (Reflek Hafal Quran)" }, { name: "RAQ (Reflek Analisatif Quran)" }],
    },
    {
      id: "character",
      title: "CHARACTER BLDG",
      icon: Landmark,
      theme: "teal",
      shortDesc: "Shape Your Character",
      fullDesc: "Bentuk karakter istimewa dalam diri dengan panduan ayat-ayat pilihan dan hadits.",
      programs: [{ name: "Materi QCB", items: ["3 Alat Belajar", "Sumber Kejahatan", "Akhirat Prioritas", "Takdir"] }, { name: "Mentoring & Kemandirian" }, { name: "Hadits Character Building" }],
    },
    {
      id: "language",
      title: "LANGUAGE ACADEMY",
      icon: Languages,
      theme: "orange",
      shortDesc: "Speak Confidently",
      fullDesc: "Tingkatkan skill komunikasi, public speaking, dan bahasa asing.",
      programs: [{ name: "Komunikasi Islam" }, { name: "Second Language Potential" }, { name: "English Class" }, { name: "Arabic Class" }],
    },
  ];

  // --- Svelte 5 State (Runes) ---
  let selectedAcademy = $state<Academy | null>(null);

  const openModal = (item: Academy) => {
    selectedAcademy = item;
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    selectedAcademy = null;
    if (typeof document !== "undefined") document.body.style.overflow = "auto";
  };

  // Helper untuk mendapatkan class warna berdasarkan theme
  const getThemeClass = (theme: string) => {
    return theme === "teal" ? "from-teal-50 to-teal-100 border-teal-200 text-teal-800" : "from-orange-50 to-orange-100 border-orange-200 text-orange-800";
  };

  const getButtonClass = (theme: string) => {
    return theme === "teal" ? "bg-teal-600 hover:bg-teal-700" : "bg-orange-500 hover:bg-orange-600";
  };
</script>

<section id="categories" class="bg-gray-50 py-20">
  <div class="mx-auto max-w-7xl px-6">
    <div class="mb-12 text-center">
      <span class="rounded-full border border-gray-200 bg-white px-4 py-1 text-[10px] font-bold tracking-widest text-gray-400">KHWARIZMI ACADEMY</span>
      <h2 class="mt-4 text-4xl font-black text-gray-900 lg:text-5xl">
        Program <span class="bg-linear-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent">Unggulan</span>
      </h2>
      <p class="mt-4 text-gray-500">Klik kartu untuk detail kurikulum pembelajaran.</p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {#each academies as item}
        {@const CardIcon = item.icon}
        <button
          onclick={() => openModal(item)}
          class="group relative flex h-60 flex-col justify-between overflow-hidden rounded-3xl border border-black/4 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
        >
          <div class="flex justify-between items-start">
            <div class={`grid h-12 w-12 place-items-center rounded-2xl transition-colors ${item.theme === "teal" ? "bg-teal-50 text-teal-700" : "bg-orange-50 text-orange-700"}`}>
              <CardIcon size={24} />
            </div>
            <span class={`opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 ${item.theme === "teal" ? "text-teal-600" : "text-orange-500"}`}><ArrowUpRight size={22} /></span>
          </div>

          <div>
            <h3 class="text-lg font-extrabold text-gray-900">{item.title}</h3>
            <p class="mt-1 text-sm text-gray-500 leading-relaxed">{item.shortDesc}</p>
          </div>
        </button>
      {/each}
    </div>
  </div>
</section>

{#if selectedAcademy}
  {@const ModalIcon = selectedAcademy.icon}
  <div class="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-md" onclick={closeModal} transition:fade={{ duration: 200 }}>
    <div class="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-4xl bg-slate-50 shadow-2xl" onclick={(e) => e.stopPropagation()} transition:scale={{ duration: 300, start: 0.95, opacity: 0, easing: quintOut }}>
      <div class={`relative flex flex-col gap-4 p-8 bg-linear-to-br border-b ${getThemeClass(selectedAcademy.theme)}`}>
        <div class="flex items-center justify-between">
          <span class="rounded-full bg-white/50 px-3 py-1 text-[10px] font-black tracking-tighter backdrop-blur-sm">PROGRAM DETAIL</span>
          <button onclick={closeModal} aria-label="Tutup" class="grid h-8 w-8 place-items-center rounded-full bg-white/40 transition-all hover:bg-white hover:rotate-90"><X size={16} /></button>
        </div>

        <div class="flex items-center gap-6">
          <div class="grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-sm text-gray-800">
            <ModalIcon size={32} />
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-black leading-none text-gray-900">{selectedAcademy.title}</h3>
            <p class="mt-2 text-sm font-medium opacity-80">{selectedAcademy.fullDesc}</p>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <h4 class="mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Materi Pembelajaran</h4>
        <div class="space-y-3">
          {#each selectedAcademy.programs as prog, i}
            <div class="flex gap-4 rounded-2xl border border-black/3 bg-white p-4 shadow-sm">
              <div class={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-black ${selectedAcademy.theme === "teal" ? "bg-teal-50 text-teal-700" : "bg-orange-50 text-orange-700"}`}>
                {i + 1}
              </div>
              <div>
                <span class="text-sm font-bold text-gray-800">{prog.name}</span>
                {#if prog.items}
                  <div class="mt-2 flex flex-wrap gap-1.5">
                    {#each prog.items as tag}
                      <span class={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${selectedAcademy.theme === "teal" ? "bg-teal-50/50 border-teal-100 text-teal-700" : "bg-orange-50/50 border-orange-100 text-orange-600"}`}>
                        {tag}
                      </span>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="border-t border-gray-200 bg-white p-6">
        <button onclick={closeModal} class={`w-full rounded-2xl py-4 text-center font-bold text-white shadow-lg transition-all active:scale-95 ${getButtonClass(selectedAcademy.theme)}`}> Daftar Sekarang </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
  }
</style>
