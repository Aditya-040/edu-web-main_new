"use client";
import { ChevronsDown, Menu, Phone } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { ToggleTheme } from "./toogle-theme";

const routeList = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
  { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClose = React.useCallback(() => setIsOpen(false), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary backdrop-blur-md bg-card/70 shadow-md transition-all">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3">
        <Link
          href="/"
          className="font-bold text-xl flex items-center space-x-2 hover:scale-105 transition-transform"
        >
          <ChevronsDown className="bg-gradient-to-tr from-primary via-primary/70 to-primary text-white border border-secondary rounded-lg w-9 h-9 p-1" />
          <span className="text-foreground">Sahu Metals</span>
        </Link>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="transition hover:scale-110">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary transition-all"
            >
              <div>
                <SheetHeader className="mb-4 ml-4">
                  <SheetTitle className="flex items-center space-x-2">
                    <Link href="/" className="flex items-center" onClick={handleClose}>
                      <ChevronsDown className="bg-gradient-to-tr from-primary via-primary/70 to-primary text-white border border-secondary rounded-lg w-9 h-9 p-1" />
                      <span className="ml-2 font-semibold text-lg">Sahu Metals</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-3 px-4">
                  {routeList.map(({ href, label }) => (
                    <Button
                      key={href}
                      asChild
                      variant="ghost"
                      className="justify-start text-base transition hover:translate-x-1"
                      onClick={handleClose}
                    >
                      <Link href={href}>{label}</Link>
                    </Button>
                  ))}
                </div>
              </div>

              <SheetFooter className="flex-col items-start p-4">
                <Separator className="mb-2" />
                <ToggleTheme />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex gap-6 items-center">
            {routeList.map(({ href, label }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={href}
                    className="text-base font-medium text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            href="https://wa.me/yourwhatsappnumber"
            target="_blank"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="/wh491wad6-whatsapp-icon-logo-whatsapp-icon-whatsapp-logo-call-logo-instagram-logo-new.png"
              alt="WhatsApp"
              width={70}
              height={40}
              className="rounded-md"
            />
          </Link>
          <a
            href="tel:+1234567890"
            className="transition-transform hover:scale-110"
          >
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
          </a>
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
};
