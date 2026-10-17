import Navbar from './components/Navbar.jsx'
import HeroBanner from './components/HeroBanner.jsx'
import EventDetails from './components/EventDetails.jsx'
import TicketCard from './components/TicketCard.jsx'
import EventLocation from './components/EventLocation.jsx'
import RelatedEvents from './components/RelatedEvents.jsx'

function App() {
  return (
    <div className="min-h-screen bg-page text-ink">
      <Navbar />
      <HeroBanner />
      <EventDetails />
      <TicketCard />
      <EventLocation />
      <RelatedEvents />
    </div>
  )
}

export default App
