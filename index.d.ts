declare type TinyENVsOptions = {
  envKey?: string,
  envDefault?: string,
  envFolder?: string,
  envGeneralFileName?: string
};

declare function TinyENVs(options?: TinyENVsOptions): void;

export { TinyENVsOptions, TinyENVs };
