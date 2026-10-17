import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import EventPage from './pages/EventPage.jsx'

// The event we show when someone opens the site at "/"
const DEFAULT_EVENT_ID = 'f1-singapore-grand-prix-2026'

function App() {
  return (
    <div className="min-h-screen bg-page font-sans text-ink">
      {/* The navbar is outside <Routes>, so it shows on every page */}
      <Navbar />

      <Routes>
        {/* "/" redirects to our default event */}
        <Route path="/" element={<Navigate to={`/events/${DEFAULT_EVENT_ID}`} replace />} />
        {/* ":eventId" is a URL parameter, read inside EventPage with useParams() */}
        <Route path="/events/:eventId" element={<EventPage />} />
        {/* Any other URL also goes back to the default event */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
