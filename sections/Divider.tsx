import { ContentContainer } from "../components/Layout.tsx";

export interface DividerProps {
  /**
   * Padding top in pixels
   * @default 32
   */
  paddingTop?: number;

  /**
   * Padding bottom in pixels
   * @default 32
   */
  paddingBottom?: number;
}

export default function Divider({
  paddingTop = 40,
  paddingBottom = 40,
}: DividerProps) {
  return (
    <section style={{ paddingTop, paddingBottom }}>
      <div className="w-full h-px bg-ca-700" />
    </section>
  );
}
