import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What types of agriculture equipment do you offer?",
    answer: "We offer a wide range of equipment including tractors, planters, harvesters, and more from top brands.",
    value: "item-1",
  },
  {
    question: "Do you provide equipment leasing options?",
    answer: "Yes, we offer flexible leasing plans to suit your operational and financial needs.",
    value: "item-2",
  },
  {
    question: "How can I get my equipment serviced?",
    answer: "You can schedule a service appointment by contacting us through our website or phone. We offer on-site and in-house servicing.",
    value: "item-3",
  },
  {
    question: "Are spare parts available for all brands?",
    answer: "We stock genuine spare parts for all major agriculture equipment brands.",
    value: "item-4",
  },
  {
    question: "How do I get support or consultation?",
    answer: "Our expert team is available for consultation and support. Reach out via our contact form or call us directly.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Frequently Asked Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
