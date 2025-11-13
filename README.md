# ScholaX - College Management System

A modern college management system built with Next.js, MongoDB, and TypeScript featuring role-based access control for administrators, teachers, and students.

## Features

### Admin

- Import students via CSV upload
- Add and manage teachers
- Assign teachers to specific sections and subjects
- View all students with filtering options

### Teacher

- View assigned sections and subjects
- Mark daily attendance for students
- Track attendance with green (Present) and red (Absent) buttons
- Select date for attendance marking

### Student

- View attendance percentage per subject
- Overall attendance tracking
- Detailed attendance history
- Color-coded attendance status

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS (custom pink/purple/white theme)
- **Database**: MongoDB with Mongoose
- **Authentication**: OTP-based via email (Nodemailer + Gmail SMTP)
- **Email**: Nodemailer

## Design Theme

- **Primary Color**: Purple (#9333ea)
- **Secondary Color**: Pink (#ec4899)
- **Background**: White with light purple/pink gradients
- **Attendance UI**: Green buttons for Present, Red buttons for Absent

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB instance running
- Gmail account for OTP emails (with app-specific password)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd scholax
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:

   - Set your MongoDB connection string
   - Add Gmail credentials for OTP emails
   - Set JWT secret

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
scholax/
├── app/
│   ├── admin/           # Admin pages
│   ├── teacher/         # Teacher pages
│   ├── student/         # Student pages
│   ├── login/           # Login page
│   ├── verify-otp/      # OTP verification
│   └── api/             # API routes (to be implemented)
├── components/
│   ├── ui/              # Reusable UI components
│   └── layouts/         # Layout components
├── types/               # TypeScript type definitions
└── lib/                 # Utilities and helpers (to be implemented)
```

## CSV Import Format

When importing students, your CSV file should contain:

```csv
Name,Registration No.,Branch
John Doe,2024001,CSE
Jane Smith,2024002,ECE
```

Batch and Section are assigned through the UI and apply to all students in the CSV.

## Authentication

1. Users enter their email address
2. OTP is sent to their email (students must use @iiitranchi.ac.in)
3. After verification, users are redirected based on their role

## Next Steps (Backend Implementation)

The frontend is complete. To make the application fully functional:

1. Set up MongoDB connection and models
2. Implement authentication APIs
3. Create admin APIs (CSV parsing, teacher management)
4. Create teacher APIs (attendance marking)
5. Create student APIs (attendance retrieval)
6. Connect frontend to backend APIs
7. Add error handling and validation
8. Test complete user flows

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
