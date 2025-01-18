import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiMenu} from 'react-icons/fi'
import {MdClose} from 'react-icons/md'
import {useMoodTracker} from '../../context/MoodTrackerContext'

import './index.css'

const Header = () => {
  const [isMenu, setIsMenu] = useState(false)
  const history = useHistory()
  const {onHomeClick, onReportClick} = useMoodTracker()

  const onMenuClick = () => {
    setIsMenu(prev => !prev)
  }

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const newClassName = isMenu ? 'navbar-menu' : 'nav-content-lg'
  const newDataTestid = isMenu ? 'navbarMenu' : 'navContentLg'

  return (
    <nav data-testid="navbar" className="navbar">
      <h1 data-testid="navHeading" className="nav-heading">
        Daily Mood Tracker
      </h1>
      <div data-testid="navContentSm" className="nav-content-sm">
        <button
          className="menu-button"
          type="button"
          onClick={onMenuClick}
          data-testid="menuButton"
        >
          {isMenu ? <MdClose className="icon" /> : <FiMenu className="icon" />}
        </button>
      </div>
      <div data-testid={newDataTestid} className={newClassName}>
        <ul data-testid="navbarMenuContent" className="navbar-menu-content">
          <Link onClick={onHomeClick} className="link" to="/">
            <li data-testid="navLi" className="nav-li">
              Home
            </li>
          </Link>
          <Link onClick={onReportClick} className="link" to="/reports">
            <li data-testid="navLi2" className="nav-li">
              Reports
            </li>
          </Link>
          <li>
            <button
              type="button"
              onClick={onLogout}
              className="logout-button"
              data-testid="logoutButton"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
