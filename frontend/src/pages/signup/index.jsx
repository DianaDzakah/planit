import React, { useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";

const Signup = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Add your login logic here
		setLoading(true);

		try {
			const response = await fetch("api/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			setLoading(false);

			const data = await response.json();

			if (response.ok) {
				console.log("data", data.data);
				sessionStorage.setItem("USER_INFO", JSON.stringify(data.data));

				navigate("/calendar");
			} else {
				setLoading(false);
				console.log("response body", data);
				setErrorMessage(data.message);
				return;
			}
		} catch (error) {
			setLoading(false);
			setErrorMessage(error.message);
		}
	};

	return (
		<>
			<nav className={styles.nav}>
				<a className={styles.planit}>PLANIT</a>
				<a className={styles.link} href="/login">
					LOGIN
				</a>
			</nav>
			<div className={styles.body}>
				<h1>Create an account</h1>

				{errorMessage && <p className={styles.error}>{errorMessage}</p>}

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
						{loading ? (
							<Spinner />
						) : (
							<button className={styles.btn} type="submit">
								Signup
							</button>
						)}
					</form>
				</section>
			</div>
		</>
	);
};

export default Signup;
