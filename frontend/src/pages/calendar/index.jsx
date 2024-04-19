import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import Modal from "react-modal";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./index.module.css"; // Import CSS module
import AddEvent from "../../components/add-event";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
	const [modalIsOpen, setIsOpen] = useState(true); // Changed React.useState to useState

	return (
		<>
			<nav className={styles.nav}>
				<a href="/calendar" className={styles.planit}>
					planit
				</a>
				<a className={styles.link} href="/login">
					LogOut
				</a>
			</nav>

			<Modal
				style={{
					content: {
						width: "400px",
						height: "400px",
						top: "20%",
						left: "20%",
						backgroundColor: "white",
					},
					overlay: {
						opacity: 1,
					},
				}}
				isOpen={modalIsOpen}
			>
				<AddEvent />
			</Modal>

			<div style={{ height: "800px" }}>
				<Calendar
					localizer={localizer}
					events={events}
					startAccessor="start"
					endAccessor="end"
					style={{ margin: "50px" }}
				/>
			</div>
		</>
	);
};

export default MyCalendar;
