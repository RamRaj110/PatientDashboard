"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  Patient,
  PaginationMeta,
  PatientQueryParams,
} from "../types/patient";

export function usePatients(params: PatientQueryParams) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Build the query string from params
      const query = new URLSearchParams();
      if (params.search) query.set("search", params.search);
      if (params.medical_issue)
        query.set("medical_issue", params.medical_issue);
      if (params.sort_by) query.set("sort_by", params.sort_by);
      if (params.order) query.set("order", params.order);
      if (params.page) query.set("page", String(params.page));
      if (params.limit) query.set("limit", String(params.limit));

      const res = await fetch(`/api/patients?${query.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch patients");

      const json = await res.json();
      setPatients(json.data);
      setMeta(json.meta);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [
    params.search,
    params.medical_issue,
    params.sort_by,
    params.order,
    params.page,
    params.limit,
  ]);

  // Re-fetch whenever params change
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return { patients, meta, loading, error };
}
