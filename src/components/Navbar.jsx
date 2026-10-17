import { Link } from 'react-router-dom'
import { FiHeart, FiSearch, FiShoppingCart } from 'react-icons/fi'

// Navbar: top bar with ABC co. logo, search box, nav links, wishlist and cart icons.
// Links and search are placeholders (the Events tab is a separate project).
const NAV_LINKS = ['Browse Events', 'Create Event', 'Help']

function Navbar() {
  return (
    <header className="border-b border-line bg-page">
      {/* Inner row: same 1242px width as the page content, centred */}
      <nav className="mx-auto flex h-[61px] max-w-[1242px] items-center justify-between gap-6 px-4 xl:px-0">
        {/* LEFT: logo + search */}
        <div className="flex min-w-0 flex-1 items-center gap-[74px]">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            {/* Simple text logo in a black circle */}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              abc
            </span>
            <span className="text-2xl font-medium">ABC co.</span>
          </Link>

          <label className="hidden h-8 w-full max-w-[411px] items-center gap-2 rounded-md border border-[#d9d4ca] bg-white/60 px-3 md:flex">
            <FiSearch className="shrink-0 text-muted" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search events, locations, or categories"
              className="w-full bg-transparent text-xs outline-none placeholder:text-muted"
            />
          </label>
        </div>

        {/* RIGHT: links | divider | icons */}
        <div className="flex shrink-0 items-center gap-6 text-sm">
          {/* .map() turns each string into an <a> element, like a for-loop that builds a list */}
          {NAV_LINKS.map((label) => (
            <a key={label} href="#" className="hidden hover:text-brand lg:inline">
              {label}
            </a>
          ))}
          <span className="hidden h-6 w-px bg-line lg:block" aria-hidden="true" />
          <button type="button" aria-label="Saved events" className="hover:text-brand">
            <FiHeart className="text-[22px]" />
          </button>
          <button type="button" aria-label="Cart" className="hover:text-brand">
            <FiShoppingCart className="text-2xl" />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
