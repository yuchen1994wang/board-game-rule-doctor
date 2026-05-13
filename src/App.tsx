import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import HomePage from "@/pages/HomePage";
import RuleCardPage from "@/pages/RuleCardPage";

export default function App() {
  return (
    <LanguageProvider>
      <Router basename="/board-game-rule-doctor">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rule/:id" element={<RuleCardPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
