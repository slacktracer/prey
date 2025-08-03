<script lang="ts">
  import { onMount } from "svelte";

  import { boot } from "../modules/0x02/boot.js";

  let container: HTMLDivElement;

  onMount(() => {
    boot({ container });
  });
</script>

<div bind:this={container}></div>
