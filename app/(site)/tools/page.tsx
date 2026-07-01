import type { Metadata } from "next";
import InteractiveTools from "../../../components/InteractiveTools";

export const metadata: Metadata = {
  title: "SASSA Interactive Tools | Grant Checker, Payment Lookup & Calculators",
  description: "Free SASSA interactive tools: Grant Eligibility Checker, Payment Date Lookup, Age Calculator, Appeal Deadline Timer, Document Checklist Generator, and more. All run in your browser.",
};

export default function ToolsPage() {
  return <InteractiveTools />;
}
