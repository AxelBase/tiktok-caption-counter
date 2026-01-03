<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';

  const currentYear = new Date().getFullYear();

  // --- Dropdown State Management ---
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  // --- Svelte Action for Click Outside ---
  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };

    document.addEventListener('click', handleClick, true);

    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }
</script>

<nav class="navbar navbar-expand-lg fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="{base}/">AxelBase</a>
    <div class="collapse navbar-collapse justify-content-end">
      <ul class="navbar-nav align-items-center">
        <li class="nav-item"><a class="nav-link" href="{base}/" style="color: #e0e0e0;">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="{base}/#about" style="color: #e0e0e0;">About</a></li>
        <li class="nav-item"><a class="nav-link" href="{base}/#how-to-use" style="color: #e0e0e0;">How to Use</a></li>
        <li class="nav-item"><a class="nav-link" href="{base}/#faq" style="color: #e0e0e0;">FAQ</a></li>

        <li class="nav-item bmac-nav-item ms-lg-3" use:clickOutside on:click_outside={closeDropdown}>
          <button
            class="bmac-button d-flex align-items-center gap-2 px-4 py-2 rounded-pill shadow-sm"
            on:click={toggleDropdown}
            aria-label="Support options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
            </svg>
            <span class="d-none d-sm-inline fw-semibold">Buy me a Coffee</span>
            <span class="d-sm-none fw-semibold">Coffee</span>
          </button>

          {#if isDropdownOpen}
            <div
              class="bmac-dropdown mt-2"
              transition:fly={{ y: -10, duration: 250 }}
            >
              <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
                <span class="amount">$3</span> One Coffee
              </a>
              <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
                <span class="amount">$5</span> Two Coffees
              </a>
              <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
                <span class="amount">$10</span> Three Coffees
              </a>

              <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown} class="custom-amount">
                Custom Amount
              </a>

              <a
                href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
                on:click={closeDropdown}
                class="custom-amount"
              >
                Buy via Crypto (Bitcoin)
              </a>
            </div>
          {/if}
        </li>
      </ul>
    </div>
  </div>
</nav>

<main class="container" style="margin-top: 100px;">
  <slot />
</main>

<footer class="text-center py-4 mt-5">
  <small>© {currentYear} AxelBase — Privacy-first utility</small>
</footer>

<style>
  /* Keep the dark theme styling from File 2 */
  :global(body) {
    background-color: var(--background-color);
    color: var(--primary-text-color);
    font-family: var(--font-family);
  }

  /* --- Buy Me a Coffee Button & Dropdown (adapted from File 1 to dark theme) --- */
  .bmac-nav-item {
    position: relative;
  }

  .bmac-button {
    background: var(--accent-color-1); /* Neon Cyan as primary accent */
    color: var(--background-color);
    border: none;
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .bmac-button:hover {
    background: var(--accent-color-2); /* Shift to Neon Magenta on hover */
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
  }

  .bmac-button svg {
    transition: transform 0.3s ease;
  }

  .bmac-button:hover svg {
    transform: scale(1.1) rotate(-5deg);
  }

  .bmac-dropdown {
    position: absolute;
    top: 120%;
    right: 0;
    width: 240px;
    background: var(--surface-color);
    border-radius: 16px;
    box-shadow: 0 12px 32px rgba(0, 242, 234, 0.2);
    overflow: hidden;
    border: 1px solid var(--border-color);
    z-index: 1000;
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: var(--primary-text-color);
    text-decoration: none;
    font-size: 0.98rem;
    transition: all 0.2s ease;
  }

  .bmac-dropdown a:hover {
    background: var(--accent-color-1);
    color: var(--background-color);
    padding-left: 28px;
  }

  .bmac-dropdown .amount {
    font-weight: 700;
    color: var(--accent-color-1);
    font-size: 1.1rem;
  }

  .bmac-dropdown .custom-amount {
    font-weight: 600;
    color: var(--accent-color-2);
    border-top: 1px solid var(--border-color);
    justify-content: center !important;
  }

  .bmac-dropdown .custom-amount:hover {
    background: var(--accent-color-2);
    color: var(--background-color);
  }
</style>