import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Josefin_Sans } from "next/font/google";

import Image from "next/image";
import { getServerSession } from "@/utils/getServerSession";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export async function DocsHeader () {
    const session = await getServerSession();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            alt=""
            src={"/logo.svg"}
            height={200}
            width={200}
            className="size-[1.5rem]"
          ></Image>
          <span className={`text-white mt-0.5 ${josefin.className}`}>
            Vyoma
          </span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/naaakul/vyoma"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            GitHub
          </a>

          {session?.user ? (
                        <Link href={"/dashboard/monitor"}>
                          <button className="bg-neutral-200 text-black cursor-pointer px-6 py-2 rounded font-medium hover:bg-neutral-200 transition-colors text-sm md:text-base">
                            DashBoard
                          </button>
                        </Link>
                      ) : (
                        <Link href={"/auth/sign-in"}>
                          <button className="bg-neutral-200 text-black cursor-pointer px-6 py-2 rounded font-medium hover:bg-neutral-200 transition-colors text-sm md:text-base">
                            Log in
                          </button>
                        </Link>
                      )}
        </div>
      </div>
    </header>
  );
}
