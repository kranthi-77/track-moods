import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import './index.css'
import Header from '../Header'
import {useMoodTracker} from '../../context/MoodTrackerContext'

const Reports = () => {
  const {
    calenderList,
    emojisListNew,
    onReportCalenderChange,
    calenderReportList,
    reportCalenderMonth,
  } = useMoodTracker()

  return (
    <>
      <Header />
      <div
        data-testid="reportsBodyContainer"
        className="reports-body-container"
      >
        <h1 data-testid="emojiReportHeading" className="emoji-report-heading">
          Overall Emojis Reports
        </h1>
        <ul data-testid="emojiReportUl" className="emoji-report-ul">
          {calenderReportList.map(item => (
            <li
              data-testid="emojiReportLi"
              className="emoji-report-li"
              key={item.id}
            >
              <p data-testid="emojiLiPara" className="emoji-li-para">
                {item.emojiName}
              </p>
              <img
                data-testid="emojiLiImg"
                className="emoji-li-img"
                src={item.emojiUrl}
                alt={item.emojiName}
              />
              <p data-testid="emojiCount" className="emoji-count">
                {item.count}
              </p>
            </li>
          ))}
        </ul>
        <div data-testid="monthlyContainer" className="monthly-container">
          <h1
            data-testid="monthlyReportsHeading"
            className="monthly-reports-heading"
          >
            Monthly Reports
          </h1>
          <select
            value={reportCalenderMonth}
            onChange={onReportCalenderChange}
            className="calender-select"
            data-testid="calenderSelect"
          >
            {calenderList.map(item => (
              <option key={item.month} value={item.month}>
                {item.monthName}
              </option>
            ))}
          </select>
        </div>
        <div style={{width: '80%', height: '100%'}}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              className="bar-chart"
              width={600}
              height={300}
              data={calenderReportList}
              margin={{top: 0, right: 20, left: 20, bottom: 5}}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="emojiName" type="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" barSize={40}>
                {calenderReportList.map((entry, index) => (
                  <img
                    key={entry.id}
                    src={entry.emojiUrl}
                    alt={`emoji-${index}`}
                    style={{width: '20px', height: '20px', marginRight: '20px'}}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default Reports
