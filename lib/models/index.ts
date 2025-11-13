// Export all models from a central location
export { default as User } from './User';
export { default as Student } from './Student';
export { default as Teacher } from './Teacher';
export { default as TeacherAssignment } from './TeacherAssignment';
export { default as Attendance } from './Attendance';

// Export types
export type { IUser, UserRole } from './User';
export type { IStudent } from './Student';
export type { ITeacher } from './Teacher';
export type { ITeacherAssignment } from './TeacherAssignment';
export type { IAttendance, AttendanceStatus } from './Attendance';

