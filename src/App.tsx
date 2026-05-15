import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useTheme } from "@/hooks/useTheme";

const HomePage = lazy(() => import("@/pages/HomePage"));
const RuleCardPage = lazy(() => import("@/pages/RuleCardPage"));
const RuleValidationPage = lazy(() => import("@/pages/RuleValidationPage"));

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#f5f5dc] dark:bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#1a4731]/20 border-t-[#1a4731] dark:border-green-900 dark:border-t-green-400 rounded-full animate-spin"></div>
        <p className="text-[#1a4731] dark:text-green-400 text-sm font-medium">加载中...</p>
      </div>
    </div>
  );
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeWrapper>
        <Router basename="/board-game-rule-doctor">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/rule/:id" element={<RuleCardPage />} />
              <Route path="/admin/validation" element={<RuleValidationPage />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeWrapper>
    </LanguageProvider>
  );
}
