'use client';
// components/PopsicleNavbar.tsx
import Link from 'next/link';

export default function Nav() {
  return (
    <div className="flex justify-center">
      <nav className=" gap-8 justify-center border border-gray-700/30 px-5  shadow-xl/20 font-extralight  rounded-3xl inline-flex p-2 m-2 my-4 ">
        <div>
          <Link href={'/'}>logo</Link>
        </div>

        <div className="flex gap-3">
          <Link href={'/projects'} className="cursor-alias">
            {' '}
            projects{' '}
          </Link>
          <Link href={'/blogs'} className="cursor-alias">
            {' '}
            blogs{' '}
          </Link>
          <Link href={'/connect'} className="cursor-alias">
            {' '}
            connect{' '}
          </Link>
        </div>
      </nav>
    </div>
  );
}
