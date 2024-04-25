import React from "react";
import moment from "moment";
import Spinner from "../spinner";
import styles from "./index.module.css";

const PreviewEvent = ({
	eventId,
	loading,
	deleteEvent,
	title,
	startDate,
	endDate,
}) => {
	return (
		<form className={styles.addevent}>
			<h1> Preview Event </h1>
			<label htmlFor="title">
				Event Title:{" "}
				<input
					disabled={true}
					value={title}
					type="text"
					name="title"
					id="title"
				/>
			</label>
			<label htmlFor="startDate">
				Start Date:{" "}
				<input
					disabled={true}
					type="datetime-local"
					name="startDate"
					id="startDate"
					defaultValue={moment(startDate).format("yyyy-MM-DDTHH:mm:ss")}
				/>
			</label>
			<label htmlFor="endDate">
				End Date:{" "}
				<input
					disabled={true}
					type="datetime-local"
					name="endDate"
					id="endDate"
					defaultValue={moment(endDate).format("yyyy-MM-DDTHH:mm:ss")}
				/>
			</label>
			<div className={styles.buttonflexbox}>
				<div className={styles.buttoncontainer}>
					<button className={styles.editButton} type="submit">
						Edit
					</button>
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
