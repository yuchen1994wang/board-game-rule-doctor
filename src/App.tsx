import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import HomePage from "@/pages/HomePage";
import RuleCardPage from "@/pages/RuleCardPage";
import RuleValidationPage from "@/pages/RuleValidationPage";

export default function App() {
  return (
    <LanguageProvider>
      <Router basename="/board-game-rule-doctor">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rule/:id" element={<RuleCardPage />} />
          <Route path="/admin/validation" element={<RuleValidationPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
