<script lang="ts">
  import type { ClientChannel, Data } from "@geckos.io/client";
  import { onMount } from "svelte";

  let channel = $state<ClientChannel | null>(null);

  let messages = $state<[Data, number][]>([]);

  let text = $state("");

  let time = $state(0);

  onMount(async () => {
    const { geckos } = await import("@geckos.io/client");

    channel = geckos({
      port: null as unknown as undefined,
      url: "https://udps-restless-sunset-50.fly.dev",
    });

    if (channel) {
      await channel.onConnect((error: Error | null | undefined) => {
        if (error) {
          console.error(error.message);

          return;
        }

        if (channel) {
          channel.on("chat message", (data: Data) => {
            console.log(`You got the message ${data}`);

            messages.push([data, time ? Date.now() - time : 0]);

            time = 0;
          });

          channel.emit(
            "chat message",
            "a short message sent to the server",
          );
        }
      });
    }
  });

  const testRoundTrip = ({ text: messageText }: { text: string }) => {
    time = Date.now();

    if (channel) {
      channel.emit("chat message", messageText);
    }
  };
</script>

<div class="hotel">
  <form onsubmit={() => testRoundTrip({ text })}>
    <input type="search" bind:value={text} />

    <button type="submit">Test</button>
  </form>

  {#each messages as [message, time] (time)}
    <p>{time || "␀"} &mdash; You got the message <i>{message}</i></p>
  {/each}
</div>

<style>
  .hotel {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    padding: 1rem;
  }
</style>
