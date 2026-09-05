<script lang="ts">
  import { Radio, Infinity as InfinityIcon, Wrench, Sprout } from "@lucide/svelte";

  // Data fitur dipisah agar kode HTML tetap bersih dan mudah dikelola
  const features = [
    {
      title: "Live Class",
      desc: "Ikuti kelas interaktif bersama praktisi dan mentor Khwarizmi Academy dari mana saja.",
      icon: Radio,
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Lifetime Access",
      desc: "Akses rekaman video kelas kapan saja, di mana saja tanpa batas waktu.",
      icon: InfinityIcon,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Practice Based",
      desc: "Pembelajaran berbasis praktik dan project nyata, bukan hanya sekadar teori.",
      icon: Wrench,
      color: "bg-teal-50 text-teal-600",
    },
    {
      title: "Beginner Friendly",
      desc: "Materi kami mulai dari dasar dan dibahas dari awal, cocok untuk pemula sekalipun.",
      icon: Sprout,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];
</script>

<section id="features" class="bg-white py-24">
  <div class="container mx-auto px-6">
    <div class="mx-auto mb-16 max-w-2xl text-center">
      <h2 class="text-3xl font-black tracking-tight text-[#0c2e28] sm:text-4xl lg:text-5xl">
        KENAPA HARUS <span class="bg-gradient-to-r from-[#009b84] to-[#f67d26] bg-clip-text text-transparent">KHWARIZMI ACADEMY?</span>
      </h2>
      <p class="mt-6 text-lg leading-relaxed text-[#5a736f]">Kami merancang metode belajar yang efektif untuk membantu akselerasi karirmu di era digital.</p>
    </div>

    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {#each features as feature}
        {@const Icon = feature.icon}
        <div class="group relative rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-orange-100 hover:shadow-2xl hover:shadow-orange-100/50">
          <div class={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-[10deg] ${feature.color}`}>
            <Icon size={26} strokeWidth={2} />
          </div>

          <h3 class="mb-3 text-xl font-extrabold text-[#0c2e28]">
            {feature.title}
          </h3>
          <p class="text-sm leading-relaxed text-[#5a736f]">
            {feature.desc}
          </p>

          <div class="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-orange-200 opacity-0 transition-all group-hover:scale-150 group-hover:opacity-100"></div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Menjaga konsistensi lebar container */
  .container {
    max-width: 1140px;
  }
</style>
