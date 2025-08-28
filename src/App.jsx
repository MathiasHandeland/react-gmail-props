import { useState } from 'react'
import initialEmails from './data/emails'
import './styles/App.css'
import Emails from './components/Emails'
import EmailDetail from './components/EmailDetail'

const getReadEmails = emails => emails.filter(email => !email.read)

const getStarredEmails = emails => emails.filter(email => email.starred)

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')
  const [searchQuery, setSearchQuery] = useState('') 
  const [openedEmail, setOpenedEmail] = useState(null)
  const [sortBy, setSortBy] = useState('newest')

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)

  const toggleStar = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      )
    setEmails(updatedEmails)
  }

  const toggleRead = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    setEmails(updatedEmails)
  }

  const openEmail = email => {
    setOpenedEmail(email)
  }

  const toggleAllRead = () => {
    const allRead = emails.every(email => email.read)
    const updatedEmails = emails.map(email => ({ ...email, read: !allRead }))
    setEmails(updatedEmails)
  }

  // filtering
  let filteredEmails = emails

  if (hideRead) filteredEmails = getReadEmails(filteredEmails)

  if (currentTab === 'starred')
    filteredEmails = getStarredEmails(filteredEmails)

  // search filter for emails by title
  if (searchQuery) {
    filteredEmails = filteredEmails.filter(email =>
      email.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // sorting
  if (sortBy === "newest") {
    filteredEmails = [...filteredEmails].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
  } 
  else if (sortBy === "oldest") {
    filteredEmails = [...filteredEmails].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    )
  } else if (sortBy === "starred") {
    filteredEmails = [...filteredEmails].sort(
      (a, b) => b.starred - a.starred
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div className="left-menu">
          <svg className="menu-icon" focusable="false" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>

          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
            alt="gmail logo"
          />
        </div>

        <div className="search">
          <input className="search-bar" placeholder="Search mail" onChange = {e => setSearchQuery(e.target.value)} value = {searchQuery} />
        </div>

        <div className="sort">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-dropdown"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="starred">Starred</option>
          </select>
        </div>
      </header>
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label"><strong>Inbox</strong></span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label"><strong>Starred</strong></span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read"><strong>Hide read</strong></label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={e => setHideRead(e.target.checked)}
            />
          </li>
          <li className="item toggle">
            <button className="mark-all-button" onClick={() => { toggleAllRead() }}>
              {emails.every(email => email.read) ? "Mark all as unread" : "Mark all asread"}
            </button>
          </li>
        </ul>
      </nav>
      <main className="emails">
        {/* If an email is opened, show the detail. Otherwise, show the Emails component. */}
        {openedEmail ? (
          <EmailDetail
            email={openedEmail}
            onBack={() => setOpenedEmail(null)}
          />
        ) : (
          <Emails
            emails={filteredEmails}
            onToggleRead={toggleRead}
            onToggleStar={toggleStar}
            onOpenEmail={openEmail}
          />
        )}
      </main>
    </div>
  )
}

export default App
