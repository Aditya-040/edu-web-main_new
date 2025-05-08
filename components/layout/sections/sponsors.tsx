"use client";

import { Icon } from "@/components/ui/icon";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { icons } from "lucide-react";
interface sponsorsProps {
  icon: string;
  name: string;
}

const sponsors: sponsorsProps[] = [
  {
    icon: "Crown",
    name: "Acmebrand",
  },
  {
    icon: "Vegan",
    name: "Acmelogo",
  },
  {
    icon: "Ghost",
    name: "Acmesponsor",
  },
  {
    icon: "Puzzle",
    name: "Acmeipsum",
  },
  {
    icon: "Squirrel",
    name: "Acme",
  },
  {
    icon: "Cookie",
    name: "Accmee",
  },
  {
    icon: "Drama",
    name: "Acmetech",
  },
];

export const SponsorsSection = () => {
  return (
    <section
      id="sponsors"
      className="w-full flex justify-center items-center py-8"
      style={{ backgroundColor: 'var(--background-color)' }}
    >
      <div className="flex flex-row flex-nowrap justify-center items-center gap-8 sm:gap-12 md:gap-16 w-full max-w-5xl overflow-x-auto px-2">
        <img src="/ee0e326d-4353-4b9e-b9aa-402f71880b4f.png" alt="Badge 1" className="h-8 sm:h-16 md:h-20 lg:h-24 object-contain" />
        <img src="/image.png" alt="Badge 2" className="h-8 sm:h-16 md:h-20 lg:h-24 object-contain" />
        <img src="/imagecopy.png" alt="Badge 3" className="h-8 sm:h-16 md:h-20 lg:h-24 object-contain" />
        <img src="/61ee283f-278d-43e8-8c23-8e0cdbbc61d6.png" alt="Badge 4" className="h-8 sm:h-16 md:h-20 lg:h-24 object-contain" />
      </div>
    </section>
  );
};
