import { useState } from 'react';
import { Navbar, type SectionId } from '@/components/Navbar';
import { OverviewSection } from '@/sections/OverviewSection';
import { PredictionSection } from '@/sections/PredictionSection';
import { PerformanceSection } from '@/sections/PerformanceSection';
import { AboutSection } from '@/sections/AboutSection';

function App() {
  const [section, setSection] = useState<SectionId>('overview');

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <Navbar active={section} onNavigate={setSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {section === 'overview' && <OverviewSection />}
        {section === 'predict' && <PredictionSection />}
        {section === 'performance' && <PerformanceSection />}
        {section === 'about' && <AboutSection />}
      </main>
      <footer className="border-t border-navy-700/30 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <p className="text-xs text-navy-400 text-center">
            FraudShield — Credit Card Fraud Detection · Educational portfolio project ·
            Validation metrics shown, not production results
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
