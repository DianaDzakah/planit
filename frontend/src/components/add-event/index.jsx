import React from "react";
import moment from "moment";
import styles from "./index.module.css";

const AddEvent = ({ startDate, endDate }) => {
	return (
		<form className={styles.addevent}>
			<h1>Add New Event</h1>
			<label htmlFor="title">
				Event Title: <input type="text" name="title" id="title" />
			</label>
			<label htmlFor="startDate">
				Start Date: <input
					type="datetime-local"
					name="startDate"
					id="startDate"
					defaultValue={moment(startDate).format("yyyy-MM-DDTHH:mm:ss")} />
			</label>
			<label htmlFor="endDate">
				End Date: <input
					type="datetime-local"
					name="endDate"
					id="endDate"
					defaultValue={moment(endDate).format("yyyy-MM-DDTHH:mm:ss")} />
			</label>
			<button type="submit">Save</button>
		</form>
	);
};

export default AddEvent;
