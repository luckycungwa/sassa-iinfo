'use client';

import { useState } from "react";
import { downloadableForms, DownloadableForm } from "../lib/data/downloads";
import { Download, FileText, Printer, CheckCircle, Info, Landmark, HelpCircle, X } from "lucide-react";

export default function DownloadCentre() {
  const [selectedForm, setSelectedForm] = useState<DownloadableForm>(downloadableForms[0]);
  const [isSimulatedPrintOpen, setIsSimulatedPrintOpen] = useState(false);
  const [simulatedApplicantName, setSimulatedApplicantName] = useState("");
  const [simulatedIdNumber, setSimulatedIdNumber] = useState("");

  const handleOpenPrintSimulation = () => {
    setIsSimulatedPrintOpen(true);
  };

  const handlePrintDocument = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          <h2 className="font-bold text-xs font-mono tracking-wider text-muted px-1 uppercase">
            Available Documents
          </h2>
          {downloadableForms.map((form) => (
            <button
              key={form.id}
              onClick={() => setSelectedForm(form)}
              className={`w-full text-left p-4 rounded-xl border transition flex flex-col gap-1 ${
                selectedForm.id === form.id
                  ? "bg-accent border-ink text-black font-semibold"
                  : "bg-surface border-border hover:border-accent/40 text-ink hover:bg-canvas"
              }`}
            >
              <h3 className="text-sm font-bold leading-tight">{form.title}</h3>
              <p className={`text-xs font-mono ${selectedForm.id === form.id ? "text-black/70" : "text-accent-dark"}`}>
                {form.approxSize}
              </p>
            </button>
          ))}
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-8 bg-surface border border-border rounded-xl p-6 md:p-8  space-y-6">
          {/* Header */}
          <div className="border-b border-border pb-5 space-y-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <h1 className="text-xl md:text-2xl font-extrabold text-ink tracking-tight">
                {selectedForm.title}
              </h1>
              <p className="text-muted text-xs font-mono">Document reference: {selectedForm.pdfPlaceholderContent}</p>
            </div>
            <button
              onClick={handleOpenPrintSimulation}
              className="bg-accent hover:bg-accent-dark text-black font-bold px-4 py-2 rounded-xl transition text-xs flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> Open Dynamic Form
            </button>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-xs font-mono text-muted tracking-wider uppercase">Document Purpose</h3>
            <p className="text-muted text-sm leading-relaxed">
              {selectedForm.purpose}
            </p>
          </div>

          {/* How to fill */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-ink flex items-center gap-1.5">
              <CheckCircle className="w-4.5 h-4.5 text-accent-dark" />
              How to Complete This Document:
            </h3>
            <ul className="space-y-2.5 text-xs md:text-sm text-muted">
              {selectedForm.howToFill.map((step, idx) => (
                <li key={idx} className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-canvas border border-border text-ink text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed flex-1">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Attachments checklist */}
          <div className="bg-canvas rounded-xl p-5 border border-border space-y-3">
            <h3 className="font-bold text-sm text-ink flex items-center gap-1.5">
              <FileText className="w-4.5 h-4.5 text-accent-dark" />
              Accompanying Attachments Required:
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-muted">
              {selectedForm.documentChecklist.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-dark mt-2 flex-shrink-0"></span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Simulated Document Modal (Great for printing!) */}
      {isSimulatedPrintOpen && (
        <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-surface print:static print:z-0">
          <div className="bg-surface rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8  space-y-6 relative print:shadow-none print:max-h-full print:p-0">
            {/* Modal Controls (Hidden when printing!) */}
            <div className="flex justify-between items-center border-b border-border pb-4 print:hidden">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-accent-dark" />
                <h3 className="font-extrabold text-sm text-ink">Dynamic Form Simulator & Printer</h3>
              </div>
              <button
                onClick={() => setIsSimulatedPrintOpen(false)}
                className="p-1 hover:bg-canvas rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input Config Section (Hidden when printing!) */}
            <div className="p-4 bg-canvas rounded-xl border border-border space-y-3 print:hidden">
              <p className="text-xs text-muted font-bold">Personalize form fields before printing:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted uppercase font-mono">Full Name & Surname</label>
                  <input
                    type="text"
                    value={simulatedApplicantName}
                    onChange={(e) => setSimulatedApplicantName(e.target.value)}
                    placeholder="e.g. Sipho Nkosi"
                    className="w-full bg-surface border border-surface-container px-3 py-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-accent-dark"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted uppercase font-mono">13-Digit ID Number</label>
                  <input
                    type="text"
                    value={simulatedIdNumber}
                    onChange={(e) => setSimulatedIdNumber(e.target.value)}
                    placeholder="e.g. 8501015678089"
                    className="w-full bg-surface border border-surface-container px-3 py-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-accent-dark"
                  />
                </div>
              </div>
              <div className="pt-1 flex justify-end">
                <button
                  onClick={handlePrintDocument}
                  className="bg-accent hover:bg-accent-dark text-black px-4 py-2 rounded-xl transition text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print Document now
                </button>
              </div>
            </div>

            {/* Printable Form Template Layout */}
            <div className="border border-surface-container rounded-xl p-8 space-y-6 bg-surface  font-serif text-xs md:text-sm print:border-0 print:p-0 print:shadow-none">
              {/* Header */}
              <div className="text-center border-b-2 border-ink pb-4 space-y-1.5">
                <p className="text-sm font-bold uppercase tracking-wider">REPUBLIC OF SOUTH AFRICA</p>
                <p className="text-xs font-semibold uppercase text-muted">DEPARTMENT OF SOCIAL DEVELOPMENT</p>
                <h4 className="text-base font-extrabold uppercase mt-1 text-ink">{selectedForm.title}</h4>
                <p className="text-xs font-mono text-muted">REF: {selectedForm.pdfPlaceholderContent}</p>
              </div>

              {/* Applicant Info Section */}
              <div className="space-y-3">
                <p className="font-bold text-xs uppercase bg-surface-dim p-1.5 font-sans border border-surface-container">Section A: Applicant Declarations</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-b border-outline-variant pb-1 flex justify-between">
                    <span className="text-xs font-bold uppercase text-muted">Applicant Name:</span>
                    <span className="font-sans font-bold">{simulatedApplicantName || "____________________"}</span>
                  </div>
                  <div className="border-b border-outline-variant pb-1 flex justify-between">
                    <span className="text-xs font-bold uppercase text-muted">ID Number:</span>
                    <span className="font-sans font-bold">{simulatedIdNumber || "____________________"}</span>
                  </div>
                </div>
              </div>

              {/* Instructions Checkoffs */}
              <div className="space-y-2">
                <p className="font-bold text-xs uppercase bg-surface-dim p-1.5 font-sans border border-surface-container">Section B: Terms & Guidelines</p>
                <ul className="space-y-2 text-muted">
                  {selectedForm.howToFill.map((step, idx) => (
                    <li key={idx} className="flex gap-2.5">
                      <span className="font-bold font-sans">[{idx + 1}]</span>
                      <span className="leading-relaxed flex-1">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Signature Footer */}
              <div className="grid grid-cols-2 gap-8 pt-8 text-center font-sans text-xs">
                <div className="space-y-1">
                  <div className="border-b border-outline-variant h-10"></div>
                  <p className="font-semibold text-muted">Applicant Signature</p>
                  <p className="text-xs text-muted">Sign in front of Commissioner</p>
                </div>
                <div className="space-y-1">
                  <div className="border-b border-outline-variant h-10"></div>
                  <p className="font-semibold text-muted">SASSA Commissioner / Officer</p>
                  <p className="text-xs text-muted">Date and Stamp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
