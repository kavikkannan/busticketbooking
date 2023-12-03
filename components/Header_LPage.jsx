"use client";
import Link from 'next/link';


export default function Header() {

  return (
    <div className="bg-green-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-black sr-only">Your Company</span>
            <img className=" h-8 w-auto"
                src=""
                alt="your company"
            />
          </Link>
        </div>
        <div className='text-black font-bold'>
          GREEN WHEELS (name reg)
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="signin" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
        <Link href="signin" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      
    </div>
  );
}
