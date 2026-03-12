import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";

type Contact = {
  address: string | null;
  number: string | null;
  email: string | null;
};
type Patient = {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string | null;
  contact: Contact[];
  medical_issue: string;
};

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "data", "MockData.json");
    const fileContents = readFileSync(filePath, "utf-8");
    let patients: Patient[] = JSON.parse(fileContents);

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const medical_issue = searchParams.get("medical_issue") || "";
    const sort_by = searchParams.get("sort_by") || "patient_name";
    const order = searchParams.get("order") || "asc";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    if (search) {
      patients = patients.filter((p) =>
        p.patient_name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (medical_issue) {
      patients = patients.filter(
        (p) => p.medical_issue.toLowerCase() === medical_issue.toLowerCase(),
      );
    }

    patients.sort((a, b) => {
      if (sort_by === "age") {
        return order === "asc" ? a.age - b.age : b.age - a.age;
      } else {
        return order === "asc"
          ? a.patient_name.localeCompare(b.patient_name)
          : b.patient_name.localeCompare(a.patient_name);
      }
    });
    const total = patients.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginated = patients.slice(offset, offset + limit);

    return NextResponse.json({
      data: paginated,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load patient data" },
      { status: 500 },
    );
  }
}
