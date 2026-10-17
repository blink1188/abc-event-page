import { FiMapPin, FiNavigation } from 'react-icons/fi'

// EventLocation: interactive map on the left, venue details + "Get directions" on the right.
// Props: venue { name, address, lat, lng }.
function EventLocation({ venue }) {
  // OpenStreetMap's free embeddable map (no API key needed).
  // bbox = the visible area (left, bottom, right, top); marker = the pin position.
  const d = 0.006 // how far the map extends around the venue
  const bbox = [venue.lng - d * 1.6, venue.lat - d, venue.lng + d * 1.6, venue.lat + d].join(',')
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${venue.lat},${venue.lng}`

  // Opens Google Maps directions to the venue in a new tab
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`

  return (
    <section className="mt-[18px] rounded-sm border border-line bg-card px-[19px] pb-[19px] pt-[13px]">
      <h2 className="text-lg font-semibold">Event location</h2>

      <div className="mt-2 grid gap-6 md:grid-cols-[553px_1fr]">
        <iframe
          title={`Map showing ${venue.name}`}
          src={mapUrl}
          loading="lazy"
          className="h-[296px] w-full border-0"
        />

        <div className="pt-2.5">
          <h3 className="text-base font-semibold">Venue name</h3>
          <p className="mt-3 text-sm">{venue.name}</p>
          <p className="mt-3 flex items-center gap-2.5 text-xs text-muted">
            <FiMapPin className="shrink-0 text-sm text-ink" aria-hidden="true" />
            {venue.address}
          </p>

          <hr className="mt-3 border-line" />

          {/* target="_blank" opens a new tab; rel="noopener noreferrer" is the safe default for that */}
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[18px] flex h-[39px] w-full items-center justify-center gap-2 rounded-sm border border-brand text-xs text-brand transition-colors hover:bg-brand hover:text-white"
          >
            <FiNavigation aria-hidden="true" />
            Get directions
          </a>
        </div>
      </div>
    </section>
  )
}

export default EventLocation
