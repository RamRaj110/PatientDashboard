"use client";

import { useEffect, useState } from "react";
import { Search, ListFilter, X, ChevronDown, ArrowUpDown } from "lucide-react";
import type { PatientQueryParams } from "../types/patient";

type Props = {
  params: PatientQueryParams;
  onChange: (updated: Partial<PatientQueryParams>) => void;
};

export default function SearchAndFilters({ params, onChange }: Props) {
  const [localSearch, setLocalSearch] = useState(params.search || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange({ search: localSearch, page: 1 });
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearch]);

  const activeFilters = [
    ...(params.medical_issue
      ? [{ key: "medical_issue", label: params.medical_issue, value: "" }]
      : []),
    ...(params.sort_by
      ? [
          {
            key: "sort_by",
            label: `Sort: ${params.sort_by === "patient_name" ? "Name" : "Age"}`,
            value: "patient_name",
          },
        ]
      : []),
    ...(params.order
      ? [
          {
            key: "order",
            label: params.order === "asc" ? "Ascending" : "Descending",
            value: "asc",
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-2xl">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-blue-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-white  border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-100 text-gray-700 placeholder:text-gray-400"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <ListFilter className="h-4 w-4 text-blue-500 cursor-pointer" />
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-sm font-bold text-blue-600">Sort by:</span>

          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={params.sort_by || "patient_name"}
                onChange={(e) =>
                  onChange({ sort_by: e.target.value as any, page: 1 })
                }
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-xs font-medium text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="patient_name">option 1</option>
                <option value="age">option 2</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={params.order || "asc"}
                onChange={(e) =>
                  onChange({ order: e.target.value as any, page: 1 })
                }
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-xs font-medium text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="asc">option 1</option>
                <option value="desc">option 2</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      {/* <div className="flex flex-wrap gap-2">
        {["Option 1", "Option 2", "Option 3", "Option 4"].map((opt, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600"
          >
            {opt}
            <X className="h-3 w-3 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        ))}
      </div> */}
    </div>
  );
}
