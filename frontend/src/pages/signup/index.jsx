import React, { useState } from "react";
import styles from "./index.module.css";

const Signup = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Add your signup logic here
		// console.log(formData);
		// Post to API
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/api/users/register`,
			{
				method: "POST",
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		// console.log(data);
		sessionStorage.setItem("USER_INFO", JSON.stringify(data.data));
	};

	return (
		<>
			<nav className={styles.nav}>
				<a href="/calendar" className={styles.planit}>
					PLANIT
				</a>
				<a className={styles.link} href="/login">
					LOGIN
				</a>
			</nav>
			<div className={styles.body}>
				<h1>Create an account</h1>
				<section>
					<form className={styles.signupContainer} onSubmit={handleSubmit}>
						<input
							className={styles.input}
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							placeholder="First Name"
							required
						/>
						<input
							className={styles.input}
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							placeholder="Last Name"
							required
						/>
						<input
							className={styles.input}
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Email"
							required
						/>
						<input
							className={styles.input}
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Password"
							required
						/>
						<button className={styles.btn} type="submit">
							Sign Up
						</button>
					</form>
				</section>
			</div>
		</>
	);
};

export default Signup;
