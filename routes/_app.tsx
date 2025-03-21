import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { Context } from "@deco/deco";

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  return (
    <>
      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @view-transition { navigation: auto; }
              
              /* Set background color for entire page */
              html, body {
                background-color: var(--ca-900) !important;
              }
              
              /* Custom global styles */
              .vertical-line {
                position: fixed !important;
                top: 0 !important;
                bottom: 0 !important;
                width: 1px !important;
                background-color: #3E4042 !important;
                opacity: 0.5 !important;
                z-index: 9999 !important;
                pointer-events: none !important;
              }
              
              .left-line {
                left: calc(50% - 720px) !important;
              }
              
              .right-line {
                right: calc(50% - 720px) !important;
              }
              
              @media (max-width: 1440px) {
                .left-line {
                  left: 0 !important;
                }
                .right-line {
                  right: 0 !important;
                }
              }
              
              .content-container {
                max-width: 1440px !important;
                margin-left: auto !important;
                margin-right: auto !important;
                width: 100% !important;
                box-sizing: border-box !important;
              }
            `,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Background color overlay */}
      <div className="fixed inset-0 w-full h-full bg-ca-900 -z-10"></div>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Fixed vertical lines */}
      <div className="vertical-line left-line"></div>
      <div className="vertical-line right-line"></div>
    </>
  );
});
