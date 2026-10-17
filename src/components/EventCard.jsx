import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { FiCalendar, FiMapPin } from 'react-icons/fi'
import { formatDate, formatTime } from '../utils/events.js'
import EventImage from './EventImage.jsx'

// EventCard: small card for one related event. The whole card links to that event's page.
// Props: event.
function EventCard({ event }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="group block overflow-hidden rounded-sm border border-line bg-white transition-shadow hover:shadow-md"
    >
      <EventImage
        src={event.image}
        alt=""
        className="h-[85px] w-full object-cover"
        fallbackClassName="flex h-[85px] items-center justify-center bg-linear-to-br from-ink to-brand text-sm font-semibold text-white"
      >
        {event.category}
      </EventImage>

      <div className="flex items-end justify-between gap-3 px-3.5 pb-[13px] pt-[13px]">
        <div className="min-w-0 space-y-1">
          <h3 className="truncate text-xs font-semibold">{event.title}</h3>
          <p className="flex items-center gap-2 text-[11px] text-muted">
            <FiCalendar className="shrink-0 text-ink" aria-hidden="true" />
            {formatDate(event.start)} <span>•</span> {formatTime(event.start)}
          </p>
          <p className="flex items-center gap-2 text-[11px] text-muted">
            <FiMapPin className="shrink-0 text-ink" aria-hidden="true" />
            <span className="truncate">{event.venue.name}</span>
          </p>
        </div>

        {/* group-hover: changes this when the mouse is over the whole card (the "group") */}
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] text-white transition-transform group-hover:translate-x-0.5">
          <FaArrowRight aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

export default EventCard
