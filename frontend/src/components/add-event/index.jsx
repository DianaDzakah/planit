import React, { useState } from "react";
import moment from "moment";
import Spinner from "../spinner";
import styles from "./index.module.css";

const AddEvent = ({ addEventBtn, loading, startDate, endDate }) => {
	const [formData, setFormData] = useState({
		title: "",
		startDate: startDate,
		endDate: endDate,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<form className={styles.addevent}>
			<h1>Add New Event</h1>
			<label htmlFor="title">
				Event Title:{" "}
				<input type="text" name="title" id="title" onChange={handleChange} />
			</label>
			<label htmlFor="startDate">
				Start Date:{" "}
				<input
					type="datetime-local"
					name="startDate"
					id="startDate"
					defaultValue={moment(formData.startDate).format(
						"yyyy-MM-DDTHH:mm:ss"
					)}
					onChange={handleChange}
				/>
			</label>
			<label htmlFor="endDate">
				End Date:{" "}
				<input
					type="datetime-local"
					name="endDate"
					id="endDate"
					defaultValue={moment(formData.endDate).format("yyyy-MM-DDTHH:mm:ss")}
					onChange={handleChange}
				/>
			</label>
			<div className={styles.buttoncontainer}>
				{loading ? (
					<Spinner width="30px" />
				) : (
					<button
						className={styles.button}
						onClick={() => addEventBtn(formData)}
						type="button"
					>
						Save
					</button>
				)}
			</div>
		</form>
	);
};

export default AddEvent;
