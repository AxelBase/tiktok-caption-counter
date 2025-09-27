<script lang="ts">
  import { fleschReadingEase, highlightComplex } from '../components/readability';

  export let text: string = '';

  $: score = fleschReadingEase(text);
  $: highlighted = highlightComplex(text);
</script>

<div class="mb-3">
  <h5>Readability Feedback</h5>
  <p><strong>Flesch Reading Ease:</strong> {score}</p>
  <p><strong>Analysis:</strong></p>
  <p>{@html highlighted}</p>
</div>
