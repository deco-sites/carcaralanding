import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { ContentContainer } from "../components/Layout.tsx";

export interface Logo {
  src?: ImageWidget;
  /** @description text alternative */
  altText?: string;
}

export interface Props {
  title?: string;
  logos?: Logo[];
}

const IMG_PLACEHODLER = Array(30).fill(0).map(() => ({
  src:
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/03fbcc78-ca86-4616-a59a-b8aa18331a9c",
  altText: "Logo",
}));

export default function Logos({
  logos = IMG_PLACEHODLER,
}: Props) {
  const slideContent = (
    <div class="flex items-center gap-10 md:gap-20">
      {logos?.map((logo) => {
        return (
          <div class="flex items-center justify-center">
            <Image
              src={logo.src || ""}
              alt={logo.altText || ""}
              width={48}
              height={48}
              class="w-auto h-auto max-w-[5rem] max-h-[1.5rem] md:max-w-[8rem] md:max-h-[3.5rem] object-contain"
            />
          </div>
        );
      })}
    </div>
  );
  return (
    <div class="w-full py-3 md:py-6 justify-self-center max-w-[1440px]">
      <div class="relative w-full overflow-hidden">
        <div class="animate-sliding flex gap-10 md:gap-20">
          {slideContent}
          {slideContent} {/* Add a duplicate for seamless loop */}
        </div>
      </div>
    </div>
  );
}
