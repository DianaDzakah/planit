import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from "./index.module.css"; // Import CSS module

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => (
  <>
    <nav className={styles.nav}> {/* Apply CSS styles */}
      <a href='/calendar' className={styles.planit}>planit</a>
      <a className={styles.link} href='/login'>LogOut</a>
    </nav>

    <div  style={{ height: '800px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50px' }}
      />
    </div>
  </>
);

export default MyCalendar;
