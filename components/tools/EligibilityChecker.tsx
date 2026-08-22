'use client';

import { useState } from "react";
import { ArrowRight, RefreshCw } from "lucide-react";

export default function EligibilityChecker() {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    age: 30, isUnemployed: true, monthlyIncome: 0, hasDisability: false, childrenCount: 0, receivesOtherGrants: false
  });

  const handleResetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({ age: 30, isUnemployed: true, monthlyIncome: 0, hasDisability: false, childrenCount: 0, receivesOtherGrants: false });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-extrabold text-ink tracking-tight">Interactive Grant Eligibility Checker</h2>
        <p className="text-muted-foreground text-xs">Verify your life parameters to find matches.</p>
      </div>

      {quizStep === 0 && (
        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-ink">1. What is your current age?</label>
            <input type="number" min="1" max="120" value={quizAnswers.age}
              onChange={(e) => setQuizAnswers({ ...quizAnswers, age: parseInt(e.target.value) || 0 })}
              className="w-full max-w-xs border border-surface-container rounded-xl px-4 py-3 bg-canvas focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent-dark transition" />
          </div>
          <button onClick={() => setQuizStep(1)} className="bg-gold hover:bg-gold-dark text-midnight font-bold px-5 py-3 rounded-sassa transition text-sm flex items-center gap-1.5">
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {quizStep === 1 && (
        <div className="space-y-5 py-2">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-ink">2. Are you currently unemployed with zero formal income?</label>
            <div className="flex gap-3">
              <button onClick={() => setQuizAnswers({ ...quizAnswers, isUnemployed: true })}
                className={`px-6 py-3 rounded-sassa font-bold border transition text-sm ${quizAnswers.isUnemployed ? "bg-gold/20 border-gold text-midnight" : "bg-surface border-border"}`}>
                Yes, completely unemployed
              </button>
              <button onClick={() => setQuizAnswers({ ...quizAnswers, isUnemployed: false })}
                className={`px-6 py-3 rounded-sassa font-bold border transition text-sm ${!quizAnswers.isUnemployed ? "bg-gold/20 border-gold text-midnight" : "bg-surface border-border"}`}>
                No, I have formal earnings
              </button>
            </div>
          </div>
          {!quizAnswers.isUnemployed && (
            <div className="space-y-2 animate-fadeIn">
              <label className="block text-xs font-bold text-muted-foreground">What is your monthly personal income (ZAR)?</label>
              <input type="number" value={quizAnswers.monthlyIncome}
                onChange={(e) => setQuizAnswers({ ...quizAnswers, monthlyIncome: parseInt(e.target.value) || 0 })}
                className="w-full max-w-xs border border-surface-container rounded-xl px-4 py-3 bg-canvas focus:bg-surface focus:outline-none" />
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={() => setQuizStep(0)} className="border border-surface-container px-4 py-3 rounded-xl text-sm font-bold">Back</button>
            <button onClick={() => setQuizStep(2)} className="bg-gold hover:bg-gold-dark text-black font-bold px-5 py-3 rounded-xl text-sm flex items-center gap-1.5">Continue <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      {quizStep === 2 && (
        <div className="space-y-5 py-2">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-ink">3. Do you have a severe physical or mental disability?</label>
            <div className="flex gap-3">
              <button onClick={() => setQuizAnswers({ ...quizAnswers, hasDisability: true })}
                className={`px-6 py-3 rounded-xl font-bold border transition text-sm ${quizAnswers.hasDisability ? "bg-accent-light border-accent-light/50 text-accent-dark" : "bg-surface border-surface-container"}`}>Yes</button>
              <button onClick={() => setQuizAnswers({ ...quizAnswers, hasDisability: false })}
                className={`px-6 py-3 rounded-xl font-bold border transition text-sm ${!quizAnswers.hasDisability ? "bg-accent-light border-accent-light/50 text-accent-dark" : "bg-surface border-surface-container"}`}>No</button>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setQuizStep(1)} className="border border-surface-container px-4 py-3 rounded-xl text-sm font-bold">Back</button>
            <button onClick={() => setQuizStep(3)} className="bg-gold hover:bg-gold-dark text-black font-bold px-5 py-3 rounded-xl text-sm flex items-center gap-1.5">Continue <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      {quizStep === 3 && (
        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-ink">4. How many dependent children (under 18) do you actively care for?</label>
            <input type="number" min="0" max="10" value={quizAnswers.childrenCount}
              onChange={(e) => setQuizAnswers({ ...quizAnswers, childrenCount: parseInt(e.target.value) || 0 })}
              className="w-full max-w-xs border border-surface-container rounded-xl px-4 py-3 bg-canvas focus:bg-surface focus:outline-none" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setQuizStep(2)} className="border border-surface-container px-4 py-3 rounded-xl text-sm font-bold">Back</button>
            <button onClick={() => setQuizStep(4)} className="bg-gold hover:bg-gold-dark text-black font-bold px-5 py-3 rounded-xl text-sm flex items-center gap-1.5 font-mono">Calculate Results</button>
          </div>
        </div>
      )}

      {quizStep === 4 && (
        <div className="space-y-5 py-2">
          <div className="p-4 bg-accent-light border border-accent-light/40 rounded-xl">
            <h3 className="font-bold text-ink text-base">Vetting Result:</h3>
            <p className="text-xs text-accent-dark mt-0.5">Based on your input, here are your potential SASSA qualifiers:</p>
            <div className="mt-4 space-y-3">
              {quizAnswers.age >= 60 && (
                <div className="p-3 bg-surface border border-accent-light/40 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-extrabold text-sm text-ink">Older Person Grant (State Pension)</p>
                    <p className="text-xs text-muted-foreground">Qualifies based on age (60+)</p>
                  </div>
                  <span className="text-xs font-extrabold text-accent-dark bg-accent-light px-2 py-1 rounded">R2,400/mo</span>
                </div>
              )}
              {quizAnswers.hasDisability && quizAnswers.age >= 18 && quizAnswers.age < 60 && (
                <div className="p-3 bg-surface border border-accent-light/40 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-extrabold text-sm text-ink">Disability Grant</p>
                    <p className="text-xs text-muted-foreground">Requires clinical evaluation vetting</p>
                  </div>
                  <span className="text-xs font-extrabold text-accent-dark bg-accent-light px-2 py-1 rounded">R2,400/mo</span>
                </div>
              )}
              {quizAnswers.childrenCount > 0 && (
                <div className="p-3 bg-surface border border-accent-light/40 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-extrabold text-sm text-ink">Child Support Grant</p>
                    <p className="text-xs text-muted-foreground">Claimable for {quizAnswers.childrenCount} children</p>
                  </div>
                  <span className="text-xs font-extrabold text-accent-dark bg-accent-light px-2 py-1 rounded">R530/mo each</span>
                </div>
              )}
              {quizAnswers.isUnemployed && quizAnswers.age >= 18 && quizAnswers.age < 60 && !quizAnswers.hasDisability && (
                <div className="p-3 bg-surface border border-accent-light/40 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-extrabold text-sm text-ink">Social Relief of Distress (SRD) Grant</p>
                    <p className="text-xs text-muted-foreground">Unemployed age 18-59</p>
                  </div>
                  <span className="text-xs font-extrabold text-accent-dark bg-accent-light px-2 py-1 rounded">R370/mo</span>
                </div>
              )}
              {quizAnswers.monthlyIncome > 8000 && (
                <div className="p-3 bg-trading-down/10 border border-trading-down/30 rounded-xl text-xs text-trading-down">
                  Warning: Your personal income of R{quizAnswers.monthlyIncome} exceeds most SASSA means test limits.
                </div>
              )}
            </div>
          </div>
          <button onClick={handleResetQuiz} className="bg-surface-dim hover:bg-surface-container text-ink font-bold px-4 py-2.5 rounded-xl transition text-xs flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5" /> Restart Vetting Checker
          </button>
        </div>
      )}
    </div>
  );
}
