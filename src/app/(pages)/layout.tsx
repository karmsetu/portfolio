import { ReactNode } from 'react';
import { Header } from './_components/header';

export default async function BlogsLayoutPage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
