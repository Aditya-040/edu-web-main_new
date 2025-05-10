"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const HeroSection = () => {
  const { theme } = useTheme();
  const images = [
    "/farm-equipment-3247630_1280.jpg",
    "/tractor-5102202_1280.jpg",
    "/harvester-3562476_1280.jpg",
    "/turnip-8266093_1280.jpg",
  ];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handlePrevImage = () => {
    setBgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setBgIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="w-full min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-[-2] transition-all duration-700"
        style={{
          backgroundImage: `url(${images[bgIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[-1] transition-opacity duration-700" />

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevImage}
        className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={handleNextImage}
        className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
        aria-label="Next image"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Content */}
      <div className="relative z-10 grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32 px-4 text-white">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2 drop-shadow-md text-white border-white">
            <span className="mr-2 text-primary">
              <Badge className="bg-green-600 text-white">New</Badge>
            </span>
            <span> Leading Agriculture Equipment Solutions </span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1 className="drop-shadow-lg">
              Welcome to
              <span className="text-transparent px-2 bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text drop-shadow-lg">
                Sahu Metals
              </span>
              <br />Your Trusted Agriculture Equipment Agency
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-gray-250 drop-shadow-md">
            {`Supplying top-quality tractors, planters, harvesters, and more. Reliable sales, leasing, and maintenance for all your farming needs.`}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
              Explore Equipment
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold"
            >
              <Link href="#contact" target="_self">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
