import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import AccountSection from "./features/account/AccountSection";
import ActivityLogPage from "./features/account/pages/ActivityLog.page";
import ContactsPage from "./features/account/pages/Contacts.page";
import ProfilePage from "./features/account/pages/Profile.page";
import SettingsPage from "./features/account/pages/Settings.page";
import APILayout from "./features/api/APILayout";
import AnalyticsPage from "./features/api/pages/Analytics.page";
import ConfigPage from "./features/api/pages/Config.page";
import RequestsPage from "./features/api/pages/Requests.page";
import UsagePage from "./features/api/pages/Usage.page";
import AuthLayout from "./features/auth/AuthLayout";
import LoginPage from "./features/auth/pages/Login.page";
import RegisterPage from "./features/auth/pages/Register.page";
import DashboardPage from "./features/dashboard/Dashboard.page";
import DocumentPage from "./features/document/Document.page";
import DocumentLayout from "./features/document/DocumentLayout";
import AboutPage from "./features/landing/About.page";
import LandingPage from "./features/landing/Landing.page";
import DocumentsListPage from "./features/library/documents/DocumentsList.page";
import LibrarySection from "./features/library/LibrarySection";
import TemplatesListPage from "./features/library/templates/TemplatesList.page";
import EditTemplatePage from "./features/template/EditTemplate.page";
import TemplatePage from "./features/template/Template.page";
import TemplateLayout from "./features/template/TemplateLayout";
import VerificationPage from "./features/verify/verification.page";
import AppLayout from "./shared/layout/AppLayout";
import { ROLES } from "./shared/constants/roles.constant";

function App() {
	const userRole = ROLES.ISSUER;

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="about" element={<AboutPage />} />

				<Route element={<AuthLayout />}>
					<Route path="login/:role" element={<LoginPage />} />
					<Route path="register/:role" element={<RegisterPage />} />
				</Route>

				<Route path="app" element={<AppLayout />}>
					<Route index element={<DashboardPage />} />

					<Route path="library" element={<LibrarySection />}>
						{/* templatesList only for issuer */}
						<Route path="templates" element={<TemplatesListPage />} />
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
					<Route path="template" element={<TemplateLayout />}>
						<Route path=":templateId/view?" element={<TemplatePage />} />
						<Route path=":templateId/edit" element={<EditTemplatePage />} />
					</Route>

					{/* complete api section only for verifiers */}
					<Route path="api" element={<APILayout />}>
						<Route index element={<AnalyticsPage />} />
						<Route path="usage" element={<UsagePage />} />
						<Route path="config" element={<ConfigPage />} />
						<Route path="requests" element={<RequestsPage />} />
					</Route>
				</Route>

				<Route path="verify/:qr_url" element={<VerificationPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
