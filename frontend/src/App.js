import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Calendar from "./pages/calendar";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Signup />} />

				<Route path="signup" element={<Signup />} />
				<Route path="login" element={<Login />} />
				<Route path="calendar" element={<Calendar />} />
			</Routes>
		</BrowserRouter>
	);
}
