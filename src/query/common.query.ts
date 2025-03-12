import { QueryClient } from '@tanstack/react-query';

/**
 * Közös react-query kliens, ami együttműködik a context API-val
 * Beállítható kezdeti cache tartalom s közös kulcsok,
 * pl. mennyi időnként értékeljen újra, hányszor próbálkozzon újra hibák esetén, stb.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // mennyi idő után minősüljön az adat elavultnak
      staleTime: 10000,
      // mennyi időnként értékeljen újra automatikusan
      refetchInterval: 30000,
    },
  },
});
