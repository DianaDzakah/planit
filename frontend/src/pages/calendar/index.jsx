import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styles from "./index.module.css"; // Import CSS module
import AddEvent from "../../components/add-event";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
	const [open, setOpen] = useState(false); // Changed React.useState to useState
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const onCloseModal = () => setOpen(false);

	return (
		<>
			<nav className={styles.nav}>
				<a href="/calendar" className={styles.planit}>
					PLANIT
				</a>
				<a className={styles.link} href="/login">
					LOGOUT
				</a>
			</nav>

			<Modal open={open} onClose={onCloseModal} center>
				<AddEvent startDate={startDate} endDate={endDate} />
			</Modal>

			<div style={{ height: "800px" }}>
				<Calendar
					localizer={localizer}
					events={events}
					startAccessor="start"
					endAccessor="end"
					style={{ margin: "50px" }}
					selectable={true}
					onSelectSlot={(slotInfo) => {
						setStartDate(slotInfo.start);
						setEndDate(slotInfo.end);
						setOpen(true);
					}}
				/>
			</div>
		</>
	);
};

export default MyCalendar;
