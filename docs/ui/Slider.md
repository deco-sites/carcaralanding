### Slider

Uncontrolled slider with signals. Includes subcomponents: `Slider.Item`, `Slider.Dot`, `Slider.PrevButton`, `Slider.NextButton`.

#### Import
```tsx
import Slider from "../../components/ui/Slider.tsx";
```

#### Props
- rootId: string (required)
- class: string
- interval: number (ms). Auto-advance when set
- infinite: boolean. Loop behavior for auto-advance

#### Usage
```tsx
<Slider rootId="hero-slider" interval={4000} infinite class="relative overflow-hidden">
  <Slider.Item index={0} class="w-full">Slide 1</Slider.Item>
  <Slider.Item index={1} class="w-full">Slide 2</Slider.Item>
  <Slider.Item index={2} class="w-full">Slide 3</Slider.Item>

  <div class="absolute inset-x-0 bottom-4 flex gap-2 justify-center">
    <Slider.Dot index={0}><span class="w-2 h-2 rounded-full bg-white/50 group-disabled:bg-white"/></Slider.Dot>
    <Slider.Dot index={1}><span class="w-2 h-2 rounded-full bg-white/50 group-disabled:bg-white"/></Slider.Dot>
    <Slider.Dot index={2}><span class="w-2 h-2 rounded-full bg-white/50 group-disabled:bg-white"/></Slider.Dot>
  </div>

  <Slider.PrevButton class="absolute left-2 top-1/2 -translate-y-1/2">Prev</Slider.PrevButton>
  <Slider.NextButton class="absolute right-2 top-1/2 -translate-y-1/2">Next</Slider.NextButton>
</Slider>
```