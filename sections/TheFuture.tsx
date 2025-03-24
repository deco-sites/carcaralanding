import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { H1 } from "../components/ui/Typography.tsx";
import Badge from "../components/ui/Badge.tsx";
import { ContentContainer } from "../components/Layout.tsx";

interface FutureItem {
  title: string;
  description: string;
  size?: "small" | "medium" | "large";
  isHighlight?: boolean;
}

export default function TheFuture() {
  const activeItem = useSignal<number>(0);

  const futureItems: FutureItem[] = [
    {
      title: "AI Teams",
      description:
        "Companies will have dedicated teams of AI Agents working alongside humans, revolutionizing productivity and innovation.",
      size: "medium",
    },
    {
      title: "AI as Commodity",
      description:
        "AI models will become standardized commodities, making advanced capabilities accessible to all businesses.",
      size: "medium",
    },
    {
      title: "Natural Programming",
      description:
        "Programming will evolve to natural language interactions, making software development more intuitive and accessible.",
      size: "medium",
    },
    {
      title: "Dynamic UI",
      description:
        "User interfaces will be generated in real-time, adapting perfectly to each user's needs and context.",
      size: "large",
      isHighlight: true,
    },
  ];

  return (
    <section className="relative w-full bg-ca-900 overflow-hidden">
      <ContentContainer className="py-24 px-4 md:px-16">
        <div className="flex flex-col justify-start items-center gap-16">
          <div className="w-full max-w-[883px] flex flex-col justify-start items-center gap-6">
            <Badge
              variant="outline"
              color="secondary"
              withDot
              dotColor="primary"
            >
              The Future
            </Badge>
            <H1 className="text-center text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal font-serif">
              The Future of AI is Here
            </H1>
            <p className="text-center max-w-[280px] sm:max-w-sm md:max-w-md text-ca-300 px-4 sm:px-0">
              Discover how AI is transforming the way we work and create. These
              trends are not just predictions - they're already becoming
              reality.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="w-full grid grid-rows-[repeat(5,auto)] grid-cols-10 gap-0">
            {/* Row 1 */}
            <div className="relative border border-ca-400 bg-ca-900 rounded-[1.25rem] aspect-square" />

            {/* AI Teams */}
            <div className="relative col-[3/5] row-[1/3] border border-ca-400 bg-ca-800 rounded-[1.25rem] group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 p-6 flex flex-col bg-center bg-no-repeat bg-cover">
                <div className="text-vermelho text-sm">*</div>
                <h3 className="text-ca-50 text-xl font-normal mt-2">
                  AI Teams
                </h3>
              </div>
            </div>

            <div className="relative border border-ca-400 bg-ca-900 rounded-[1.25rem] aspect-square" />
            <div className="relative border border-ca-400 bg-ca-900 rounded-[1.25rem] aspect-square" />
            <div className="relative border border-ca-400 bg-ca-900 rounded-[1.25rem] aspect-square" />

            {/* AI as Commodity */}
            <div className="relative col-[8/10] row-[1/3] border border-ca-400 bg-ca-800 rounded-[1.25rem] group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 p-6 flex flex-col bg-center bg-no-repeat bg-cover">
                <div className="text-vermelho text-sm">*</div>
                <h3 className="text-ca-50 text-xl font-normal mt-2">
                  AI as Commodity
                </h3>
              </div>
            </div>

            <div className="relative border border-ca-400 bg-ca-900 rounded-[1.25rem] aspect-square" />
            <div className="relative border border-ca-400 bg-ca-900 rounded-[1.25rem] aspect-square" />

            {/* Row 2 continues - empty cells */}
            <div className="relative border border-ca-400 bg-ca-900 rounded-[1.25rem] aspect-square" />
            <div className="relative border border-ca-400 bg-ca-900 rounded-[1.25rem] aspect-square" />
            <div className="relative border border-ca-400 bg-ca-900 rounded-[1.25rem] aspect-square" />

            {/* Natural Programming - Center */}
            <div className="relative col-[5/7] row-[3/5] border border-ca-400 bg-ca-800 rounded-[1.25rem] group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 p-6 flex flex-col bg-center bg-no-repeat bg-cover">
                <div className="text-vermelho text-sm">*</div>
                <h3 className="text-ca-50 text-xl font-normal mt-2">
                  Natural Programming
                </h3>
                <p className="text-ca-300 text-sm mt-2">
                  Programming will evolve to natural language interactions,
                  making software development more intuitive and accessible.
                </p>
              </div>
            </div>

            {/* Dynamic UI - Right */}
            <div className="relative col-[6/8] row-[4/6] border border-ca-400 bg-vermelho rounded-[1.25rem] group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 p-6 flex flex-col bg-center bg-no-repeat bg-cover">
                <div className="text-black text-xl">→</div>
                <h3 className="text-black text-xl font-normal mt-2">
                  Dynamic UI
                </h3>
              </div>
            </div>

            {/* Fill remaining cells with 1x1 squares */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="relative border border-ca-400 bg-ca-900 rounded-[1.25rem] aspect-square"
              />
            ))}
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
