declare module "animejs" {
  // Minimal declaration to satisfy TypeScript without using 'any'
  type AnimeParams = Record<string, unknown>;
  interface AnimeInstance {
    pause: () => void;
    play: () => void;
    restart: () => void;
  }
  function anime(params?: AnimeParams): AnimeInstance;
  export default anime;
}
