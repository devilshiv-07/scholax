// User and Authentication Types
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  otp?: string;
  otpExpiry?: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Student Types
export interface Student {
  id: string;
  userId: string;
  name: string;
  registrationNo: string;
  branch: string;
  batch: string;
  section: string;
  email: string;
}

export interface StudentCSVRow {
  name: string;
  registrationNo: string;
  branch: string;
}

// Teacher Types
export interface Teacher {
  id: string;
  userId: string;
  name: string;
  email: string;
}

export interface TeacherAssignment {
  id: string;
  teacherId: string;
  batch: string;
  section: string;
  subject: string;
}

// Attendance Types
export type AttendanceStatus = 'present' | 'absent';

export interface Attendance {
  id: string;
  studentId: string;
  teacherId: string;
  subject: string;
  date: Date;
  status: AttendanceStatus;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  status: AttendanceStatus;
}

export interface SubjectAttendance {
  subject: string;
  present: number;
  total: number;
  percentage: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

