import HeroModel from "@/components/ui/HeroModel";
import { Josefin_Sans } from "next/font/google";
import { GrainGradient } from "@paper-design/shaders-react";
import { auth } from "@/utils/auth-helpers";
import { headers } from "next/headers";
import Link from "next/link";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const session = await auth.api.getSession({
  headers: await headers(),
});

export default function Page() {
  return (
    <main
      className={`min-h-screen flex ${josefin.className} items-center justify-center relative w-full bg-neutra-200`}
    >
      <div className="h-screen flex items-center justify-center relative w-full overflow-hidden">
        <div className="relative h-full pt-4 z-10 flex flex-col px-6 md:px-12 max-w-7xl mx-auto justify-between">
          <header className="flex justify-between items-center">
            <Link href={"/"}>
              <div className="text-xl cursor-pointer tracking-wide text-neutral-200">
                Vyoma
              </div>
            </Link>
            {session?.user ? (
              <Link href={"/dashboard"}>
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
          </header>

          <div className="flex pt-14">
            <main className="flex-grow flex flex-col justify-center max-w-3xl">
              <h1 className="text-xl md:text-2xl lg:text-[2.5rem] leading-tight font-normal mb-6 text-neutral-100">
                Run AI-generated code. Safely. <br /> Instantly. At scale.
              </h1>
              <p className="text-lg md:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed mb-16">
                Vyoma is a secure execution layer for AI apps. Spin up
                sandboxes, run untrusted code, meter usage, and bill by the
                millisecond – without blowing up your backend.
              </p>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-20">
                <div className="relative group">
                  <div className="absolute inset-0 border border-dashed border-neutral-400 rounded-md bg-black backdrop-blur-xs"></div>
                  <div className="relative px-6 py-3 font-mono text-sm md:text-base text-neutral-200 flex items-center gap-2">
                    <span>npm i vyoma</span>
                    {/* <div className="w-2 h-4 bg-neutral-400 animate-pulse inline-block ml-1"></div> */}
                  </div>
                </div>

                <div className="flex gap-4 mt-4 md:mt-0">
                  <Link href={"/docs"}>
                    <button className="bg-neutral-200 text-black backdrop-blur-xs cursor-pointer text-neutra-200 px-6 py-3 rounded-md text-sm md:text-base transition-all">
                      Read the Docs
                    </button>
                  </Link>
                  <Link href={"/dashboard/keys"}>
                    <button className="bg-neutral-200 text-black backdrop-blur-xs cursor-pointer text-neutra-200 px-6 py-3 rounded-md text-sm md:text-base transition-all">
                      get API key
                    </button>
                  </Link>
                </div>
              </div>
            </main>
            <HeroModel />
          </div>

          <footer className=" w-full pt-6 pb-4">
            <div className="mb-4 text-neutral-300 text-lg font-light">
              <p>LLMs can write code.</p>
              <p>Running that code is where things get sketchy.</p>
            </div>

            <div className="grid grid-cols-1 pt-4 w-full border-t border-neutral-600/50 md:grid-cols-4 gap-8 text-neutral-200 text-sm md:text-base font-light">
              <div>Clean REST APIs</div>
              <div>Simple SDKs</div>
              <div>Predictable errors</div>
              <div>Zero magicDocs that don't gaslight you</div>
            </div>
          </footer>
        </div>
        <div className="absolute h-full w-full">
          <GrainGradient
            className="h-full w-full"
            colors={["#ffffff", "#000829"]}
            colorBack="#000a0f"
            softness={1}
            intensity={1}
            noise={1}
            shape="wave"
            speed={1.74}
            scale={2.52}
            offsetX={0.68}
          />
        </div>
      </div>
    </main>
  );
}
