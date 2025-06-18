import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./features/landing/Landing.page.jsx/index.js";
import AboutPage from "./features/landing/About.page";
import AuthLayout from "./features/auth/AuthLayout";
import LoginPage from "./features/auth/pages/Login.page";
import RegisterPage from "./features/auth/pages/Register.page";
import ProtectedRoutesProvider from "./features/auth/components/ProtectedRoutes.provider";
import AppLayout from "./shared/layout/AppLayout";
import VerificationPage from "./features/verify/verification.page";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<LandingPage/>}/>
				<Route path="about" element={<AboutPage/>}/>

				<Route element={<AuthLayout/>}>
					<Route path="login" element={<LoginPage />} />
    			<Route path="register" element={<RegisterPage />} />
				</Route>

				<ProtectedRoutesProvider>
					<Route element={<AppLayout/>}>

					</Route>
				</ProtectedRoutesProvider>

				<Route path="verify/:qr_url" element={<VerificationPage/>}/>

			</Routes>
		</BrowserRouter>
	)
}

export default App;
