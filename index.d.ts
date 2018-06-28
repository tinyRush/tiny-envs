declare type TinyENVsOptions = {
  envKey?: string,
  envDefault?: string,
  envFolder?: string,
  envGeneralFileName?: string
};

declare function load(options?: TinyENVsOptions): void;

export { TinyENVsOptions, load };
