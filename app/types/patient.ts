export type Contact = {
  address: string | null;
  number: string | null;
  email: string | null;
};

export type Patient = {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string | null;
  contact: Contact[];
  medical_issue: string;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PatientsApiResponse = {
  data: Patient[];
  meta: PaginationMeta;
};

export type PatientQueryParams = {
  search?: string;
  medical_issue?: string;
  sort_by?: "patient_name" | "age";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
};
