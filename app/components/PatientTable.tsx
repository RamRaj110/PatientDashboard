"use client";

import { ChevronRight } from "lucide-react";
import type { Patient } from "../types/patient";

type Props = {
  patients: Patient[];
};

function IssueBadge({ issue }: { issue: string }) {
  const colors: Record<string, string> = {
    fever: "bg-[#DC262666] text-black ",
    headache: "bg-[#F57C0B80] text-black",
    rash: "bg-[#EC489980] text-black",
    "sore throat": "bg-[#EAB30880] text-black",
    sinusitis: "bg-[#4A4A4A66] text-black",
    "ear infection": "bg-[#06B6D480] text-black",
    "sprained ankle": "bg-[#10B98180] text-black",
  };

  const colorClass = colors[issue.toLowerCase()] || "bg-blue-100 text-blue-600";

  return (
    <span
      className={`text-[10px] font-bold px-2.5 py-1 rounded ${colorClass} uppercase tracking-tight`}
    >
      {issue}
    </span>
  );
}

export default function PatientTable({ patients }: Props) {
  console.log(patients);
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[#3b82f6] text-[11px] font-bold uppercase tracking-wider border-b border-[#949494]">
            <th className="py-4 px-4 font-bold">ID</th>
            <th className="py-4 px-4 font-bold">Name</th>
            <th className="py-4 px-4 font-bold text-center">Age</th>
            <th className="py-4 px-4 font-bold text-center">Medical Issue</th>
            <th className="py-4 px-4 font-bold">Address</th>
            <th className="py-4 px-4 font-bold">Phone Number</th>
            <th className="py-4 px-4 font-bold">Email ID</th>
            <th className="py-4 px-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {patients.map((patient) => {
            const contact = patient.contact?.[0];
            const patientId = `ID-${String(patient.patient_id).padStart(4, "0")}`;

            return (
              <tr
                key={patient.patient_id}
                className="group hover:bg-blue-50/30  border-b border-[#949494] cursor-pointer"
              >
                <td className="py-4 px-4 text-[12px] font-medium text-gray-700">
                  {patientId}
                </td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-3">
                    {patient.photo_url ? (
                      <img
                        src={patient.photo_url}
                        alt={patient.patient_name}
                        className="w-10 h-10 rounded-full object-cover bg-gray-100"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[10px]">
                        {patient.patient_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                    )}
                    <span className="text-[12px] font-bold text-gray-800">
                      {patient.patient_name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-[12px] font-medium text-gray-800 text-center">
                  {patient.age}
                </td>
                <td className="py-4 px-4 text-center max-w-[150px] truncate">
                  <IssueBadge issue={patient.medical_issue} />
                </td>
                <td className="py-4 px-4 text-[12px] font-medium text-gray-800 max-w-[150px] truncate">
                  {contact?.address || (
                    <span className="text-red-400">N/A</span>
                  )}
                </td>
                <td className="py-4 px-4 text-[12px] font-medium text-gray-800">
                  {contact?.number || <span className="text-red-400">N/A</span>}
                </td>
                <td className="py-4 px-4 text-[12px] font-medium text-gray-800 max-w-[150px] truncate lowercase">
                  {contact?.email || <span className="text-red-400">N/A</span>}
                </td>
                <td className="py-4 px-4 text-right">
                  <ChevronRight
                    size={16}
                    className="text-gray-600 group-hover:text-blue-500 transition-colors inline-block"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
