import EventCard from './EventCard.jsx'

// RelatedEvents: "Related Events" heading + a row of up to 4 EventCards.
// Props: events (already filtered by category/tags in EventPage via getRelatedEvents).
function RelatedEvents({ events }) {
  if (events.length === 0) return null // nothing related -> hide the whole section

  return (
    <section className="mt-[18px]">
      <h2 className="text-lg font-semibold">Related Events</h2>

      {/* 1 column on phones, 2 on tablets, 4 on desktop */}
      <div className="mt-2 grid gap-[21px] sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event) => (
          // key helps React tell list items apart when the list changes
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}

export default RelatedEvents
