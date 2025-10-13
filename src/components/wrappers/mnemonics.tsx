// app/components/wrappers/mnemonics.tsx
'use client';
// @ts-ignore
import { initMnemonics } from 'mnemjs';
import { ReactNode, useEffect } from 'react';

export function UseMnemonicsWrapper({ children }: { children: ReactNode }) {
  useEffect(() => initMnemonics(), []);
  return children;
}
