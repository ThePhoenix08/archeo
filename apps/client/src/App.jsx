import { BrowserRouter, Route, Routes } from "react-router";
import "@/App.css";
import AccountSection from "@/features/account/AccountSection";
import ActivityLogPage from "@/features/account/pages/ActivityLog.page";
import ContactsPage from "@/features/account/pages/Contacts.page";
import ProfilePage from "@/features/account/pages/Profile.page";
import SettingsPage from "@/features/account/pages/Settings.page";
import APILayout from "@/features/api/APILayout";
import AnalyticsPage from "@/features/api/pages/Analytics.page";
import ConfigPage from "@/features/api/pages/Config.page";
import RequestsPage from "@/features/api/pages/Requests.page";
import UsagePage from "@/features/api/pages/Usage.page";
import AuthLayout from "@/features/auth/wrappers/AuthLayout.wrapper";
import LoginPage from "@/features/auth/pages/Login.page";
import RegisterPage from "@/features/auth/pages/Register.page";
import DashboardPage from "@/features/dashboard/Dashboard.page";
import DocumentPage from "@/features/document/Document.page";
import DocumentLayout from "@/features/document/DocumentLayout";
import AboutPage from "@/features/landing/About.page";
import LandingPage from "@/features/landing/Landing.page";
import DocumentsListPage from "@/features/library/documents/DocumentsList.page";
import LibrarySection from "@/features/library/LibrarySection";
import TemplatesListPage from "@/features/library/templates/TemplatesList.page";
import EditTemplatePage from "@/features/template/EditTemplate.page";
import TemplatePage from "@/features/template/Template.page";
import TemplateLayout from "@/features/template/TemplateLayout";
import VerificationPage from "@/features/verify/verification.page";
import AppLayout from "@/shared/wrappers/AppLayout.wrapper";
import { RouteGuard } from "@/features/auth/wrappers/RouteGuard.wrapper";
import NotFoundPage from "@/shared/pages/NotFound.page";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterUserPage from "@/features/auth/pages/RegisterUser1.page.jsx";
import BasicCredsPage from "@/features/auth/pages/BasicCreds.page.jsx";
import AgentTypePage from "@/features/auth/pages/AgentType.page.jsx";
import SelectRolesPage from "@/features/auth/pages/SelectRoles.page.jsx";
import AgentDetailsFormPage from "@/features/auth/pages/AgentDetailsForm.page.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="about" element={<AboutPage />} />

				<Route element={<AuthLayout />}>
					<Route path="login/:role?" element={<LoginPage />} />
					<Route path="register">
						<Route index element={<BasicCredsPage />} />
						<Route path="select-agent-type" element={<AgentTypePage />} />
						<Route path="details-form" element={<AgentDetailsFormPage />} />
						<Route path="select-roles" element={<SelectRolesPage />} />
					</Route>
				</Route>

				<Route path="app" element={<AppLayout />}>
					<Route index element={<DashboardPage />} />

					<Route path="library" element={<LibrarySection />}>
						{/* templatesList only for issuer */}
						<Route
							path="templates"
							element={<RouteGuard routeComponent={<TemplatesListPage />} />}
						/>
						<Route path="documents" element={<DocumentsListPage />} />
					</Route>

					<Route path="account" element={<AccountSection />}>
						<Route index element={<ProfilePage />} />
						<Route path="settings" element={<SettingsPage />} />
						<Route path="activity" element={<ActivityLogPage />} />
						<Route path="contacts" element={<ContactsPage />} />
					</Route>

					<Route path="document" element={<DocumentLayout />}>
						<Route path=":documentId/view?" element={<DocumentPage />} />
					</Route>

					{/* complete template section only for issuers */}
					<Route
						path="template"
						element={<RouteGuard routeComponent={<TemplateLayout />} />}
					>
						<Route
							path=":templateId/view?"
							element={<RouteGuard routeComponent={<TemplatePage />} />}
						/>
						<Route
							path=":templateId/edit"
							element={<RouteGuard routeComponent={<EditTemplatePage />} />}
						/>
					</Route>

					{/* complete api section only for verifiers */}
					<Route
						path="api"
						element={<RouteGuard routeComponent={<APILayout />} />}
					>
						<Route
							index
							element={<RouteGuard routeComponent={<AnalyticsPage />} />}
						/>
						<Route
							path="usage"
							element={<RouteGuard routeComponent={<UsagePage />} />}
						/>
						<Route
							path="config"
							element={<RouteGuard routeComponent={<ConfigPage />} />}
						/>
						<Route
							path="requests"
							element={<RouteGuard routeComponent={<RequestsPage />} />}
						/>
					</Route>
				</Route>

				<Route path="verify/:qr_url" element={<VerificationPage />} />

				{/* TEST ONLY ROUTE */}
				<Route path="test/:role?" element={<RegisterPage />} />

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</BrowserRouter>
	);
}

export default App;
