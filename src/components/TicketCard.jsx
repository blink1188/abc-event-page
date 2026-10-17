import { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { TbChartBar } from 'react-icons/tb'
import { formatPrice, getAvailability } from '../utils/events.js'

// Colour for each availability "tone" returned by getAvailability()
const TONE_CLASSES = {
  available: 'text-green-700',
  limited: 'text-amber-700',
  soldout: 'text-red-600',
  ended: 'text-muted',
}

// TicketCard: price, availability, sign-up ("Get Tickets") button and "Save Event".
// Props: event. Has its own state for "signed up" and "saved".
function TicketCard({ event }) {
  // useState(false) -> [currentValue, functionToChangeIt]; changing it re-renders the card
  const [signedUp, setSignedUp] = useState(false)
  const [saved, setSaved] = useState(false)

  const availability = getAvailability(event)
  const canSignUp = availability.tone === 'available' || availability.tone === 'limited'

  // Button text depends on the situation
  let buttonLabel = 'Get Tickets'
  if (availability.tone === 'ended') buttonLabel = 'Event has ended'
  else if (availability.tone === 'soldout') buttonLabel = 'Sold out'
  else if (signedUp) buttonLabel = "You're signed up!"

  return (
    <aside className="h-fit rounded-sm border border-line bg-card p-[21px]">
      <h2 className="text-lg font-semibold">Ticket</h2>

      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="text-[32px] font-semibold leading-[38px]">{formatPrice(event.price)}</span>
        {event.price > 0 && <span className="text-xs text-muted">/ pax</span>}
      </p>

      <hr className="mt-3 border-line" />

      <div className="mt-3 flex items-center text-xs">
        <TbChartBar className="text-xl" aria-hidden="true" />
        <span className="ml-3 w-[89px] font-medium">Availability:</span>
        <span className={TONE_CLASSES[availability.tone]}>{availability.label}</span>
      </div>

      {/* The sign-up button. It doesn't link anywhere (as per requirements), it just updates state. */}
      <button
        type="button"
        onClick={() => setSignedUp(true)}
        disabled={!canSignUp || signedUp}
        className="mt-3 h-10 w-full rounded-sm bg-brand font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
      >
        {buttonLabel}
      </button>

      {/* Toggle: clicking flips saved between true and false */}
      <button
        type="button"
        onClick={() => setSaved(!saved)}
        aria-pressed={saved}
        className="mt-3 flex items-center gap-3 text-xs hover:text-brand"
      >
        {saved ? <FaHeart className="text-lg text-brand" /> : <FiHeart className="text-lg" />}
        {saved ? 'Saved' : 'Save Event'}
      </button>
    </aside>
  )
}

export default TicketCard
