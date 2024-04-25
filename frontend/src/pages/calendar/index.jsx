import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styles from "./index.module.css"; // Import CSS module
import AddEvent from "../../components/add-event";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
	const [open, setOpen] = useState(false); // Changed React.useState to useState
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [events, setEvents] = useState([]);

	const getAllEvents = async () => {
		const userInfo = JSON.parse(sessionStorage.getItem("USER_INFO"));
		if (userInfo && userInfo.token !== undefined) {
			const response = await fetch("/api/events", {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			});
			const data = await response.json();
			// console.log(data);
			const events = data.data.map((event) => ({
				title: event.title,
				start: new Date(event.startDate),
				end: new Date(event.endDate),
			}));
			// Update events in state
			setEvents(events);
		}
	};
	const onCloseModal = () => setOpen(false);

	useEffect(() => {
		getAllEvents();
	});

	return (
		<>
			<nav className={styles.nav}>
				<a className={styles.planit}>PLANIT</a>
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
