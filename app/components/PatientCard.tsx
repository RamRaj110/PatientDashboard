"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import type { Patient } from "../types/patient";

type Props = {
  patient: Patient;
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
      className={`text-[11px] font-bold px-2 py-0.5 rounded ${colorClass} uppercase tracking-tight inline-block mb-3`}
    >
      {issue}
    </span>
  );
}

export default function PatientCard({ patient }: Props) {
  const contact = patient.contact?.[0];
  const patientId = String(patient.patient_id).padStart(4, "0");

  return (
    <div className="bg-white rounded-[10px] shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-all duration-300">
      {/* Top Section: Avatar, Name, ID, Age */}
      <div className="bg-[#B5D1FE82] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {patient.photo_url ? (
            <img
              src={patient.photo_url}
              alt={patient.patient_name}
              className="w-10 h-10 rounded-full object-cover bg-white ring-2 ring-white shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shadow-sm">
              {patient.patient_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
          )}

          <div>
            <h3 className="font-bold text-gray-800 text-sm leading-tight">
              {patient.patient_name}
            </h3>
            <p className="text-[10px] font-semibold text-gray-500 uppercase">
              ID-{patientId}
            </p>
          </div>
        </div>

        <div className="bg-blue-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
          Age:{patient.age}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 pt-4">
        <IssueBadge issue={patient.medical_issue} />

        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5 text-xs text-gray-800">
            <MapPin size={14} className="text-gray-600 mt-0.5 shrink-0" />
            <span className="leading-snug truncate">
              {contact?.address || "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-gray-800 font-medium">
            <Phone size={14} className="text-gray-600 shrink-0" />
            <span className={!contact?.number ? "text-red-400" : ""}>
              {contact?.number || "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-gray-800 lowercase font-medium">
            <Mail size={14} className="text-gray-600 shrink-0" />
            <span
              className={`truncate ${!contact?.email ? "text-red-400" : ""}`}
            >
              {contact?.email || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
