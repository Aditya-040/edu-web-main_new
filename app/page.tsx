import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ProductsSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";

export const metadata = {
  title: "Sahu Metals - Agriculture Equipment Agency",
  description: "Sahu Metals: Your trusted partner for agriculture equipment sales, leasing, and maintenance.",
  openGraph: {
    type: "website",
    url: "https://sahumetals.com/",
    title: "Sahu Metals - Agriculture Equipment Agency",
    description: "Sahu Metals: Your trusted partner for agriculture equipment sales, leasing, and maintenance.",
    images: [
      {
        url: "/hero-image-light.jpeg",
        width: 1200,
        height: 630,
        alt: "Sahu Metals - Agriculture Equipment Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://sahumetals.com/",
    title: "Sahu Metals - Agriculture Equipment Agency",
    description: "Sahu Metals: Your trusted partner for agriculture equipment sales, leasing, and maintenance.",
    images: [
      "/hero-image-light.jpeg",
    ],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <ProductsSection />
      <BenefitsSection />
      <FeaturesSection />
     
      <TestimonialSection />
     
   
     
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
