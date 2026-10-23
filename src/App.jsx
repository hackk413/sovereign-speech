import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DailyChallengeCard from './components/DailyChallengeCard';
import ATSResumeChecker from './components/ATSResumeChecker';
import PowerLawsModule from './components/PowerLawsModule';
import InterviewMastery from './components/InterviewMastery';
import PowerFrameSparring from './components/PowerFrameSparring';
import RichMindsetSimulator from './components/RichMindsetSimulator';
import FrameRewriter from './components/FrameRewriter';
import DarkPsychologyDefense from './components/DarkPsychologyDefense';
import ClassicalBooksReader from './components/ClassicalBooksReader';
import FlashcardsSRS from './components/FlashcardsSRS';
import FeaturesCatalog from './components/FeaturesCatalog';
import DeploymentGuideModal from './components/DeploymentGuideModal';

import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { useGamification } from './hooks/useGamification';

export default function App() {
  const [activeTab, setActiveTab] = useState('daily');
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);

  const speechRecognition = useSpeechRecognition();
  const speechSynthesis = useSpeechSynthesis();
  const gamification = useGamification();

  const handleSelectPractice = (item) => {
    // When a law or drill is selected from another tab, switch to Daily or Sparring to practice
    setActiveTab('daily');
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col font-sans selection:bg-gold-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        xp={gamification.xp}
        streak={gamification.streak}
        currentRank={gamification.currentRank}
        progressPercent={gamification.progressPercent}
        onOpenDeploy={() => setShowDeployModal(true)}
        onOpenFeatures={() => setShowFeaturesModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'daily' && (
          <div className="space-y-8">
            <DailyChallengeCard
              speechRecognition={speechRecognition}
              speechSynthesis={speechSynthesis}
              gamification={gamification}
            />
          </div>
        )}

        {activeTab === 'ats' && (
          <ATSResumeChecker
            gamification={gamification}
          />
        )}

        {activeTab === 'power' && (
          <PowerLawsModule
            speechSynthesis={speechSynthesis}
            onSelectPractice={handleSelectPractice}
          />
        )}

        {activeTab === 'interview' && (
          <InterviewMastery
            speechSynthesis={speechSynthesis}
            onSelectPractice={handleSelectPractice}
          />
        )}

        {activeTab === 'sparring' && (
          <PowerFrameSparring
            speechRecognition={speechRecognition}
            speechSynthesis={speechSynthesis}
            gamification={gamification}
          />
        )}

        {activeTab === 'rich' && (
          <RichMindsetSimulator
            speechSynthesis={speechSynthesis}
            gamification={gamification}
          />
        )}

        {activeTab === 'rewriter' && (
          <FrameRewriter
            speechSynthesis={speechSynthesis}
            gamification={gamification}
          />
        )}

        {activeTab === 'dark' && (
          <DarkPsychologyDefense
            speechSynthesis={speechSynthesis}
            gamification={gamification}
          />
        )}

        {activeTab === 'books' && (
          <ClassicalBooksReader
            speechSynthesis={speechSynthesis}
            gamification={gamification}
          />
        )}

        {activeTab === 'vocab' && (
          <FlashcardsSRS
            speechSynthesis={speechSynthesis}
            gamification={gamification}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-obsidian-900/60 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-extrabold text-slate-300">SOVEREIGN SPEECH</span>
            <span>•</span>
            <span>Autonomous Spoken English & Persuasion Operating System</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setShowFeaturesModal(true)} className="hover:text-gold-400 transition">
              20 Built-in Features
            </button>
            <button onClick={() => setShowDeployModal(true)} className="hover:text-gold-400 transition">
              Free Fast Deployment Guide
            </button>
            <span>v2.4.0 Self-Updating</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showFeaturesModal && (
        <FeaturesCatalog onClose={() => setShowFeaturesModal(false)} />
      )}

      {showDeployModal && (
        <DeploymentGuideModal onClose={() => setShowDeployModal(false)} />
      )}
    </div>
  );
}
