<script lang="ts">
  export let charCount: number;
  export let limit: number;

  $: overLimit = charCount > limit;
</script>

<div class="mb-3">
  <p style="font-weight: bold; color: {overLimit ? 'red' : 'green'}">
    {overLimit
      ? `Over the limit by ${charCount - limit} characters`
      : `Within limit (${limit - charCount} characters left)`}
  </p>
</div>
