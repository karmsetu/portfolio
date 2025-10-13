declare module 'mnemjs';

export type MnemonicConfig = {
  attr?: string;
  activeClass?: string;
  color?: string; // e.g. "#000"
  textColor?: string; // e.g. "#fff"
  animationDuration?: `${number}s`; // e.g. 150 (ms)
};

export declare function initMnemonics(config: MnemonicConfig): void;
