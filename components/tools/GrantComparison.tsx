export default function GrantComparison() {
  return (
    <div className="space-y-5">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-extrabold text-ink tracking-tight">Grant Comparison Matrix</h2>
        <p className="text-muted-foreground text-xs">Compare all official grants side-by-side.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-ink">
          <thead className="bg-canvas text-muted-foreground font-bold font-mono">
            <tr>
              <th scope="col" className="p-3">Grant Type</th>
              <th scope="col" className="p-3">Amount</th>
              <th scope="col" className="p-3">Target Age</th>
              <th scope="col" className="p-3">Means Test Limit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-dim">
            <tr>
              <td className="p-3 font-semibold">Older Person</td>
              <td className="p-3 font-mono font-bold text-accent-dark">R2,400</td>
              <td className="p-3">60+ years</td>
              <td className="p-3">Under R112,200/yr (Single)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Disability Grant</td>
              <td className="p-3 font-mono font-bold text-accent-dark">R2,400</td>
              <td className="p-3">18-59 years</td>
              <td className="p-3">Under R112,200/yr (Single)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Child Support</td>
              <td className="p-3 font-mono font-bold text-accent-dark">R580</td>
              <td className="p-3">0-17 years</td>
              <td className="p-3">Under R69,600/yr (Single)</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Foster Care</td>
              <td className="p-3 font-mono font-bold text-accent-dark">R1,295</td>
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
  );
}
