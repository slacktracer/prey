import type { ClientChannel } from "@geckos.io/client";

export const makeChannel: () => Promise<ClientChannel> = async () => {
  const { geckos } = await import("@geckos.io/client");

  const channel = geckos({
    port: null as unknown as undefined,
    url: "https://udps-restless-sunset-50.fly.dev",
  });

  await channel.onConnect((error: Error | null | undefined) => {
    if (error) {
      console.error(error.message);

      throw new Error(error.message);
    }

    console.info("Connected");
  });

  return channel;
};
