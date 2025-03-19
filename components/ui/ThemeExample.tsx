import {
  Body,
  BodyLarge,
  Eyebrow,
  H1,
  H2,
  H3Serif,
  H4,
  HeroTitle,
} from "./Typography.tsx";

export default function ThemeExample() {
  return (
    <div className="flex flex-col gap-8 p-8 bg-ca-50">
      <div className="mb-8">
        <HeroTitle>Carcará Typography</HeroTitle>
        <H2 class="text-ca-600">Typography and Color System</H2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <H2 class="text-ca-700">Typography</H2>

          <div className="flex flex-col gap-2">
            <HeroTitle>Hero Title</HeroTitle>
            <Eyebrow class="text-ca-500">
              .hero-title - 72px, Instrument Serif
            </Eyebrow>
          </div>

          <div className="flex flex-col gap-2">
            <H1>Heading 1</H1>
            <Eyebrow class="text-ca-500">.h1 - 56px, Instrument Serif</Eyebrow>
          </div>

          <div className="flex flex-col gap-2">
            <H2>Heading 2</H2>
            <Eyebrow class="text-ca-500">.h2 - 32px, Inter</Eyebrow>
          </div>

          <div className="flex flex-col gap-2">
            <H3Serif>Heading 3 Serif</H3Serif>
            <Eyebrow class="text-ca-500">
              .h3-serif - 32px, Instrument Serif
            </Eyebrow>
          </div>

          <div className="flex flex-col gap-2">
            <H4>Heading 4</H4>
            <Eyebrow class="text-ca-500">.h4 - 20px, Inter</Eyebrow>
          </div>

          <div className="flex flex-col gap-2">
            <BodyLarge>Body Large Text</BodyLarge>
            <Eyebrow class="text-ca-500">.body-large - 20px, Inter</Eyebrow>
          </div>

          <div className="flex flex-col gap-2">
            <Body>
              Body Text. This is the default body text style for paragraphs and
              general content on the website.
            </Body>
            <Eyebrow class="text-ca-500">.body - 16px, Inter</Eyebrow>
          </div>

          <div className="flex flex-col gap-2">
            <Eyebrow>Eyebrow Text</Eyebrow>
            <Eyebrow class="text-ca-500">.eyebrow - 14px, Inter</Eyebrow>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <H2 class="text-ca-700">Color System</H2>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-ca-50"></div>
              <Body class="font-medium">ca-50</Body>
              <Body class="text-ca-600 text-sm">#E2E2DA</Body>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-ca-100"></div>
              <Body class="font-medium">ca-100</Body>
              <Body class="text-ca-600 text-sm">#D9D9D1</Body>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-ca-200"></div>
              <Body class="font-medium">ca-200</Body>
              <Body class="text-ca-600 text-sm">#C7C8C1</Body>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-ca-300"></div>
              <Body class="font-medium">ca-300</Body>
              <Body class="text-ca-600 text-sm">#ADAEA9</Body>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-ca-400"></div>
              <Body class="font-medium">ca-400</Body>
              <Body class="text-ca-600 text-sm">#8B8D8A</Body>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-ca-500"></div>
              <Body class="font-medium">ca-500</Body>
              <Body class="text-ca-600 text-sm">#727472</Body>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-ca-600 text-white"></div>
              <Body class="font-medium">ca-600</Body>
              <Body class="text-ca-600 text-sm">#555758</Body>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-ca-700 text-white"></div>
              <Body class="font-medium">ca-700</Body>
              <Body class="text-ca-600 text-sm">#3E4042</Body>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-ca-800 text-white"></div>
              <Body class="font-medium">ca-800</Body>
              <Body class="text-ca-600 text-sm">#282B2E</Body>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-ca-900 text-white"></div>
              <Body class="font-medium">ca-900</Body>
              <Body class="text-ca-600 text-sm">#1B1D1E</Body>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-amarelo"></div>
              <Body class="font-medium">amarelo</Body>
              <Body class="text-ca-600 text-sm">#CC8B43</Body>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-vermelho"></div>
              <Body class="font-medium">vermelho</Body>
              <Body class="text-ca-600 text-sm">#B13431</Body>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-verde"></div>
              <Body class="font-medium">verde</Body>
              <Body class="text-ca-600 text-sm">#B13431</Body>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-azul"></div>
              <Body class="font-medium">azul</Body>
              <Body class="text-ca-600 text-sm">#4C7780</Body>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-md bg-cinza"></div>
              <Body class="font-medium">cinza</Body>
              <Body class="text-ca-600 text-sm">#607A7E</Body>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
