<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let value: string = '';
  const dispatch = createEventDispatcher();

  function onInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    dispatch('inputChange', target.value);
  }
</script>

<div class="mb-3">
  <label for="caption" class="form-label">Enter your caption</label>
  <textarea
    id="caption"
    class="form-control"
    rows="6"
    bind:value
    maxlength="2500"
    on:input={onInput}
  ></textarea>
</div>
