/** @jsxImportSource preact */
import { ContentContainer } from "../components/Layout.tsx";
import Badge from "../components/ui/Badge.tsx";
import Icon from "../components/ui/Icon.tsx";

interface FAQItem {
  /**
   * @title Question
   */
  question: string;

  /**
   * @title Answer
   */
  answer: string;
}

export interface FAQSectionProps {
  /**
   * @title Badge Text
   * @description Text displayed in the badge above the title
   * @default "FAQ"
   */
  badgeText?: string;

  /**
   * @title Section Title
   * @description Main title of the section
   * @default "Estamos aqui para esclarecer todas as suas dúvidas."
   */
  title?: string;

  /**
   * @title Contact Text
   * @description Text displayed below the title
   * @default "Se não encontrar o que procura, entre em contato conosco."
   */
  contactText?: string;

  /**
   * @title Contact Link Text
   * @description Text for the contact link
   * @default "entre em contato conosco"
   */
  contactLinkText?: string;

  /**
   * @title Contact URL
   * @description URL for the contact link
   * @default "/contato"
   */
  contactUrl?: string;

  /**
   * @title FAQ Items
   * @description List of FAQ questions and answers
   */
  items?: FAQItem[];

  /**
   * @title Additional CSS classes 
   */
  class?: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question:
      "What makes your AI app development different from other solutions?",
    answer:
      "Our approach combines deep AI expertise with rapid prototyping and seamless integration, ensuring solutions that are not just technically advanced but also perfectly aligned with your business needs.",
  },
  {
    question: "Do I need technical expertise to use your solutions?",
    answer:
      "No. While our solutions are technically sophisticated, we handle all the complex development work. Our collaborative approach ensures that your team can easily integrate and use the final product without requiring deep technical knowledge.",
  },
  {
    question: "What does the development process look like?",
    answer:
      "Our development process follows a clear, iterative approach: discovery and requirements gathering, rapid prototyping, testing and refinement, and finally deployment and integration. We keep you involved at every step.",
  },
  {
    question: "How long does it typically take to implement a solution?",
    answer:
      "Implementation timelines vary based on project complexity, but we typically deliver initial prototypes within weeks, not months. Our agile approach means you see results quickly.",
  },
  {
    question: "What kind of support do you provide after implementation?",
    answer:
      "We provide comprehensive post-implementation support including monitoring, maintenance, updates, and training for your team. Our support ensures your solution continues to perform optimally.",
  },
  {
    question: "How can I book a demo?",
    answer:
      "You can easily schedule a demo through our website or by contacting our team directly. We'll show you real examples of our AI solutions in action.",
  },
  {
    question: "Can your solutions integrate with our existing systems?",
    answer:
      "Yes, our solutions are designed to integrate seamlessly with your existing infrastructure. We ensure compatibility with your current systems while maintaining security and performance.",
  },
];

function FAQItem({ question, answer }: FAQItem) {
  return (
    <details className="w-full group">
      <summary className="w-full px-6 py-5 border-b border-ca-700 flex justify-between items-center cursor-pointer list-none group-open:border-verde">
        <h3 className="text-ca-50 text-lg font-normal leading-7">
          {question}
        </h3>
        <div className="w-6 h-6 relative overflow-hidden shrink-0">
          <div className="w-3.5 h-3.5 absolute left-[3px] top-[5px] bg-ca-600 group-open:bg-verde" />
        </div>
      </summary>
      <div className="px-6 py-5">
        <p className="text-ca-300 text-sm leading-tight">
          {answer}
        </p>
      </div>
    </details>
  );
}

export default function FAQSection({
  badgeText = "FAQ ",
  title = "Estamos aqui para esclarecer todas as suas dúvidas.",
  contactText = "Se não encontrar o que procura, entre em contato conosco.",
  contactLinkText = "entre em contato conosco",
  contactUrl = "/contato",
  items = defaultFAQs,
  class: className = "",
}: FAQSectionProps) {
  // Split contact text to insert link
  const [beforeLink, afterLink] = contactText.split(contactLinkText);

  return (
    <section
      className={`relative w-full bg-ca-900 overflow-hidden ${className}`}
    >
      <ContentContainer className="py-20">
        <div className="flex flex-col justify-start items-center gap-10">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Header */}
            <div className="flex flex-col justify-start items-start gap-6">
              <Badge
                variant="outline"
                color="secondary"
                withDot
                dotColor="primary"
              >
                {badgeText}
              </Badge>

              <h2 className="text-ca-50 text-6xl font-normal font-serif leading-[56px]">
                {title}
              </h2>

              <p className="text-ca-300 text-base leading-normal">
                {beforeLink}
                <a href={contactUrl} className="text-amarelo underline">
                  {contactLinkText}
                </a>
                {afterLink}
              </p>
            </div>

            {/* Right Column - FAQ List */}
            <div className="flex flex-col justify-start items-start gap-4">
              {items.map((item, index) => <FAQItem key={index} {...item} />)}
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
