import {Component} from 'react'
import MoodTrackerContext from '../../context/MoodTrackerContext'
import Header from '../Header'
import Calender from '../Calender'
import './index.css'

class Home extends Component {
  render() {
    return (
      <MoodTrackerContext.Consumer>
        {value => {
          const {
            emojisListNew,
            nameDayCount,
            activeEmoji,
            calenderList,
            daysList,
            activeEmojiName,
            activeDay,
            onEmojiClick,
            onEmojiNameChange,
            onDayChange,
          } = value

          return (
            <>
              <Header />
              <div
                data-testid="homeBodyContainer"
                className="home-body-container"
              >
                <h1 data-testid="homeMainHeading" className="home-main-heading">
                  Moods in a Month
                </h1>
                <div
                  data-testid="homeAllContainer"
                  className="home-all-container"
                >
                  <div
                    data-testid="calenderContainer1"
                    className="calender-container1"
                  >
                    <Calender calenderList={calenderList} />
                  </div>
                  <div data-testid="helloMoto" className="helloMoto">
                    <div
                      data-testid="emojisListContainer"
                      className="emojis-list-container"
                    >
                      <ul data-testid="emojiUl" className="emoji-ul">
                        {emojisListNew.map(item => {
                          const {id, emojiName, emojiUrl} = item
                          const onEmojiSelect = () => {
                            onEmojiClick(id)
                          }
                          const activeEmojiClass =
                            activeEmoji === id ? 'activeEmoji' : null
                          const activeEmojiPara =
                            activeEmoji === id ? 'activeEmojiPara' : null
                          const activeEmojiButton =
                            activeEmoji === id ? 'activeEmojiButton' : null
                          return (
                            <li
                              data-testid="emojiLi"
                              key={id}
                              className="emoji-li"
                            >
                              <button
                                data-testid="emojiButton"
                                type="button"
                                onClick={onEmojiSelect}
                                className={`emoji-button ${activeEmojiButton}`}
                              >
                                <p
                                  data-testid="emojiPara"
                                  className={`emoji-para ${activeEmojiPara}`}
                                >
                                  {emojiName}
                                </p>
                                <img
                                  data-testid="emojiImg"
                                  className={`emoji-img ${activeEmojiClass}`}
                                  src={emojiUrl}
                                  alt={emojiName}
                                />
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <div
                      data-testid="selectContainer"
                      className="select-container"
                    >
                      <select
                        onChange={onEmojiNameChange}
                        value={activeEmojiName}
                        className="emoji-select"
                        data-testid="emojiSelect"
                      >
                        {emojisListNew.map(item => (
                          <option key={item.id} value={item.emojiName}>
                            {item.emojiName}
                          </option>
                        ))}
                      </select>
                      <select
                        onChange={onDayChange}
                        value={activeDay}
                        className="day-select"
                        data-testid="daySelect"
                      >
                        {daysList.map(item => (
                          <option key={item.id} value={item.dayNumber}>
                            {item.day}
                          </option>
                        ))}
                      </select>
                      <h1 data-testid="nameDayCount" className="name-day-count">
                        {nameDayCount}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </MoodTrackerContext.Consumer>
    )
  }
}
export default Home