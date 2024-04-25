import React from "react";
import moment from "moment";
import styles from "./index.module.css";

const AddEvent = ({ startDate, endDate }) => {
	const addEvent = async (event) => {
		const userInfo = JSON.parse(sessionStorage.getItem("USER_INFO"));
		event.preventDefault();
		// Get access to form data
		const formData = new FormData(event.target);
		// Post data to API
		if (userInfo && userInfo.token !== undefined) {
			const response = await fetch(`/api/events`, {
				method: "POST",
				body: JSON.stringify({
					user: userInfo.user._id,
					title: formData.get("title"),
					startDate: formData.get("startDate"),
					endDate: formData.get("endDate"),
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			});
			console.log(response);
		}
	};

	return (
		<form onSubmit={addEvent} className={styles.addevent}>
			<h1>Add New Event</h1>
			<label htmlFor="title">
				Event Title: <input type="text" name="title" id="title" />
			</label>
			<label htmlFor="startDate">
				Start Date:{" "}
				<input
					type="datetime-local"
					name="startDate"
					id="startDate"
					defaultValue={moment(startDate).format("yyyy-MM-DDTHH:mm:ss")}
				/>
			</label>
			<label htmlFor="endDate">
				End Date:{" "}
				<input
					type="datetime-local"
					name="endDate"
					id="endDate"
					defaultValue={moment(endDate).format("yyyy-MM-DDTHH:mm:ss")}
				/>
			</label>
			<div className={styles.buttoncontainer}>
				<button className={styles.button} type="submit">
					Save
				</button>
			</div>
		</form>
	);
};

export default AddEvent;
