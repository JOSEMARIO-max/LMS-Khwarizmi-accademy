<script lang="ts">
  import "./navbar.css";
  import { Menu, X } from "@lucide/svelte";

  // State untuk menu mobile
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="navbar">
  <div class="container nav-wrapper">
    
    <a href="/" class="brand">
      <div class="logo-sq">
        <img src="/logo.jpg" alt="Khwarizmi Academy Logo" />
      </div>
      <div class="brand-text">
        <span class="text-primary">Khwarizmi</span>
        <span class="text-secondary">Academy</span>
      </div>
    </a>

    <div class="nav-links">
      <a href="#mentors">Mentor</a>
      <a href="#categories">Kategori</a>
      <a href="#features">Fitur</a>
      <a href="#pricing">Harga</a>
    </div>

    <div class="nav-actions">
      <button class="hamburger" on:click={toggleMenu} aria-label="Toggle Menu">
        {#if isMenuOpen}<X size={22} />{:else}<Menu size={22} />{/if}
      </button>

      <div class="desktop-auth">
        <a href="/login" class="btn-login">Masuk</a>
        <a href="/login" class="btn-register">Daftar Gratis</a>
      </div>
    </div>
  </div>

  {#if isMenuOpen}
    <div class="mobile-menu">
      <a href="#categories" on:click={toggleMenu}>Kategori</a>
      <a href="#features" on:click={toggleMenu}>Fitur</a>
      <a href="#mentors" on:click={toggleMenu}>Mentor</a>
      <hr class="divider"/>
      <div class="mobile-auth">
        <a href="/login" class="btn-login-mobile">Masuk</a>
        <a href="/login" class="btn-register-mobile">Daftar Sekarang</a>
      </div>
    </div>
  {/if}
</nav>