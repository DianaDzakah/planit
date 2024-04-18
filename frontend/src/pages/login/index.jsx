

import React, { useState } from 'react';
import styles from './index.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log(formData);
  };

  return (
    <>
      <nav className={styles.nav}>
        <a href='/calendar' className={styles.planit}>PLANIT</a>
        <a className={styles.link} href='/signup'>SIGNUP</a>
      </nav>
      <div className={styles.body}>
      <h1>Have an account already?</h1>
      <section>
        <form className={styles.loginContainer} onSubmit={handleSubmit}>
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
          <button className={styles.btn} type="submit">Login</button>
        </form>
      </section>
      </div>
      
    </>
  );
};

export default Login;
