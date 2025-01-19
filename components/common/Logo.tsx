import Image from 'next/image';
import { Poppins } from "next/font/google";
import Link from 'next/link';

const font = Poppins({
  subsets: ["latin"],
  weight: ["500", "700"],
})

const Logo = () => {
  return (
    <Link href="/" className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer">
      PageForm
    </Link>
  )
}

export default Logo;