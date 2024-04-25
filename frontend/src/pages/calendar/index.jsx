import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styles from "./index.module.css"; // Import CSS module
import AddEvent from "../../components/add-event";
import PreviewEvent from "../../components/preview-event";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
	const [open, setOpen] = useState(false); // Changed React.useState to useState
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [events, setEvents] = useState([]);
	const [selctedEvent, setSelectedEvent] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

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
				eventId: event._id,
				title: event.title,
				start: new Date(event.startDate),
				end: new Date(event.endDate),
			}));
			// Update events in state
			setEvents(events);
		}
	};

	const handleSelectEvent = useCallback((event) => {
		console.log("event", event);
		// setEvents((pre) => [...pre,{event}]);
		setSelectedEvent(event);
		setOpen(true);
	}, []);

	const onCloseModal = () => {
		setSelectedEvent(null);
		setOpen(false);
	};

	useEffect(() => {
		getAllEvents();
	});

	const deleteEvent = async (eventId) => {
		const userInfo = JSON.parse(sessionStorage.getItem("USER_INFO"));
		if (userInfo && userInfo.token !== undefined) {
			try {
				setLoading(true);
				const response = await fetch(`/api/events/${eventId}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userInfo.token}`,
					},
				});

				const data = await response.json();

				if (!response.ok) {
					setErrorMessage(data.message);
				}

				setLoading(false);
				setOpen(false);
			} catch (error) {
				setOpen(false);

				setLoading(false);
				setErrorMessage(error.message);
			}
		}
	};

	const logOut = () => {
		sessionStorage.clear();
	};

	return (
		<>
			<nav className={styles.nav}>
				<a className={styles.planit}>PLANIT</a>
				<a onClick={logOut} className={styles.link} href="/login">
					LOGOUT
				</a>
			</nav>

			<Modal open={open} onClose={onCloseModal} center>
				{selctedEvent ? (
					<PreviewEvent
						disable={true}
						title={selctedEvent.title}
						startDate={selctedEvent.startDate}
						endDate={selctedEvent.endDate}
						deleteEvent={deleteEvent}
						loading={loading}
						eventId={selctedEvent.eventId}
					/>
				) : (
					<AddEvent disable={false} startDate={startDate} endDate={endDate} />
				)}
			</Modal>

			<div style={{ height: "800px" }}>
				<Calendar
					localizer={localizer}
					events={events}
					startAccessor="start"
					endAccessor="end"
					style={{ margin: "50px" }}
					selectable={true}
					onSelectEvent={handleSelectEvent}
					onSelectSlot={(slotInfo) => {
						// setTitle(slotInfo);
						console.log("slotInfo", slotInfo);
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
