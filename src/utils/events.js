// Helper functions for event data.
// These are plain JavaScript (no React), like a "utils" class in Java with static methods.

const TIME_ZONE = 'Asia/Singapore'

// "2026-10-11T20:00:00+08:00" -> "Sun, 11 Oct 2026"
export function formatDate(isoString) {
  const date = new Date(isoString)
  // formatToParts splits the date into pieces so we can arrange them ourselves
  const parts = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: TIME_ZONE,
  }).formatToParts(date)
  const get = (type) => parts.find((p) => p.type === type).value
  return `${get('weekday')}, ${get('day')} ${get('month')} ${get('year')}`
}

// "2026-10-11T20:00:00+08:00" -> "8:00 PM"
export function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: TIME_ZONE,
  })
}

// 388 -> "$ 388", 0 -> "Free"
export function formatPrice(price) {
  return price === 0 ? 'Free' : `$ ${price}`
}

// true if the event's end time is already in the past
export function isConcluded(event, now = new Date()) {
  return new Date(event.end) < now
}

// Works out what to show for availability.
// Returns { label, tone } where tone is used to pick a colour.
export function getAvailability(event, now = new Date()) {
  if (isConcluded(event, now)) return { label: 'This event has ended', tone: 'ended' }
  if (event.seatsLeft <= 0) return { label: 'Sold out', tone: 'soldout' }
  if (event.seatsLeft / event.capacity <= 0.2) return { label: 'Limited seats available', tone: 'limited' }
  return { label: 'Seats available', tone: 'available' }
}

// Finds events related to `current` by category and tags.
// Score: +2 for the same category, +1 for each shared tag.
// Concluded events and the current event itself are skipped.
export function getRelatedEvents(current, allEvents, limit = 4, now = new Date()) {
  return allEvents
    .filter((e) => e.id !== current.id && !isConcluded(e, now))
    .map((e) => {
      const sharedTags = e.tags.filter((tag) => current.tags.includes(tag)).length
      const sameCategory = e.category === current.category ? 2 : 0
      return { event: e, score: sharedTags + sameCategory }
    })
    .filter((item) => item.score > 0) // must have something in common
    .sort((a, b) => b.score - a.score || new Date(a.event.start) - new Date(b.event.start)) // best match first, then soonest
    .slice(0, limit)
    .map((item) => item.event)
}
