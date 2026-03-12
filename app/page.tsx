"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { usePatients } from "./hooks/usePatient";
import PatientCard from "./components/PatientCard";
import PatientTable from "./components/PatientTable";
import SearchAndFilters from "./components/SearchAndFilters";
import Pagination from "./components/Pagination";
import type { PatientQueryParams } from "./types/patient";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Home() {
  const [view, setView] = useState<"card" | "table">("table");
  const [params, setParams] = useState<PatientQueryParams>({
    search: "",
    medical_issue: "",
    sort_by: "patient_name",
    order: "asc",
    page: 1,
    limit: 12,
  });

  const { patients, meta, loading, error } = usePatients(params);

  const handleParamChange = (updated: Partial<PatientQueryParams>) => {
    setParams((prev) => ({ ...prev, ...updated }));
  };

  const handleDownloadPDF = () => {
    if (patients.length === 0) return;

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.text("Patient Directory", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Total Patients: ${meta?.total || patients.length}`, 14, 30);
    doc.text(`Page: ${params.page}`, 14, 36);

    // Table
    const tableData = patients.map((p) => [
      `ID-${String(p.patient_id).padStart(4, "0")}`,
      p.patient_name,
      p.age.toString(),
      p.medical_issue,
      p.contact?.[0]?.address || "N/A",
      p.contact?.[0]?.number || "N/A",
      p.contact?.[0]?.email || "N/A"
    ]);

    autoTable(doc, {
      startY: 45,
      head: [["ID", "Name", "Age", "Medical Issue", "Address", "Phone", "Email"]],
      body: tableData,
      headStyles: { fillColor: [59, 130, 246] }, // #3b82f6
      theme: 'striped',
    });

    doc.save(`patient-directory-page-${params.page}.pdf`);
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6]">
      {/* Blue Header with Pattern */}
      <div className="relative bg-[#3b82f6] px-10 py-10 overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="plus-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20 10v20M10 20h20"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#plus-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Patient Directory
          </h1>
          <p className="text-blue-100 text-sm mt-1 font-medium italic">
            {meta?.total || 1000} Patient Found
          </p>
        </div>
      </div>

      <div className=" mx-auto px-4 md:px-10 mt-0  min-h-[calc(100vh-160px)]  ">
        {/* Navigation Tabs */}
        <div className="flex items-center md:flex-row flex-col justify-between border-b border-gray-100 px-2 pt-6 mb-6 gap-4 md:gap-0">
          <div className="flex gap-8">
            <button
              onClick={() => setView("table")}
              className={`pb-3 text-sm font-bold transition-all duration-200 border-b-2 ${
                view === "table"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-400 border-transparent hover:text-gray-600"
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setView("card")}
              className={`pb-3 text-sm font-bold transition-all duration-200 border-b-2 ${
                view === "card"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-400 border-transparent hover:text-gray-600"
              }`}
            >
              Card View
            </button>
          </div>
          {/* <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold uppercase tracking-wider bg-gray-50 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Active Filters: 4
          </div> */}
        </div>

        {/* Search & Filters */}
        <div className="mb-6">
          <SearchAndFilters params={params} onChange={handleParamChange} />
        </div>

        {/* PDF Download Button */}
        <div className="flex justify-end mb-6">
          <button 
            onClick={handleDownloadPDF}
            disabled={loading || patients.length === 0}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            PDF <Download size={14} className="text-blue-500" />
          </button>
        </div>

        {/* Grid/Table Container */}
        <div className="min-h-[400px]">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[20px] border border-gray-100 p-5 h-64 animate-pulse shadow-sm"
                />
              ))}
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-20 text-red-400">
              <p className="text-lg">⚠️ {error}</p>
            </div>
          )}

          {!loading && !error && patients.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-lg font-medium">No patients found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}

          {!loading &&
            !error &&
            patients.length > 0 &&
            (view === "card" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {patients.map((patient) => (
                  <PatientCard key={patient.patient_id} patient={patient} />
                ))}
              </div>
            ) : (
              <PatientTable patients={patients} />
            ))}
        </div>

        {/* Pagination */}
        {!loading && !error && meta && (
          <Pagination
            meta={meta}
            onPageChange={(page) => handleParamChange({ page })}
          />
        )}
      </div>
    </main>
  );
}
