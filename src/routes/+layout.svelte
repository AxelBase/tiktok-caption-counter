<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';

  // --- Configuration ---
  // IMPORTANT: Replace with your actual PayPal username
  const paypalUsername = 'AxelLab427';
  const donationAmounts = [1, 3, 5, 10];

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
        // Dispatch a custom event from the node
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
          <button class="bmac-button" on:click={toggleDropdown}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z" />
            </svg>
            Buy me a coffee
          </button>

          {#if isDropdownOpen}
            <div
              class="bmac-dropdown"
              transition:fly={{ y: -10, duration: 250 }}
            >
              {#each donationAmounts as amount}
                <a
                  href="https://paypal.me/{paypalUsername}/{amount}"
                  target="_blank"
                  rel="noopener noreferrer"
                  on:click={closeDropdown}
                >
                  ${amount}
                </a>
              {/each}
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
  <small>&copy; {new Date().getFullYear()} AxelBase — Privacy-first utility</small>
</footer>