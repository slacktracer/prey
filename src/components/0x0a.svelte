<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { boot } from "../modules/0x0a/boot.js";

  let container: HTMLDivElement;

  const queryParams = $derived(page.url.searchParams);

  onMount(() => {
    const isOther = Boolean(Number(queryParams.get("other")));

    boot({ container, isOther });
  });
</script>

<div bind:this={container}></div>

<style>
  div {
    background: #030303;
  }
</style>
