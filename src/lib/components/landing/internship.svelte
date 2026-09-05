<script>
  import { fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { ArrowRight } from "@lucide/svelte";
</script>

<section class="internship-section">
  <div class="container">
    
    <div class="premium-card" in:fly={{ y: 60, duration: 1200, easing: cubicOut }}>
      
      <div class="card-glow"></div>

      <div class="card-grid">
        <div class="text-column">
          <div class="pill" in:fade={{ delay: 300 }}>KARIR & PENGEMBANGAN</div>
          <h2 in:fly={{ y: 20, delay: 400 }}>
            Siap Menjadi Bagian dari <span class="highlight">PT.Khwarizmi?</span>
          </h2>
          <p class="desc" in:fly={{ y: 20, delay: 500 }}>
            Program magang terpadu yang menggabungkan Multimedia Kreatif dan Rekayasa Perangkat Lunak. Siapkan portofolio nyata sebelum lulus.
          </p>

          <div class="action-wrap" in:fly={{ y: 20, delay: 600 }}>
            <a href="https://internship.khwarizmi.co.id/" target="_blank" rel="noreferrer" class="btn-explore inline-flex items-center gap-2">
              Lihat Program Internship <ArrowRight size={18} />
            </a>
            <span class="info-text">Pendaftaran dibuka sepanjang tahun</span>
          </div>
        </div>

        <div class="image-column" in:fade={{ delay: 500, duration: 1000 }}>
          <div class="image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
              alt="Tim Khwarizmi" 
              class="card-photo"
            />
            <div class="photo-accent"></div>
          </div>
        </div>
      </div>

    </div>

  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  /* --- SECTION BACKGROUND (Sesuai Request: #1e293b) --- */
  .internship-section {
    padding: 100px 20px;
    background-color: #1e293b; /* Warna background utama */
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .container {
    width: 100%;
    max-width: 1100px;
    position: relative;
    z-index: 10;
  }

  /* --- PREMIUM CARD STYLE --- */
  .premium-card {
    position: relative;
    /* Background kartu dibuat agak transparan dan gelap agar menyatu tapi tetap menonjol */
    background: rgba(15, 23, 42, 0.6); 
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 32px;
    padding: 50px;
    overflow: hidden;
    backdrop-filter: blur(12px);
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.5);
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .premium-card:hover {
    transform: translateY(-8px);
    border-color: rgba(249, 115, 22, 0.2); /* Pinggiran orange halus saat hover */
  }

  /* Glow subtle di belakang kartu */
  .card-glow {
    position: absolute;
    top: -20%; right: -20%;
    width: 60%; height: 60%;
    background: radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%);
    filter: blur(80px);
    z-index: -1;
    opacity: 0.7;
  }

  /* --- LAYOUT GRID (Kiri Teks, Kanan Foto) --- */
  .card-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr; /* Kolom teks sedikit lebih lebar */
    gap: 50px;
    align-items: center;
  }

  /* --- KOLOM KIRI: TEXT --- */
  .text-column { color: white; }

  .pill {
    background: rgba(255,255,255,0.1); color: #cbd5e1;
    font-size: 0.75rem; font-weight: 800;
    padding: 8px 18px; border-radius: 50px;
    display: inline-block; margin-bottom: 25px;
    letter-spacing: 1px; border: 1px solid rgba(255,255,255,0.05);
  }

  h2 {
    font-size: 2.8rem; margin: 0 0 25px 0;
    line-height: 1.1; font-weight: 800; letter-spacing: -0.5px;
  }
  
  .highlight {
    background: linear-gradient(to right, #f97316, #fdba74);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }

  .desc {
    font-size: 1.1rem; color: #94a3b8;
    line-height: 1.7; margin-bottom: 40px;
  }

  /* Action Area */
  .action-wrap {
    display: flex; flex-direction: column; gap: 15px; align-items: flex-start;
  }

  .btn-explore {
    display: inline-flex; align-items: center;
    background: #f97316; color: white;
    font-weight: 700; padding: 16px 36px;
    border-radius: 16px; text-decoration: none;
    transition: 0.3s;
    box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.4);
  }
  .btn-explore:hover {
    background: #ea580c; transform: translateY(-3px);
    box-shadow: 0 20px 35px -10px rgba(249, 115, 22, 0.6);
  }

  .info-text {
    font-size: 0.85rem; color: #64748b; font-weight: 500;
    display: flex; align-items: center;
  }
  .info-text::before {
    content: '•'; color: #f97316; margin-right: 8px; font-size: 1.5rem; line-height: 0;
  }

  /* --- KOLOM KANAN: PHOTO --- */
  .image-column {
    position: relative;
    height: 100%;
    min-height: 350px;
  }

  .image-wrapper {
    position: relative;
    width: 100%; height: 100%;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }

  .card-photo {
    width: 100%; height: 100%;
    object-fit: cover;
    transform: scale(1.05); /* Sedikit di-zoom biar keren */
    transition: transform 0.5s ease;
  }
  /* Efek zoom halus saat card di-hover */
  .premium-card:hover .card-photo {
    transform: scale(1.1);
  }

  /* Aksen kotak orange di pojok foto */
  .photo-accent {
    position: absolute;
    bottom: -20px; right: -20px;
    width: 100px; height: 100px;
    background: linear-gradient(135deg, #f97316, #fb923c);
    border-radius: 20px;
    z-index: -1; /* Di belakang foto */
    opacity: 0.8;
    filter: blur(20px);
  }

  /* --- RESPONSIVE --- */
  @media (max-width: 960px) {
    .card-grid {
      grid-template-columns: 1fr; /* Stack jadi 1 kolom */
      gap: 40px;
    }
    .image-column {
      min-height: 300px; /* Tinggi foto di mobile */
      order: -1; /* Foto ditaruh di atas teks pada mobile (opsional) */
    }
    h2 { font-size: 2.2rem; }
    .premium-card { padding: 35px; }
  }
</style>