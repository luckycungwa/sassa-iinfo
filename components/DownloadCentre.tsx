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
          <h2 className="font-bold text-xs font-mono tracking-wider text-slate-400 px-1 uppercase">
            Available Documents
          </h2>
          {downloadableForms.map((form) => (
            <button
              key={form.id}
              onClick={() => setSelectedForm(form)}
              className={`w-full text-left p-4 rounded-xl border transition flex flex-col gap-1 ${
                selectedForm.id === form.id
                  ? "bg-emerald-800 border-emerald-950 text-white shadow-md font-semibold"
                  : "bg-white border-slate-100 hover:border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <h3 className="text-sm font-bold leading-tight">{form.title}</h3>
              <p className={`text-[10px] font-mono ${selectedForm.id === form.id ? "text-amber-300" : "text-emerald-800"}`}>
                {form.approxSize}
              </p>
            </button>
          ))}
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          {/* Header */}
          <div className="border-b border-slate-100 pb-5 space-y-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                {selectedForm.title}
              </h1>
              <p className="text-slate-500 text-xs font-mono">Document reference: {selectedForm.pdfPlaceholderContent}</p>
            </div>
            <button
              onClick={handleOpenPrintSimulation}
              className="bg-emerald-800 hover:bg-emerald-950 text-white font-bold px-4 py-2 rounded-xl transition text-xs flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> Open Dynamic Form
            </button>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-xs font-mono text-slate-400 tracking-wider uppercase">Document Purpose</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {selectedForm.purpose}
            </p>
          </div>

          {/* How to fill */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-800" />
              How to Complete This Document:
            </h3>
            <ul className="space-y-2.5 text-xs md:text-sm text-slate-600">
              {selectedForm.howToFill.map((step, idx) => (
                <li key={idx} className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed flex-1">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Attachments checklist */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-3">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <FileText className="w-4.5 h-4.5 text-amber-500" />
              Accompanying Attachments Required:
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-slate-600">
              {selectedForm.documentChecklist.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Simulated Document Modal (Great for printing!) */}
      {isSimulatedPrintOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:static print:z-0">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6 relative print:shadow-none print:max-h-full print:p-0">
            {/* Modal Controls (Hidden when printing!) */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 print:hidden">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-800" />
                <h3 className="font-extrabold text-sm text-slate-800">Dynamic Form Simulator & Printer</h3>
              </div>
              <button
                onClick={() => setIsSimulatedPrintOpen(false)}
                className="p-1 hover:bg-slate-50 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input Config Section (Hidden when printing!) */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3 print:hidden">
              <p className="text-xs text-slate-500 font-bold">Personalize form fields before printing:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Full Name & Surname</label>
                  <input
                    type="text"
                    value={simulatedApplicantName}
                    onChange={(e) => setSimulatedApplicantName(e.target.value)}
                    placeholder="e.g. Sipho Nkosi"
                    className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">13-Digit ID Number</label>
                  <input
                    type="text"
                    value={simulatedIdNumber}
                    onChange={(e) => setSimulatedIdNumber(e.target.value)}
                    placeholder="e.g. 8501015678089"
                    className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-800"
                  />
                </div>
              </div>
              <div className="pt-1 flex justify-end">
                <button
                  onClick={handlePrintDocument}
                  className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded-xl transition text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print Document now
                </button>
              </div>
            </div>

            {/* Printable Form Template Layout */}
            <div className="border border-slate-200 rounded-xl p-8 space-y-6 bg-white shadow-xs font-serif text-xs md:text-sm print:border-0 print:p-0 print:shadow-none">
              {/* Header */}
              <div className="text-center border-b-2 border-slate-800 pb-4 space-y-1.5">
                <p className="text-sm font-bold uppercase tracking-wider">REPUBLIC OF SOUTH AFRICA</p>
                <p className="text-xs font-semibold uppercase text-slate-600">DEPARTMENT OF SOCIAL DEVELOPMENT</p>
                <h4 className="text-base font-extrabold uppercase mt-1 text-slate-900">{selectedForm.title}</h4>
                <p className="text-[10px] font-mono text-slate-500">REF: {selectedForm.pdfPlaceholderContent}</p>
              </div>

              {/* Applicant Info Section */}
              <div className="space-y-3">
                <p className="font-bold text-xs uppercase bg-slate-100 p-1.5 font-sans border border-slate-200">Section A: Applicant Declarations</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-b border-slate-300 pb-1 flex justify-between">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Applicant Name:</span>
                    <span className="font-sans font-bold">{simulatedApplicantName || "____________________"}</span>
                  </div>
                  <div className="border-b border-slate-300 pb-1 flex justify-between">
                    <span className="text-[10px] font-bold uppercase text-slate-500">ID Number:</span>
                    <span className="font-sans font-bold">{simulatedIdNumber || "____________________"}</span>
                  </div>
                </div>
              </div>

              {/* Instructions Checkoffs */}
              <div className="space-y-2">
                <p className="font-bold text-xs uppercase bg-slate-100 p-1.5 font-sans border border-slate-200">Section B: Terms & Guidelines</p>
                <ul className="space-y-2 text-slate-600">
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
                  <div className="border-b border-slate-300 h-10"></div>
                  <p className="font-semibold text-slate-500">Applicant Signature</p>
                  <p className="text-[10px] text-slate-400">Sign in front of Commissioner</p>
                </div>
                <div className="space-y-1">
                  <div className="border-b border-slate-300 h-10"></div>
                  <p className="font-semibold text-slate-500">SASSA Commissioner / Officer</p>
                  <p className="text-[10px] text-slate-400">Date and Stamp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
