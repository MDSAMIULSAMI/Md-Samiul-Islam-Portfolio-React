import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "motion/react";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import PageTransition from "./components/layout/PageTransition.jsx";
import SmoothScroll from "./components/layout/SmoothScroll.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Experience from "./pages/Experience.jsx";
import Projects from "./pages/Projects.jsx";
import Achievements from "./pages/Achievements.jsx";
import LegalPrivacy from "./pages/LegalPrivacy.jsx";
import LegalTerms from "./pages/LegalTerms.jsx";

// pdf.js is heavy, so it only loads when someone opens /resume.
const Resume = lazy(() => import("./pages/Resume.jsx"));

const PAGES = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/experience", element: <Experience /> },
  { path: "/projects", element: <Projects /> },
  { path: "/achievements", element: <Achievements /> },
  { path: "/resume", element: <Resume /> },
  { path: "/privacy-policy", element: <LegalPrivacy /> },
  { path: "/terms-of-service", element: <LegalTerms /> },
];

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {PAGES.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <PageTransition>
                <Suspense
                  fallback={
                    <div className="grid min-h-[60vh] place-items-center font-mono text-sm text-faint">
                      Loading
                    </div>
                  }
                >
                  {element}
                </Suspense>
              </PageTransition>
            }
          />
        ))}
        {/* Old routes kept alive so existing links do not 404. */}
        <Route path="/project" element={<Navigate to="/projects" replace />} />
        <Route path="/achivements" element={<Navigate to="/achievements" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <AnimatedRoutes />
            <Footer />
          </div>
        </BrowserRouter>
      </SmoothScroll>
    </MotionConfig>
  );
}

export default App;
