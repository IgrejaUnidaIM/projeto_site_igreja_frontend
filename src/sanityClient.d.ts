// src/sanityClient.d.ts
declare module '../sanityClient' {
  import { SanityClient } from '@sanity/client'; // Se você estiver usando @sanity/client, importe o tipo correto

  const client: SanityClient; // Substitua 'SanityClient' pelo tipo real do seu cliente Sanity
  export default client;
}
