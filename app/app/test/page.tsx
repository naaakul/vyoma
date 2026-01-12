import HeroModel from "@/components/HeroModel";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#1b1b1b]">
        <div className="absolute inset-0 halo-gradient" />

        <svg className="halo-noise" aria-hidden="true">
  <filter id="noiseFilter">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="1.4"
      numOctaves="6"
      stitchTiles="stitch"
      result="noise"
    />
    <feColorMatrix type="saturate" values="0" />
  </filter>

  <rect
    width="100%"
    height="100%"
    filter="url(#noiseFilter)"
    opacity="0.35"
  />
</svg>

      </div>

      <HeroModel />
    </main>
  );
}
