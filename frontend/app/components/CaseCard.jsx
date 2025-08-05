export default function CaseCard({ case: caseData }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{caseData.name}</h3>
      <p className="text-gray-600">${caseData.price}</p>
    </div>
  );
}
