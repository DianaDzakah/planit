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
	const [shouldFetchData, setShouldFetchData] = useState(false);
	const [open, setOpen] = useState(false); // Changed React.useState to useState
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [events, setEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isEditing, setIsEditing] = useState(false);

	const getAllEvents = async () => {
		setShouldFetchData(true);

		try {
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
				setShouldFetchData(false);
			}
		} catch (error) {
			setShouldFetchData(false);
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
		setIsEditing(false);
	};

	useEffect(() => {
		getAllEvents();
	}, [shouldFetchData]);

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

				setShouldFetchData(true);

				setLoading(false);
				setOpen(false);
			} catch (error) {
				setOpen(false);

				setLoading(false);
				setErrorMessage(error.message);
				setShouldFetchData(false);
			}
		}
	};

	const updateEvent = async (formData) => {
		const userInfo = JSON.parse(sessionStorage.getItem("USER_INFO"));
		if (userInfo && userInfo.token !== undefined) {
			try {
				setLoading(true);
				const response = await fetch(`/api/events/${selectedEvent.eventId}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userInfo.token}`,
					},
					body: JSON.stringify(formData),
				});

				const data = await response.json();

				if (!response.ok) {
					setErrorMessage(data.message);
					setOpen(false);
					setIsEditing(false);
				}

				setShouldFetchData(true);

				setLoading(false);
				setOpen(false);
				setIsEditing(false);
			} catch (error) {
				setLoading(false);
				setErrorMessage(error.message);
				setOpen(false);
				setIsEditing(false);
				setShouldFetchData(false);
			}
		}
	};

	const enableEditing = () => {
		setIsEditing(true);
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
				{selectedEvent ? (
					<PreviewEvent
						disable={!isEditing}
						title={selectedEvent.title}
						startDate={selectedEvent.start}
						endDate={selectedEvent.end}
						deleteEvent={deleteEvent}
						eventId={selectedEvent.eventId}
						enableEditing={enableEditing}
						isEditing={isEditing}
						updateEvent={updateEvent}
						loading={loading}
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
						setSelectedEvent();
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
