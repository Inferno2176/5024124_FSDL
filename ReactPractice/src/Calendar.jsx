import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState({});

  useEffect(() => {
    // Load data from localStorage
    const data = JSON.parse(localStorage.getItem('fitifyCalendar')) || {};
    setCalendarData(data);

    // Initial render
    renderCalendar();
    selectDate(new Date());
  }, []);

  const getKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const renderCalendar = () => {
    // This will be handled in JSX rendering
  };

  const changeMonth = (delta) => {
    setViewDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + delta);
      return newDate;
    });
  };

  const resetToToday = () => {
    setViewDate(new Date());
    setSelectedDate(new Date());
  };

  const selectDate = (date) => {
    setSelectedDate(date);
  };

  const addCurrentEvent = () => {
    const input = document.getElementById('newEventInput');
    const val = input.value.trim();
    if (!val) return;

    const key = getKey(selectedDate);
    setCalendarData(prev => {
      const newData = { ...prev };
      if (!newData[key]) newData[key] = { events: [], notes: '' };
      if (!newData[key].events) newData[key].events = [];
      newData[key].events.push(val);
      localStorage.setItem('fitifyCalendar', JSON.stringify(newData));
      return newData;
    });
    input.value = '';
  };

  const removeEvent = (idx) => {
    const key = getKey(selectedDate);
    setCalendarData(prev => {
      const newData = { ...prev };
      if (newData[key] && newData[key].events) {
        newData[key].events.splice(idx, 1);
        localStorage.setItem('fitifyCalendar', JSON.stringify(newData));
      }
      return newData;
    });
  };

  const saveNotes = () => {
    const val = document.getElementById('dailyNotes').value;
    const key = getKey(selectedDate);
    setCalendarData(prev => {
      const newData = { ...prev };
      if (!newData[key]) newData[key] = { events: [], notes: '' };
      newData[key].notes = val;
      localStorage.setItem('fitifyCalendar', JSON.stringify(newData));
      return newData;
    });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month dates
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDate - i;
      days.push({
        day: dayNum,
        date: new Date(year, month - 1, dayNum),
        isOtherMonth: true
      });
    }

    // Current month dates
    for (let i = 1; i <= lastDate; i++) {
      const date = new Date(year, month, i);
      const dateKey = getKey(date);
      days.push({
        day: i,
        date,
        isOtherMonth: false,
        isToday: date.toDateString() === new Date().toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString(),
        hasEvents: calendarData[dateKey] && (calendarData[dateKey].events?.length > 0 || calendarData[dateKey].notes)
      });
    }

    // Next month dates to fill 6 rows
    const totalCells = firstDayIndex + lastDate;
    const remaining = 42 - totalCells;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        date: new Date(year, month + 1, i),
        isOtherMonth: true
      });
    }

    return days;
  };

  const selectedDateData = calendarData[getKey(selectedDate)] || { events: [], notes: '' };

  return (
    <div className="calendar-page">
      <main className="dashboard-container">
        <div className="calendar-wrapper">
          {/* LEFT: Calendar Grid */}
          <div className="big-calendar-card">
            <div className="calendar-header">
              <div className="calendar-controls">
                <button onClick={() => changeMonth(-1)}>❮</button>
              </div>
              <h2>{viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
              <div className="calendar-controls">
                <button onClick={() => changeMonth(1)}>❯</button>
              </div>
            </div>
            <div className="calendar-grid-full">
              {/* Header Row */}
              <div className="day-name">Sun</div>
              <div className="day-name">Mon</div>
              <div className="day-name">Tue</div>
              <div className="day-name">Wed</div>
              <div className="day-name">Thu</div>
              <div className="day-name">Fri</div>
              <div className="day-name">Sat</div>
              {/* Days */}
              {generateCalendarDays().map((dayInfo, index) => (
                <div
                  key={index}
                  className={`cal-day-box ${dayInfo.isOtherMonth ? 'other-month' : ''} ${dayInfo.isToday ? 'today' : ''} ${dayInfo.isSelected ? 'selected' : ''}`}
                  onClick={() => !dayInfo.isOtherMonth && selectDate(dayInfo.date)}
                >
                  <span>{dayInfo.day}</span>
                  {dayInfo.hasEvents && <div className="mini-event-dot"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Details Panel */}
          <div className="details-card">
            <div className="details-header">
              <div className="header-content">
                <div>
                  <h2>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
                  <p>Manage your schedule</p>
                </div>
                <button
                  id="resetDateBtn"
                  onClick={resetToToday}
                  className="streak-badge"
                  style={{
                    display: selectedDate.toDateString() === new Date().toDateString() &&
                            viewDate.getMonth() === new Date().getMonth() &&
                            viewDate.getFullYear() === new Date().getFullYear() ? 'none' : 'inline-block'
                  }}
                >
                  Today
                </button>
              </div>
            </div>

            {/* Events Section */}
            <div className="events-section">
              <h4>Events</h4>
              <div id="eventsList">
                {selectedDateData.events && selectedDateData.events.length > 0 ? (
                  selectedDateData.events.map((event, idx) => (
                    <div key={idx} className="event-list-item">
                      <span>{event}</span>
                      <button onClick={() => removeEvent(idx)}>&times;</button>
                    </div>
                  ))
                ) : (
                  <p>No events set.</p>
                )}
              </div>
              <div className="add-event">
                <input type="text" id="newEventInput" placeholder="Add new event..." />
                <button onClick={addCurrentEvent}>+</button>
              </div>
            </div>

            {/* Notes Section */}
            <div className="notes-section">
              <h4>Daily Notes</h4>
              <textarea
                id="dailyNotes"
                defaultValue={selectedDateData.notes || ''}
                placeholder="Write your thoughts, workout notes, or meal reflections here..."
              />
              <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                <button className="save-notes-btn" onClick={saveNotes}>Save Notes</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;