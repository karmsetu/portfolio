// app/components/wrappers/mnemonics.tsx
'use client';
// @ts-expect-error there's no error, it's just that the lib has no type declaration(.d.ts)
import { initMnemonics } from 'mnemjs';
import { ReactNode, useEffect } from 'react';

export function UseMnemonicsWrapper({ children }: { children: ReactNode }) {
  useEffect(() => initMnemonics(), []);
  return children;
}
