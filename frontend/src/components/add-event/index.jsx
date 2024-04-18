import React from "react";
import styles from "./index.module.css";

const AddEvent = () => {
	return (
		<>
			<div className={styles.card}>
				<div className={styles.cardContent}>
					<h2 className={styles.eventTitle}>Event Title</h2>
					<p className={styles.eventtDate}>Date: January 1, 2025</p>
					<p className={styles.eventDate}>end date</p>
				</div>
				<div className={styles.cardAction}>
					<button className={styles.actionButton}>Edit</button>
					<button className={styles.actionButton}>Delete</button>
				</div>
			</div>
		</>
	);
};

export default AddEvent;
