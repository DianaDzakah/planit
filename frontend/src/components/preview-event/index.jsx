import React, { useState } from "react";
import moment from "moment";
import Spinner from "../spinner";
import icon from "../../assets/share.png";
import styles from "./index.module.css";

const PreviewEvent = ({
	eventId,
	deleteEvent,
	title,
	startDate,
	endDate,
	disable,
	isEditing,
	enableEditing,
	updateEvent,
	loading,
}) => {
	const [formData, setFormData] = useState({
		title: title,
		startDate: startDate,
		endDate: endDate,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const exportEvent = async (eventId) => {
		console.log("exporting event");

		try {
			const userInfo = JSON.parse(sessionStorage.getItem("USER_INFO"));

			if (userInfo && userInfo.token !== undefined) {
				const response = await fetch(`/api/events/export/${eventId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userInfo.token}`,
					},
				});
				console.log(response);

				const data = await response.text();

				const blob = new Blob([data], { type: "text/calendar;charset=utf-8" });
				const url = window.URL.createObjectURL(blob);

				const a = document.createElement("a");

				a.style.display = "none";
				a.href = url;
				a.download = "calendar.ics";
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<form className={styles.addevent}>
			<div className={styles.icon}>
				<h1> Preview Event </h1>
				<img
					onClick={() => exportEvent(eventId)}
					width={"25px"}
					src={icon}
					alt="icon"
				/>
			</div>

			<label htmlFor="title">
				Event Title:{" "}
				<input
					disabled={disable}
					value={formData.title}
					type="text"
					name="title"
					id="title"
					onChange={handleChange}
				/>
			</label>
			<label htmlFor="startDate">
				Start Date:{" "}
				<input
					disabled={disable}
					type="datetime-local"
					name="startDate"
					id="startDate"
					value={moment(formData.startDate).format("yyyy-MM-DDTHH:mm:ss")}
					onChange={handleChange}
				/>
			</label>
			<label htmlFor="endDate">
				End Date:{" "}
				<input
					disabled={disable}
					type="datetime-local"
					name="endDate"
					id="endDate"
					value={moment(formData.endDate).format("yyyy-MM-DDTHH:mm:ss")}
					onChange={handleChange}
				/>
			</label>
			<div className={styles.buttonflexbox}>
				<div className={styles.buttoncontainer}>
					{loading ? (
						<Spinner />
					) : isEditing ? (
						<button
							onClick={() => updateEvent(formData)}
							className={styles.editButton}
							type="button"
						>
							Save
						</button>
					) : (
						<button
							onClick={enableEditing}
							className={styles.editButton}
							type="button"
						>
							Edit
						</button>
					)}
				</div>
				<div className={styles.buttoncontainer}>
					{loading ? (
						<Spinner width="30px" />
					) : (
						<button
							className={styles.deleteButton}
							onClick={() => deleteEvent(eventId)}
							type="button"
						>
							Delete
						</button>
					)}
				</div>
			</div>
		</form>
	);
};

export default PreviewEvent;
