import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi'
import { formatDate, formatTime, isConcluded } from '../utils/events.js'

// EventDetails: title, date & time, location, organiser, and "About this event".
// Props: event (one event object from events.json).
function EventDetails({ event }) {
  const ended = isConcluded(event)

  return (
    <section className="min-w-0 break-words">
      {ended && (
        // "&&" in JSX: only render this when `ended` is true
        <p className="mb-2 inline-block rounded-full bg-ink px-3 py-1 text-xs font-medium text-white">
          This event has concluded
        </p>
      )}

      <h1 className="text-3xl font-bold uppercase md:text-[34px] md:leading-[39px]">{event.title}</h1>

      <dl className="mt-1.5 space-y-[7px] text-sm">
        <InfoRow icon={FiCalendar} label="Date & Time:">
          {formatDate(event.start)}
          <span className="mx-2">•</span>
          {formatTime(event.start)} – {formatTime(event.end)}
        </InfoRow>
        <InfoRow icon={FiMapPin} label="Location:">
          {event.venue.name}, {event.venue.city}
        </InfoRow>
        <InfoRow icon={FiUsers} label="Organiser:">
          {event.organiser}
        </InfoRow>
      </dl>

      <hr className="mt-4 border-line" />

      <h2 className="mt-6 text-lg font-semibold">About this event</h2>
      <p className="mt-2 max-w-[660px] text-sm leading-5 text-muted">{event.description}</p>
    </section>
  )
}

// One "icon  Label:  value" row. `icon: Icon` renames the prop so we can use it as <Icon />
// (component names must start with a capital letter).
function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="grid grid-cols-[24px_minmax(0,1fr)] items-start gap-x-3 gap-y-1 sm:grid-cols-[24px_111px_minmax(0,1fr)] sm:gap-x-[19px]">
      <Icon className="shrink-0 text-2xl" strokeWidth={1.5} aria-hidden="true" />
      <dt className="font-medium">{label}</dt>
      <dd className="col-start-2 min-w-0 text-muted sm:col-start-3">{children}</dd>
    </div>
  )
}

export default EventDetails
