import EventImage from './EventImage.jsx'

// HeroBanner: large landscape event image at the top of the page.
// Props: image (URL or null), title (used as alt text).
function HeroBanner({ image, title }) {
  return (
    <EventImage
      src={image}
      alt={title}
      className="h-[240px] w-full rounded-sm object-cover md:h-[415px]"
      fallbackClassName="flex h-[240px] w-full items-center justify-center rounded-sm bg-linear-to-br from-ink to-brand px-6 text-center text-3xl font-bold text-white md:h-[415px]"
    >
      {title}
    </EventImage>
  )
}

export default HeroBanner
