import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { LandingPage } from "./app/LandingPage";
import { WebsiteGenerator } from "./app/WebsiteGenerator";
function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'generator'>('landing');

  const handleGetStarted = () => {
    setCurrentView('generator');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  return (
    <>
      <Toaster/>
       {currentView === 'landing' ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <WebsiteGenerator onBack={handleBackToLanding} />
      )}
    </>
  );
}

export default App;
