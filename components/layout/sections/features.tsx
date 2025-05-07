import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Tractor",
    title: "Made in India",
    description:
      "Proudly manufactured in India, supporting local innovation and growth.",
  },
  {
    icon: "UserCheck",
    title: "Government Subsidy",
    description:
      "Our products are eligible for government subsidy, so you save more whenever you buy from us.",
  },
  {
    icon: "CreditCard",
    title: "Increased Efficiency",
    description:
      "Our equipment helps you get more done in less time, with less effort.",
  },
  {
    icon: "Settings",
    title: "Genuine Parts",
    description:
      "Only authentic spare parts for long-lasting performance.",
  },
  {
    icon: "Wrench",
    title: "Improved Productivity",
    description:
      "Boost your agricultural output and maximize your harvest with our advanced solutions.",
  },
  {
    icon: "ShieldCheck",
    title: "ISI Marked",
    description:
      "Highest quality, tested and ISI marked for reliability and peace of mind.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Why Choose Sahu Metals?
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        We deliver quality, reliability, and service excellence for all your agricultural equipment needs.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
