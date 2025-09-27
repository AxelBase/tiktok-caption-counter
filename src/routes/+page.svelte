<script lang="ts">
  import '../app.css';
  import { fly, fade } from 'svelte/transition';
  import CaptionInput from '$components/CaptionInput.svelte';
  import CountDisplay from '$components/CountDisplay.svelte';
  import LimitIndicator from '$components/LimitIndicator.svelte';
  import Readability from '$components/Readability.svelte';
  import { count } from '$utils/counter';

  let caption: string = '';
  let charCount = 0;
  let wordCount = 0;

  function handleInput(value: string) {
    caption = value;
    const { characters, words } = count(caption);
    charCount = characters;
    wordCount = words;
  }
</script>

<div class="content-wrapper">
  <h1 class="mb-5 text-center display-4 animated-gradient-text">
    TikTok Caption Counter
  </h1>

  <section id="tool" class="mb-5" in:fly={{ y: 20, duration: 500 }}>
    <h2 class="mb-4">Enter Your Caption</h2>
    <CaptionInput bind:value={caption} on:inputChange={(e) => handleInput(e.detail)} />

    <div class="mt-4 d-flex justify-content-between align-items-center">
      <CountDisplay {charCount} {wordCount} />
      <LimitIndicator {charCount} limit={2200} />
    </div>

    {#if caption.length > 0}
      <div class="mt-4" in:fade={{ duration: 400 }}>
        <Readability text={caption} />
      </div>
    {/if}
  </section>

  <section id="how-to-use" class="mb-5" in:fly={{ y: 20, duration: 500, delay: 100 }}>
    <h2>How to Use</h2>
    <p>
      Paste or type your caption in the input field. The counter shows <strong>characters</strong>
      and <strong>words</strong> in real time. A <span class="text-success">glowing green</span>
      indicator means you are within TikTok’s <strong>2,200 character limit</strong>;
      a <span class="text-danger">pulsing red</span> means you have exceeded it.
    </p>
    <p>
      The tool also calculates a <em>Flesch Reading Ease</em> score. Higher scores mean easier
      reading. Long sentences and difficult words are highlighted for clarity.
    </p>
  </section>

  <section id="about" class="mb-5" in:fly={{ y: 20, duration: 500, delay: 200 }}>
    <h2>About</h2>
    <p>
      The <strong>TikTok Caption Counter</strong> is a <em>free</em>, <em>ad-free</em>, and
      <em>privacy-first</em> tool. It helps creators ensure captions fit TikTok’s limit and are
      easy to read.
    </p>
    <p>
      No cookies, no trackers, no logging, no AI. Everything runs in your browser, keeping your
      captions secure and private.
    </p>
  </section>

  <section id="faq" class="mb-5" in:fly={{ y: 20, duration: 500, delay: 300 }}>
    <h2>FAQ</h2>
    <ol>
      <li><strong>Is this affiliated with TikTok?</strong> No, it is independent.</li>
      <li><strong>Does it work offline?</strong> Yes, after the first load.</li>
      <li><strong>What’s the limit?</strong> TikTok captions = 2,200 chars (input allows 2,500).</li>
      <li><strong>Are my captions stored?</strong> No, processed only in-browser.</li>
      <li><strong>Is it free?</strong> Yes, always.</li>
      <li><strong>Does it use AI?</strong> No, just straightforward text logic.</li>
      <li><strong>Mobile friendly?</strong> Yes, responsive layout.</li>
      <li><strong>Any ads?</strong> None.</li>
      <li><strong>Future updates?</strong> Possibly hashtag or emoji counting.</li>
      <li><strong>Do I need to sign up?</strong> No account required.</li>
    </ol>
  </section>

  <section id="privacy" class="mb-5" in:fly={{ y: 20, duration: 500, delay: 400 }}>
    <h2>Privacy Policy</h2>
    <p>
      We do not collect, store, or transmit any data. No cookies, no trackers, no analytics, no
      third-party integrations. Everything runs client-side in your browser.
    </p>
  </section>

  <section id="terms" class="mb-5" in:fly={{ y: 20, duration: 500, delay: 500 }}>
    <h2>Terms &amp; Conditions</h2>
    <p>By using the TikTok Caption Counter, you agree:</p>
    <ul>
      <li>It is provided free “as is” without warranties.</li>
      <li>Not affiliated with TikTok.</li>
      <li>You are responsible for your captions.</li>
      <li>We are not liable for issues or damages.</li>
      <li>Features may change without notice.</li>
      <li>Use of the tool = acceptance of these terms.</li>
    </ul>
  </section>
</div>