import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Dictionary from './pages/Dictionary';
import Grammar from './pages/Grammar';
import Lessons from './pages/Lessons'; // Жаңы: Сабактардын тизмеси барагы
import LessonView from './pages/LessonView';
import VideoPractice from './pages/VideoPractice';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/grammar" element={<Grammar />} />
        
        {/* Бул жерде сабактардын тизмеси чыгат */}
        <Route path="/lessons" element={<Lessons />} />
        
        {/* Бул жерде тандалган сабак ачылат (:id - бул өзгөрмө) */}
        <Route path="/lesson/:id" element={<LessonView />} />
        <Route path="/cinema" element={<VideoPractice />} />
      </Routes>
    </Router>
  );
}

export default App;