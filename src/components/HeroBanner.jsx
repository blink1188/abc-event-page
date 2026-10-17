// HeroBanner: large landscape event image at the top of the page.
// Props: image (URL or null), title (used as alt text).
function HeroBanner({ image, title }) {
  // If an event has no image, show a branded gradient instead of a broken image.
  if (!image) {
    return (
      <div className="flex h-[240px] w-full items-center justify-center rounded-sm bg-linear-to-br from-ink to-brand px-6 text-center text-3xl font-bold text-white md:h-[415px]">
        {title}
      </div>
    )
  }

  return (
    <img
      src={image}
      alt={title}
      className="h-[240px] w-full rounded-sm object-cover md:h-[415px]"
    />
  )
}

export default HeroBanner
