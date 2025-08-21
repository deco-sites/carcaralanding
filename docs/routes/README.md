### Routes and App Entry

#### App wrapper (`routes/_app.tsx`)
- Uses `defineApp` to set global `<Head>`, styles, fonts, and background lines
- Injects Tailwind CSS from `/styles.css` with cache-busting by release revision
- Renders the current route via `<ctx.Component />`

#### Index route (`routes/index.tsx`)
- Composes the homepage with `ThemeProvider`, `Header`, `Layout`, `HeroSection`, `TheFuture`, and `FooterSection`
- Example composition:
```tsx
<ThemeProvider>
  <Header />
  <Layout>
    <HeroSection title="..." description="..." />
    <TheFuture />
  </Layout>
  <FooterSection transformationStoriesColumn={{ posts: sampleBlogPosts }} />
</ThemeProvider>
```

#### Running locally
- `deno task dev` to start with HMR
- `deno task preview` to run the built site