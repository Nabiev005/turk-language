import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Dictionary from './pages/Dictionary';
import Grammar from './pages/Grammar';
import Lessons from './pages/Lessons'; 
import LessonView from './pages/LessonView';
import CinemaPractice from './pages/CinemaPractice';
import Welcome from './pages/Welcome';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Навбарды кирген колдонуучуга гана көрсөтүү үчүн
const Layout = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navbar /> : null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyles />
        <Layout />
        <Routes>
          <Route path="/welcome" element={<Welcome />} />

          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/dictionary" element={<ProtectedRoute><Dictionary /></ProtectedRoute>} />
          <Route path="/grammar" element={<ProtectedRoute><Grammar /></ProtectedRoute>} />
          <Route path="/lessons" element={<ProtectedRoute><Lessons /></ProtectedRoute>} />
          <Route path="/lesson/:id" element={<ProtectedRoute><LessonView /></ProtectedRoute>} />
          <Route path="/cinema" element={<ProtectedRoute><CinemaPractice /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;