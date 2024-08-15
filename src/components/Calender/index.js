import {Component} from 'react'

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import './index.css'
import MoodTrackerContext from '../../context/MoodTrackerContext'

class Calender extends Component {
  render() {
    return (
      <MoodTrackerContext.Consumer>
        {value => {
          const {
            calenderList,
            onChangeCalenderList,
            onRightArrowClick,
            onLeftArrowClick,
            daysList,
            month,
          } = value

          return (
            <>
              <div data-testid="arrowContainer" className="arrow-container">
                <button
                  type="button"
                  onClick={onLeftArrowClick}
                  className="arrow-button"
                  aria-label="Previous"
                  data-testid="previous-button"
                >
                  <MdOutlineKeyboardArrowLeft className="arrow-icon" />
                </button>

                <h1 data-testid="monthPara" className="month-para">
                  {calenderList[month - 1].monthName}
                </h1>

                <button
                  type="button"
                  onClick={onRightArrowClick}
                  className="arrow-button"
                  aria-label="Previous"
                  data-testid="next-button"
                >
                  <MdOutlineKeyboardArrowRight className="arrow-icon" />
                </button>
              </div>
              <div data-testid="calenderDates" className="calender-dates">
                <ul data-testid="daysUl" className="days-ul">
                  {daysList.map(item => (
                    <li data-testid="daysLi" key={item.id} className="days-li">
                      <p
                        data-testid="dayCalenderPara"
                        className="day-calender-Para"
                      >
                        {item.day}
                      </p>
                    </li>
                  ))}
                </ul>
                <ul data-testid="datesUl" className="dates-ul">
                  {calenderList[month - 1].dates.map(item => {
                    const {id, date, emojiUrl} = item
                    const onClick = () => {
                      onChangeCalenderList(id, month)
                    }
                    return (
                      <li data-testid="datesLi" key={id} className="dates-li">
                        <button
                          type="button"
                          onClick={onClick}
                          className="dates-li-button"
                          data-testid="datesLiButton"
                        >
                          <p data-testid="datesPara" className="dates-para">
                            {date}
                          </p>
                          {console.log(typeof item.emojiName, typeof item.date)}
                          {item.emojiName !== '' ? (
                            <img
                              className="dates-emoji"
                              src={emojiUrl}
                              alt={date}
                              data-testid="datesEmoji"
                            />
                          ) : null}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </>
          )
        }}
      </MoodTrackerContext.Consumer>
    )
  }
}

export default Calender