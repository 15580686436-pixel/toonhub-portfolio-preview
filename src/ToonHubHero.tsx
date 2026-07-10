import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const IMAGES = [
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png",
    bg: "#F4845F",
    panel: "#F79B7F",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png",
    bg: "#6BBF7A",
    panel: "#85CC92",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png",
    bg: "#E882B4",
    panel: "#ED9DC4",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png",
    bg: "#6EB5FF",
    panel: "#8DC4FF",
  },
];

const roles = ["center", "left", "right", "back"] as const;
type Role = (typeof roles)[number];

function getRole(index: number, activeIndex: number): Role {
  if (index === activeIndex) return "center";
  if (index === (activeIndex + 3) % IMAGES.length) return "left";
  if (index === (activeIndex + 1) % IMAGES.length) return "right";
  return "back";
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined" ? false : window.innerWidth < 640,
  );

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return isMobile;
}

export default function ToonHubHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = useIsMobile();
  const activeImage = IMAGES[activeIndex];

  const grainBackground = useMemo(
    () =>
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
    [],
  );

  useEffect(() => {
    IMAGES.forEach((item) => {
      const image = new Image();
      image.src = item.src;
    });
  }, []);

  const navigate = (direction: "next" | "prev") => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((current) =>
      direction === "next" ? (current + 1) % IMAGES.length : (current + IMAGES.length - 1) % IMAGES.length,
    );
    window.setTimeout(() => setIsAnimating(false), 650);
  };

  return (
    <main
      className="relative w-full overflow-hidden text-white"
      style={{
        backgroundColor: activeImage.bg,
        transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ height: "100vh" }}>
        <div
          className="pointer-events-none absolute inset-0 bg-repeat"
          style={{
            zIndex: 50,
            backgroundImage: grainBackground,
            backgroundSize: "200px 200px",
            opacity: 0.4,
          }}
        />

        <div
          className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center"
          style={{ zIndex: 2, top: "18%" }}
        >
          <p
            className="whitespace-nowrap uppercase text-white"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(90px, 28vw, 380px)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            3D SHAPE
          </p>
        </div>

        <a
          href="#/"
          className="absolute left-4 top-6 text-xs font-semibold uppercase text-white/90 sm:left-8"
          style={{ zIndex: 60, letterSpacing: "0.18em" }}
          aria-label="Back to portfolio"
        >
          TOONHUB
        </a>

        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, index) => {
            const role = getRole(index, activeIndex);
            const isCenter = role === "center";
            const sideHeight = isMobile ? "16%" : "28%";
            const roleStyles: Record<Role, React.CSSProperties> = {
              center: {
                left: "50%",
                bottom: isMobile ? "22%" : 0,
                height: isMobile ? "60%" : "92%",
                transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
                filter: "blur(0px)",
                opacity: 1,
                zIndex: 20,
              },
              left: {
                left: isMobile ? "20%" : "30%",
                bottom: isMobile ? "32%" : "12%",
                height: sideHeight,
                transform: "translateX(-50%) scale(1)",
                filter: "blur(2px)",
                opacity: 0.85,
                zIndex: 10,
              },
              right: {
                left: isMobile ? "80%" : "70%",
                bottom: isMobile ? "32%" : "12%",
                height: sideHeight,
                transform: "translateX(-50%) scale(1)",
                filter: "blur(2px)",
                opacity: 0.85,
                zIndex: 10,
              },
              back: {
                left: "50%",
                bottom: isMobile ? "32%" : "12%",
                height: isMobile ? "13%" : "22%",
                transform: "translateX(-50%) scale(1)",
                filter: "blur(4px)",
                opacity: 1,
                zIndex: 5,
              },
            };

            return (
              <div
                key={item.src}
                className="absolute"
                style={{
                  ...roleStyles[role],
                  aspectRatio: "0.6 / 1",
                  background: isCenter
                    ? `radial-gradient(circle at 50% 72%, ${item.panel} 0%, transparent 42%)`
                    : undefined,
                  transition:
                    "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)",
                  willChange: "transform, filter, opacity",
                }}
              >
                <img
                  src={item.src}
                  alt=""
                  draggable={false}
                  className="h-full w-full select-none object-contain"
                  style={{ objectPosition: "bottom center" }}
                />
              </div>
            );
          })}
        </div>

        <div
          className="absolute bottom-6 left-4 max-w-[320px] sm:bottom-20 sm:left-24"
          style={{ zIndex: 60 }}
        >
          <p
            className="mb-2 text-base font-bold uppercase text-white/95 sm:mb-3 sm:text-[22px]"
            style={{ letterSpacing: "0.02em" }}
          >
            TOONHUB FIGURINES
          </p>
          <p className="mb-5 hidden text-sm leading-[1.6] text-white/85 sm:block">
            The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless.
            Many thanks! Wishing you the win. Order now.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous figurine"
              onClick={() => navigate("prev")}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/10 sm:h-16 sm:w-16"
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Next figurine"
              onClick={() => navigate("next")}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/10 sm:h-16 sm:w-16"
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <a
          href="#/toonhub"
          className="absolute bottom-6 right-4 flex items-center uppercase text-white/95 no-underline transition-opacity duration-200 hover:text-white sm:bottom-20 sm:right-10"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(20px, 4vw, 56px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          DISCOVER IT
          <ArrowRight className="ml-2 h-5 w-5 sm:h-8 sm:w-8" strokeWidth={2.25} />
        </a>
      </div>
    </main>
  );
}
