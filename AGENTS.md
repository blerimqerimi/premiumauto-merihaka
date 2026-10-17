<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep the Premium Auto experience on the index route with section anchors, because this is a one-page website.
- Define visual roles in the global stylesheet and reusable Button variants, so the monochrome design stays consistent.
- Booking dialogs offer phone and email contact until an official booking URL is supplied; never simulate confirmed appointments.
- Prebundle React and the page's Radix dependencies together in Vite, so late dependency optimization cannot split React hook dispatchers during preview hydration.
- Price sections receive independent row data and headings through props so edits to one category do not alter the others; price strings preserve owner-supplied formatting and unknown values.
- Images bundled in the project (not Lovable CDN) so they work on Netlify too.
