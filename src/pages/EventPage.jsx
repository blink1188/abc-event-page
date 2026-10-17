import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import HeroBanner from '../components/HeroBanner.jsx'
import EventDetails from '../components/EventDetails.jsx'
import TicketCard from '../components/TicketCard.jsx'
import EventLocation from '../components/EventLocation.jsx'
import RelatedEvents from '../components/RelatedEvents.jsx'
import { getRelatedEvents } from '../utils/events.js'

// One full event page. Which event is shown depends on the URL: /events/:eventId
function EventPage() {
  const { eventId } = useParams() // read ":eventId" from the URL

  // State: data that can change while the page is open.
  const [events, setEvents] = useState(null) // null = not loaded yet
  const [error, setError] = useState(null)

  // useEffect runs code AFTER the component appears on screen.
  // The empty [] means "run once", so we fetch the event list one time.
  // Axios requests /data/events.json (a file in public/). Later this URL
  // could point to a real back-end API without changing anything else.
  useEffect(() => {
    axios
      .get('/data/events.json')
      .then((response) => setEvents(response.data))
      .catch(() => setError('Sorry, we could not load this event. Please try again later.'))
  }, [])

  // When the URL changes to another event, jump back to the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [eventId])

  // --- Loading / error / not-found states ---
  if (error) return <PageMessage>{error}</PageMessage>
  if (!events) return <PageMessage>Loading event…</PageMessage>

  const event = events.find((e) => e.id === eventId)
  if (!event) {
    return (
      <PageMessage>
        Event not found.{' '}
        <Link to="/" className="font-medium text-brand hover:underline">
          Back to events
        </Link>
      </PageMessage>
    )
  }

  const related = getRelatedEvents(event, events)

  return (
    <main className="mx-auto max-w-[1242px] px-4 pb-12 pt-4 xl:px-0">
      <HeroBanner image={event.image} title={event.title} />

      {/* Details on the left, ticket card on the right (stacked on small screens) */}
      <div className="mt-[18px] grid gap-6 lg:grid-cols-[1fr_403px]">
        <EventDetails event={event} />
        {/* key={event.id} gives each event a fresh TicketCard,
            so "Saved" / "Signed up" state doesn't carry over to another event */}
        <TicketCard key={event.id} event={event} />
      </div>

      <EventLocation venue={event.venue} />
      <RelatedEvents events={related} />
    </main>
  )
}

// Small helper component for simple centred messages
function PageMessage({ children }) {
  return <p className="mx-auto max-w-[1242px] px-4 py-24 text-center text-muted">{children}</p>
}

export default EventPage
