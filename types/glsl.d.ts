// types/glsl.d.ts (or wherever you prefer)
declare module '*.glsl' {
  const content: string;
  export default content;
}

declare module '*.vert' {
  const content: string;
  export default content;
}

declare module '*.frag' {
  const content: string;
  export default content;
}

// If you have other shader extensions
declare module '*.vs' {
  const content: string;
  export default content;
}

declare module '*.fs' {
  const content: string;
  export default content;
}
