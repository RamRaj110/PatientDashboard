# Patient Dashboard

A modern, high-performance patient management dashboard built with Next.js and Tailwind CSS. This application allows healthcare providers to efficiently view, search, and export patient records through an intuitive, dual-view interface.

## ✨ Features

-   **Dual View System**: Toggle between a **Card View** (optimized for visual scanning) and a **Table View** (optimized for data-heavy management).
-   **Dynamic Search & Filtering**: Real-time debounced search by patient name and filtering by medical conditions.
-   **Advanced Sorting**: Sort patients by name or age in ascending/descending order.
-   **PDF Export**: Generate and download professional PDF reports of the current patient list using `jspdf-autotable`.
-   **Responsive Design**: Fully responsive layout that adapts from mobile devices to high-resolution desktops.
-   **Modern UI/UX**: Premium aesthetic featuring a custom-patterned header, smooth transitions, and a curated color palette for medical statuses.

## 🛠 Tech Stack

-   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
-   **Library**: [React 19](https://reactjs.org/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) & [jsPDF-AutoTable](https://github.com/simonbengtsson/jspdf-autotable)
-   **Package Manager**: [pnpm](https://pnpm.io/)

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   pnpm installed globally (`npm install -g pnpm`)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/RamRaj110/PatientDashboard.git
    cd patientdashboard
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Run the development server**:
    ```bash
    pnpm dev
    ```

4.  **Open the application**:
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

-   `app/page.tsx`: Main dashboard container and state management.
-   `app/components/`:
    -   `PatientCard.tsx`: Individual patient profile card.
    -   `PatientTable.tsx`: Structured data list view.
    -   `SearchAndFilters.tsx`: Unified search and sort interface.
    -   `Pagination.tsx`: Numbered navigation system.
-   `app/hooks/`: Custom hooks for data fetching and state.
-   `app/types/`: TypeScript definitions for patient data.

## 📄 License

This project is private and for internal use only.

