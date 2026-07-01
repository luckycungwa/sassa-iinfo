'use client';

import { useState } from "react";
import { Sliders, Calendar, Calculator, Clock, CheckSquare, BarChart, FileText, AlertTriangle, ArrowRight, RefreshCw, HelpCircle, Table } from "lucide-react";
import { grants } from "../lib/data/grants";

type ToolType =
  | "eligibility-checker"
  | "payment-lookup"
  | "age-calculator"
  | "child-support-calculator"
  | "appeal-deadline"
  | "amount-estimator"
  | "checklist-generator"
  | "grant-comparison";

export default function InteractiveTools() {
  const [activeTool, setActiveTool] = useState<ToolType>("eligibility-checker");

  // Tool 1: Eligibility Checker State
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    age: 30,
    isUnemployed: true,
    monthlyIncome: 0,
    hasDisability: false,
    childrenCount: 0,
    receivesOtherGrants: false
  });

  // Tool 2: Payment Lookup State
  const [selectedGrant, setSelectedGrant] = useState("older-person");
  const [selectedMonth, setSelectedMonth] = useState("july-2026");

  // Tool 3: Age Eligibility State
  const [dob, setDob] = useState("");
  const [ageResult, setAgeResult] = useState<any>(null);

  // Tool 4: Child Support Expiry State
  const [childDob, setChildDob] = useState("");
  const [childResult, setChildResult] = useState<any>(null);

  // Tool 5: Appeal Deadline State
  const [declineDate, setDeclineDate] = useState("");
  const [appealResult, setAppealResult] = useState<any>(null);

  // Tool 6: Amount Estimator State
  const [estimatorCounts, setEstimatorCounts] = useState<{ [key: string]: number }>({
    "older-person": 0,
    "child-support": 0,
    "disability": 0,
    "foster-care": 0,
    "srd-grant": 0
  });

  // Tool 7: Document Checklist State
  const [checklistGrant, setChecklistGrant] = useState("older-person");

  // Reset Eligibility Checker
  const handleResetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({
      age: 30,
      isUnemployed: true,
      monthlyIncome: 0,
      hasDisability: false,
      childrenCount: 0,
      receivesOtherGrants: false
    });
  };

  // Age Calculator handler
  const handleCalculateAge = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date("2026-06-29"); // Grounded current year
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    let qualifiedGrants = [];
    if (age >= 60) {
      qualifiedGrants.push({ name: "Older Person Grant (Pension)", desc: "Aged 60 or older." });
    }
    if (age < 18) {
      qualifiedGrants.push({ name: "Child Support Grant", desc: "Aged under 18 (caregiver must apply)." });
      qualifiedGrants.push({ name: "Foster Care Grant", desc: "If placed legally under foster care." });
    }
    if (age >= 18 && age < 60) {
      qualifiedGrants.push({ name: "Social Relief of Distress (SRD R370)", desc: "Unemployed aged 18-59." });
      qualifiedGrants.push({ name: "Disability Grant", desc: "Aged 18-59 with a qualifying physical or mental condition." });
    }

    setAgeResult({ age, qualifiedGrants });
  };

  // Child support expiry handler
  const handleCalculateChildSupport = () => {
    if (!childDob) return;
    const birthDate = new Date(childDob);
    const today = new Date("2026-06-29");
    const expiryDate = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());

    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      setChildResult({ expired: true, age: 18, daysLeft: 0 });
    } else {
      const yearsLeft = Math.floor(diffDays / 365);
      const monthsLeft = Math.floor((diffDays % 365) / 30);
      setChildResult({
        expired: false,
        age: today.getFullYear() - birthDate.getFullYear(),
        yearsLeft,
        monthsLeft,
        daysLeft: diffDays,
        expiryDateString: expiryDate.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })
      });
    }
  };

  // Appeal deadline handler
  const handleCalculateAppeal = () => {
    if (!declineDate) return;
    const decDate = new Date(declineDate);
    const today = new Date("2026-06-29");

    const diffTime = today.getTime() - decDate.getTime();
    const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const daysRemaining = 90 - daysElapsed;

    let level: "safe" | "warning" | "critical" | "expired" = "safe";
    if (daysRemaining <= 0) level = "expired";
    else if (daysRemaining <= 10) level = "critical";
    else if (daysRemaining <= 30) level = "warning";

    setAppealResult({ daysElapsed, daysRemaining, level });
  };

  return (
    <div className="space-y-6">
      {/* Horizontal Nav Bar */}
      <div className="flex gap-2 pb-2 border-b border-border overflow-x-auto scrollbar-none whitespace-nowrap">
        {[
          { id: "eligibility-checker", label: "Eligibility Checker", icon: Sliders },
          { id: "payment-lookup", label: "Pay Day Lookup", icon: Calendar },
          { id: "age-calculator", label: "Age Vetting", icon: Calculator },
          { id: "child-support-calculator", label: "Child Grant Expiry", icon: Clock },
          { id: "appeal-deadline", label: "Appeal Timer", icon: Clock },
          { id: "amount-estimator", label: "Household Estimator", icon: BarChart },
          { id: "checklist-generator", label: "Checklist Gen", icon: FileText },
          { id: "grant-comparison", label: "Comparison Matrix", icon: Table }
        ].map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as ToolType)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTool === tool.id
                  ? "bg-accent text-white"
                  : "bg-surface text-slate-600 hover:bg-canvas border border-border"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Container */}
      <div className="bg-surface border border-border rounded-xl p-6 md:p-8">
        {/* TOOL 1: Eligibility Checker */}
        {activeTool === "eligibility-checker" && (
          <div className="space-y-6">
            <div className="border-b border-border pb-4">
              <h2 className="text-lg font-extrabold text-ink tracking-tight">Interactive Grant Eligibility Checker</h2>
              <p className="text-muted text-xs">Verify your life parameters to find matches.</p>
            </div>

            {quizStep === 0 && (
              <div className="space-y-5 py-2">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">1. What is your current age?</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={quizAnswers.age}
                    onChange={(e) => setQuizAnswers({ ...quizAnswers, age: parseInt(e.target.value) || 0 })}
                    className="w-full max-w-xs border border-slate-200 rounded-xl px-4 py-3 bg-canvas focus:bg-surface focus:outline-none focus:ring-2 focus:ring-emerald-800 transition"
                  />
                </div>
                <button
                  onClick={() => setQuizStep(1)}
                  className="bg-gold hover:bg-gold-dark text-midnight font-bold px-5 py-3 rounded-sassa transition text-sm flex items-center gap-1.5"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {quizStep === 1 && (
              <div className="space-y-5 py-2">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-800">2. Are you currently unemployed with zero formal income?</label>
                  <div className="flex gap-3">
                  <button
                    onClick={() => setQuizAnswers({ ...quizAnswers, isUnemployed: true })}
                    className={`px-6 py-3 rounded-sassa font-bold border transition text-sm ${
                      quizAnswers.isUnemployed ? "bg-gold/20 border-gold text-midnight" : "bg-surface border-border"
                    }`}
                  >
                    Yes, completely unemployed
                  </button>
                  <button
                    onClick={() => setQuizAnswers({ ...quizAnswers, isUnemployed: false })}
                    className={`px-6 py-3 rounded-sassa font-bold border transition text-sm ${
                      !quizAnswers.isUnemployed ? "bg-gold/20 border-gold text-midnight" : "bg-surface border-border"
                    }`}
                  >
                    No, I have formal earnings
                  </button>

                  </div>
                </div>

                {!quizAnswers.isUnemployed && (
                  <div className="space-y-2 animate-fadeIn">
                    <label className="block text-xs font-bold text-muted">What is your monthly personal income (ZAR)?</label>
                    <input
                      type="number"
                      value={quizAnswers.monthlyIncome}
                      onChange={(e) => setQuizAnswers({ ...quizAnswers, monthlyIncome: parseInt(e.target.value) || 0 })}
                      className="w-full max-w-xs border border-slate-200 rounded-xl px-4 py-3 bg-canvas focus:bg-surface focus:outline-none"
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  <button onClick={() => setQuizStep(0)} className="border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold">Back</button>
                  <button onClick={() => setQuizStep(2)} className="bg-accent hover:bg-accent-dark text-white font-bold px-5 py-3 rounded-xl text-sm flex items-center gap-1.5">Continue <ArrowRight className="w-4 h-4" /></button>
                </div>
              </div>
            )}

            {quizStep === 2 && (
              <div className="space-y-5 py-2">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-800">3. Do you have a severe physical or mental disability?</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setQuizAnswers({ ...quizAnswers, hasDisability: true })}
                      className={`px-6 py-3 rounded-xl font-bold border transition text-sm ${
                        quizAnswers.hasDisability ? "bg-accent-light border-emerald-500 text-accent-dark" : "bg-surface border-slate-200"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setQuizAnswers({ ...quizAnswers, hasDisability: false })}
                      className={`px-6 py-3 rounded-xl font-bold border transition text-sm ${
                        !quizAnswers.hasDisability ? "bg-accent-light border-emerald-500 text-accent-dark" : "bg-surface border-slate-200"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setQuizStep(1)} className="border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold">Back</button>
                  <button onClick={() => setQuizStep(3)} className="bg-accent hover:bg-accent-dark text-white font-bold px-5 py-3 rounded-xl text-sm flex items-center gap-1.5">Continue <ArrowRight className="w-4 h-4" /></button>
                </div>
              </div>
            )}

            {quizStep === 3 && (
              <div className="space-y-5 py-2">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">4. How many dependent children (under 18) do you actively care for?</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={quizAnswers.childrenCount}
                    onChange={(e) => setQuizAnswers({ ...quizAnswers, childrenCount: parseInt(e.target.value) || 0 })}
                    className="w-full max-w-xs border border-slate-200 rounded-xl px-4 py-3 bg-canvas focus:bg-surface focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setQuizStep(2)} className="border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold">Back</button>
                  <button onClick={() => setQuizStep(4)} className="bg-accent hover:bg-accent-dark text-white font-bold px-5 py-3 rounded-xl text-sm flex items-center gap-1.5 font-mono">Calculate Results</button>
                </div>
              </div>
            )}

            {quizStep === 4 && (
              <div className="space-y-5 py-2">
                <div className="p-4 bg-accent-light border border-emerald-100 rounded-xl">
                  <h3 className="font-bold text-emerald-950 text-base">Vetting Result:</h3>
                  <p className="text-xs text-accent-dark mt-0.5">Based on your input, here are your potential SASSA qualifiers:</p>

                  <div className="mt-4 space-y-3">
                    {quizAnswers.age >= 60 && (
                      <div className="p-3 bg-surface border border-emerald-100 rounded-xl flex justify-between items-center ">
                        <div>
                          <p className="font-extrabold text-sm text-slate-800">Older Person Grant (State Pension)</p>
                          <p className="text-[11px] text-muted">Qualifies based on age (60+)</p>
                        </div>
                        <span className="text-xs font-extrabold text-accent-dark bg-accent-light px-2 py-1 rounded">R2,180/mo</span>
                      </div>
                    )}

                    {quizAnswers.hasDisability && quizAnswers.age >= 18 && quizAnswers.age < 60 && (
                      <div className="p-3 bg-surface border border-emerald-100 rounded-xl flex justify-between items-center ">
                        <div>
                          <p className="font-extrabold text-sm text-slate-800">Disability Grant</p>
                          <p className="text-[11px] text-muted">Requires clinical evaluation vetting</p>
                        </div>
                        <span className="text-xs font-extrabold text-accent-dark bg-accent-light px-2 py-1 rounded">R2,180/mo</span>
                      </div>
                    )}

                    {quizAnswers.childrenCount > 0 && (
                      <div className="p-3 bg-surface border border-emerald-100 rounded-xl flex justify-between items-center ">
                        <div>
                          <p className="font-extrabold text-sm text-slate-800">Child Support Grant</p>
                          <p className="text-[11px] text-muted">Claimable for {quizAnswers.childrenCount} children</p>
                        </div>
                        <span className="text-xs font-extrabold text-accent-dark bg-accent-light px-2 py-1 rounded">R530/mo each</span>
                      </div>
                    )}

                    {quizAnswers.isUnemployed && quizAnswers.age >= 18 && quizAnswers.age < 60 && !quizAnswers.hasDisability && (
                      <div className="p-3 bg-surface border border-emerald-100 rounded-xl flex justify-between items-center ">
                        <div>
                          <p className="font-extrabold text-sm text-slate-800">Social Relief of Distress (SRD) Grant</p>
                          <p className="text-[11px] text-muted">Unemployed age 18-59</p>
                        </div>
                        <span className="text-xs font-extrabold text-accent-dark bg-accent-light px-2 py-1 rounded">R370/mo</span>
                      </div>
                    )}

                    {quizAnswers.monthlyIncome > 8000 && (
                      <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-800">
                        Warning: Your personal income of R{quizAnswers.monthlyIncome} exceeds most SASSA means test limits. You are highly unlikely to qualify for social security support.
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleResetQuiz}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl transition text-xs flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Restart Vetting Checker
                </button>
              </div>
            )}
          </div>
        )}

        {/* TOOL 2: Payment Lookup */}
        {activeTool === "payment-lookup" && (
          <div className="space-y-6">
            <div className="border-b border-border pb-4">
              <h2 className="text-lg font-extrabold text-ink tracking-tight">Payment Date Lookup</h2>
              <p className="text-muted text-xs">Instantly look up when a specific grant will clear.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-muted">Select Grant Type</label>
                <select
                  value={selectedGrant}
                  onChange={(e) => setSelectedGrant(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 bg-canvas"
                >
                  <option value="older-person">Older Persons Pension</option>
                  <option value="disability">Disability Grant</option>
                  <option value="child-support">Children Support Grants</option>
                  <option value="srd">SRD R370</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-muted">Select Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 bg-canvas"
                >
                  <option value="july-2026">July 2026</option>
                  <option value="august-2026">August 2026</option>
                </select>
              </div>
            </div>

            <div className="p-5 bg-accent-light border border-emerald-100 rounded-xl text-center">
              <p className="text-xs text-accent-dark font-mono uppercase tracking-wider">Scheduled Payment Date</p>
              <h3 className="text-2xl font-extrabold text-emerald-950 mt-1">
                {selectedGrant === "older-person" && selectedMonth === "july-2026" && "3 July 2026"}
                {selectedGrant === "older-person" && selectedMonth === "august-2026" && "4 August 2026"}
                {selectedGrant === "disability" && selectedMonth === "july-2026" && "4 July 2026"}
                {selectedGrant === "disability" && selectedMonth === "august-2026" && "5 August 2026"}
                {selectedGrant === "child-support" && selectedMonth === "july-2026" && "5 July 2026"}
                {selectedGrant === "child-support" && selectedMonth === "august-2026" && "6 August 2026"}
                {selectedGrant === "srd" && selectedMonth === "july-2026" && "25 - 30 July 2026"}
                {selectedGrant === "srd" && selectedMonth === "august-2026" && "25 - 31 August 2026"}
              </h3>
              <p className="text-muted text-xs mt-2">
                Funds are released electronically on this date. Retailer cash collection is available immediately.
              </p>
            </div>
          </div>
        )}

        {/* TOOL 3: Age Eligibility */}
        {activeTool === "age-calculator" && (
          <div className="space-y-5">
            <div className="border-b border-border pb-4">
              <h2 className="text-lg font-extrabold text-ink tracking-tight">Age Eligibility Vetting</h2>
              <p className="text-muted text-xs">Verify what grants match based strictly on birth year limits.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-muted">Enter Your Date of Birth</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="border border-slate-200 rounded-xl px-4 py-2.5 bg-canvas text-sm focus:outline-none"
                />
                <button
                  onClick={handleCalculateAge}
                  className="bg-accent hover:bg-accent-dark text-white font-bold px-4 py-2.5 rounded-xl text-xs transition"
                >
                  Verify Age limits
                </button>
              </div>
            </div>

            {ageResult && (
              <div className="p-4 bg-canvas rounded-xl border border-border space-y-3 animate-fadeIn">
                <p className="text-sm font-bold text-slate-800">
                  Calculated Age: <span className="text-accent-dark">{ageResult.age} years old</span>
                </p>

                {ageResult.qualifiedGrants.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs text-muted font-bold uppercase tracking-wider">Matching Age Portals:</p>
                    {ageResult.qualifiedGrants.map((g: any, idx: number) => (
                      <div key={idx} className="p-3 bg-surface rounded-xl border border-border text-xs ">
                        <p className="font-bold text-slate-800">{g.name}</p>
                        <p className="text-muted mt-0.5">{g.desc}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted">No explicit age limits matched.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* TOOL 4: Child Support Expiry */}
        {activeTool === "child-support-calculator" && (
          <div className="space-y-5">
            <div className="border-b border-border pb-4">
              <h2 className="text-lg font-extrabold text-ink tracking-tight">Child Support Expiry Calculator</h2>
              <p className="text-muted text-xs">Calculate exactly how many pay cycles remain before a child turns 18.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-muted">Enter Child&apos;s Date of Birth</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={childDob}
                  onChange={(e) => setChildDob(e.target.value)}
                  className="border border-slate-200 rounded-xl px-4 py-2.5 bg-canvas text-sm focus:outline-none"
                />
                <button
                  onClick={handleCalculateChildSupport}
                  className="bg-accent hover:bg-accent-dark text-white font-bold px-4 py-2.5 rounded-xl text-xs transition"
                >
                  Calculate Expiry
                </button>
              </div>
            </div>

            {childResult && (
              <div className="p-4 bg-canvas rounded-xl border border-border space-y-3 animate-fadeIn">
                {childResult.expired ? (
                  <div className="text-xs text-red-800 bg-red-50 border border-red-100 p-3 rounded-xl flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>
                      This child has reached or exceeded 18 years of age. Under South African law, the Child Support Grant has expired and payouts have terminated.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-700">
                      Current Child Age: <span className="text-accent-dark">{childResult.age} years old</span>
                    </p>
                    <div className="p-4 bg-accent-light border border-emerald-100 rounded-xl text-center">
                      <p className="text-[10px] text-accent-dark font-mono uppercase">Payout cycles remaining</p>
                      <p className="text-2xl font-extrabold text-emerald-950 mt-1">
                        {childResult.yearsLeft} years, {childResult.monthsLeft} months
                      </p>
                      <p className="text-[11px] text-muted mt-1">
                        Expected Expiry: {childResult.expiryDateString} (Turns 18)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TOOL 5: Appeal Deadline */}
        {activeTool === "appeal-deadline" && (
          <div className="space-y-5">
            <div className="border-b border-border pb-4">
              <h2 className="text-lg font-extrabold text-ink tracking-tight">ITSAA Appeal Deadline Calculator</h2>
              <p className="text-muted text-xs">Verify how many days remain of the strict 90-day tribunal limit.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-muted">Date You Received SASSA Decline Notification</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={declineDate}
                  onChange={(e) => setDeclineDate(e.target.value)}
                  className="border border-slate-200 rounded-xl px-4 py-2.5 bg-canvas text-sm focus:outline-none"
                />
                <button
                  onClick={handleCalculateAppeal}
                  className="bg-accent hover:bg-accent-dark text-white font-bold px-4 py-2.5 rounded-xl text-xs transition"
                >
                  Check Deadline
                </button>
              </div>
            </div>

            {appealResult && (
              <div className="p-4 bg-canvas rounded-xl border border-border space-y-3 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-surface p-3 border border-border rounded-lg">
                    <p className="text-[10px] text-muted font-mono uppercase">Days Elapsed</p>
                    <p className="text-lg font-bold text-slate-700">{appealResult.daysElapsed} days</p>
                  </div>

                  <div className="bg-surface p-3 border border-border rounded-lg">
                    <p className="text-[10px] text-muted font-mono uppercase">Days Remaining</p>
                    <p className="text-lg font-bold text-slate-700">{Math.max(0, appealResult.daysRemaining)} days</p>
                  </div>
                </div>

                {appealResult.level === "expired" && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-800 text-xs">
                    The strict 90-day appeal timeline has expired. You can no longer appeal this decision without seeking rare administrative condonation. We advise submitting a brand new application.
                  </div>
                )}

                {appealResult.level === "critical" && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-800 text-xs font-bold animate-pulse">
                    CRITICAL WARNING: Less than 10 days remain to lodge your appeal. Please submit your appeal on the srd.dsd.gov.za portal immediately.
                  </div>
                )}

                {appealResult.level === "warning" && (
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-xs">
                    Warning: Less than 30 days remain. Please gather your documents and file your appeal soon.
                  </div>
                )}

                {appealResult.level === "safe" && (
                  <div className="p-3 bg-accent-light border border-emerald-100 rounded-xl text-accent-dark text-xs">
                    You are well within the safe window to lodge your appeal.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TOOL 6: Amount Estimator */}
        {activeTool === "amount-estimator" && (
          <div className="space-y-5">
            <div className="border-b border-border pb-4">
              <h2 className="text-lg font-extrabold text-ink tracking-tight">Household Grant Amount Estimator</h2>
              <p className="text-muted text-xs">Estimate the total monthly payout for all social grants in your home.</p>
            </div>

            <div className="space-y-4">
              {[
                { id: "older-person", label: "Older Persons Pension (R2,180)", rate: 2180 },
                { id: "disability", label: "Disability Grant (R2,180)", rate: 2180 },
                { id: "child-support", label: "Child Support Grant (R530)", rate: 530 },
                { id: "foster-care", label: "Foster Care Grant (R1,180)", rate: 1180 },
                { id: "srd-grant", label: "SRD R370 Grant (R370)", rate: 370 }
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3.5 bg-canvas border border-border rounded-xl">
                  <span className="text-xs md:text-sm font-bold text-slate-700">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEstimatorCounts({
                        ...estimatorCounts,
                        [item.id]: Math.max(0, estimatorCounts[item.id] - 1)
                      })}
                      className="w-8 h-8 rounded-lg bg-surface border border-slate-200 font-bold hover:bg-slate-100 transition text-sm flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-slate-800">{estimatorCounts[item.id]}</span>
                    <button
                      onClick={() => setEstimatorCounts({
                        ...estimatorCounts,
                        [item.id]: estimatorCounts[item.id] + 1
                      })}
                      className="w-8 h-8 rounded-lg bg-surface border border-slate-200 font-bold hover:bg-slate-100 transition text-sm flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-accent-dark text-white rounded-xl text-center">
              <p className="text-xs text-emerald-300 font-mono uppercase">Estimated Total Monthly Payout</p>
              <h3 className="text-3xl font-extrabold text-amber-400 mt-1">
                R
                {(
                  estimatorCounts["older-person"] * 2180 +
                  estimatorCounts["disability"] * 2180 +
                  estimatorCounts["child-support"] * 530 +
                  estimatorCounts["foster-care"] * 1180 +
                  estimatorCounts["srd-grant"] * 370
                ).toLocaleString("en-ZA")}
              </h3>
              <p className="text-emerald-100 text-[10px] mt-1.5 leading-relaxed">
                This is a local estimation. Actual approved amounts depend strictly on formal SASSA assessment and means testing.
              </p>
            </div>
          </div>
        )}

        {/* TOOL 7: Checklist Generator */}
        {activeTool === "checklist-generator" && (
          <div className="space-y-5">
            <div className="border-b border-border pb-4">
              <h2 className="text-lg font-extrabold text-ink tracking-tight">Document Checklist Generator</h2>
              <p className="text-muted text-xs">Generate a personalized checklist of documents to bring to your SASSA interview.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-muted">Select Grant Type</label>
              <select
                value={checklistGrant}
                onChange={(e) => setChecklistGrant(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 bg-canvas text-sm focus:outline-none"
              >
                <option value="older-person">Older Person Grant (Pension)</option>
                <option value="child-support">Child Support Grant</option>
                <option value="disability">Disability Grant</option>
              </select>
            </div>

            <div className="p-5 bg-canvas border border-border rounded-xl space-y-3">
              <p className="font-bold text-xs font-mono uppercase tracking-wider text-muted flex items-center gap-1">
                <CheckSquare className="w-4 h-4 text-accent-dark" /> Required Vetting Documents:
              </p>

              <div className="space-y-2">
                {checklistGrant === "older-person" && (
                  <>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                      <input type="checkbox" className="mt-1 flex-shrink-0" />
                      <span>Original 13-digit smart ID card or green ID booklet.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                      <input type="checkbox" className="mt-1 flex-shrink-0" />
                      <span>Proof of marital status (marriage certificate or death certificate if widowed).</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                      <input type="checkbox" className="mt-1 flex-shrink-0" />
                      <span>Last 3 months certified bank statements.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                      <input type="checkbox" className="mt-1 flex-shrink-0" />
                      <span>Proof of residence (municipal bill or chief letter).</span>
                    </div>
                  </>
                )}

                {checklistGrant === "child-support" && (
                  <>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                      <input type="checkbox" className="mt-1 flex-shrink-0" />
                      <span>Caregiver&apos;s original ID document.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                      <input type="checkbox" className="mt-1 flex-shrink-0" />
                      <span>Child&apos;s certified birth certificate with 13-digit ID.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                      <input type="checkbox" className="mt-1 flex-shrink-0" />
                      <span>Road to Health Card / Clinic card (if child is under 5).</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                      <input type="checkbox" className="mt-1 flex-shrink-0" />
                      <span>Official school report or school verification letter.</span>
                    </div>
                  </>
                )}

                {checklistGrant === "disability" && (
                  <>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                      <input type="checkbox" className="mt-1 flex-shrink-0" />
                      <span>Applicant&apos;s original ID document.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                      <input type="checkbox" className="mt-1 flex-shrink-0" />
                      <span>SASSA Medical Assessment Report (completed by state doctor).</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                      <input type="checkbox" className="mt-1 flex-shrink-0" />
                      <span>Certified proof of income or unemployment affidavit.</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TOOL 8: Grant Comparison Tool */}
        {activeTool === "grant-comparison" && (
          <div className="space-y-5">
            <div className="border-b border-border pb-4">
              <h2 className="text-lg font-extrabold text-ink tracking-tight">Grant Comparison Matrix</h2>
              <p className="text-muted text-xs">Compare all official grants side-by-side.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 min-w-[500px]">
                <thead className="bg-canvas text-slate-600 font-bold font-mono">
                  <tr>
                    <th className="p-3">Grant Type</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Target Age</th>
                    <th className="p-3">Means Test Limit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-semibold">Older Person</td>
                    <td className="p-3 font-mono font-bold text-accent-dark">R2,180</td>
                    <td className="p-3">60+ years</td>
                    <td className="p-3">Under R96,240/yr (Single)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Disability Grant</td>
                    <td className="p-3 font-mono font-bold text-accent-dark">R2,180</td>
                    <td className="p-3">18-59 years</td>
                    <td className="p-3">Under R96,240/yr (Single)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Child Support</td>
                    <td className="p-3 font-mono font-bold text-accent-dark">R530</td>
                    <td className="p-3">0-17 years</td>
                    <td className="p-3">Under R63,600/yr (Single)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Foster Care</td>
                    <td className="p-3 font-mono font-bold text-accent-dark">R1,180</td>
                    <td className="p-3">0-17 years</td>
                    <td className="p-3">No limits (Court Vetted)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">SRD Grant</td>
                    <td className="p-3 font-mono font-bold text-accent-dark">R370</td>
                    <td className="p-3">18-59 years</td>
                    <td className="p-3">Under R624 monthly deposit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
