// src/types/css.d.ts

declare module 'swiper/css' {
  const content: Record<string, string>;
  export default content;
}

declare module 'swiper/css/navigation' {
  const content: Record<string, string>;
  export default content;
}

declare module 'swiper/css/pagination' {
  const content: Record<string, string>;
  export default content;
}

declare module 'swiper/css/autoplay' {
  const content: Record<string, string>;
  export default content;
}

// Para qualquer outro arquivo .css genérico que você possa importar
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
