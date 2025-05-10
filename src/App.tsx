import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import RewardsPage from './pages/RewardsPage';
// import SettingsPage from './pages/SettingsPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import FollowersPage from './pages/FollowersPage';
import UploadPage from './pages/UploadPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './index.css';
import SocialProfiles from './pages/SocialProfiles';
import AITools from './pages/AITools'; 

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <TaskProvider>
            <NotificationProvider>
              <div className="min-h-screen bg-gray-50">
                <Routes>
                  {/* <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} /> */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/followers" 
                    element={
                      <ProtectedRoute>
                        <FollowersPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/upload" 
                    element={
                      <ProtectedRoute>
                        <UploadPage />
                      </ProtectedRoute>
                    } 
                  />
                  {/* <Route 
                    path="/rewards" 
                    element={
                      <ProtectedRoute>
                        <RewardsPage />
                      </ProtectedRoute>
                    } 
                  /> */}
                  {/* <Route 
                    path="/settings" 
                    element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    } 
                  /> */}
                  <Route 
                    path="/socialprofiles" 
                    element={
                      <ProtectedRoute>
                        <SocialProfiles />
                      </ProtectedRoute>
                    } 
                    />

                    <Route 
                    path="/aitools" 
                    element={
                      <ProtectedRoute>
                        <AITools/>
                      </ProtectedRoute>
                    } 
                    />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </div>
            </NotificationProvider>
          </TaskProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;