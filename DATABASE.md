# Database Schema Documentation

## Overview

The ScholaX database uses MongoDB with Mongoose ODM. All schemas include timestamps (createdAt, updatedAt) and are properly indexed for optimal query performance.

## Models

### 1. User Model (`lib/models/User.ts`)

Stores authentication and role information for all users.

**Fields:**
- `email` (String, unique, required) - User's email address
- `role` (String, enum) - User role: 'admin', 'teacher', or 'student'
- `otp` (String, optional) - One-time password for authentication
- `otpExpiry` (Date, optional) - OTP expiration timestamp
- `isVerified` (Boolean, default: false) - Whether user has verified their email

**Indexes:**
- `email` (unique)
- `otpExpiry`

**Validation:**
- Email must be valid format
- Students must use @iiitranchi.ac.in email (checked at registration)

**Methods:**
- `clearOTP()` - Removes OTP and expiry after verification

---

### 2. Student Model (`lib/models/Student.ts`)

Stores student-specific information.

**Fields:**
- `userId` (ObjectId, ref: User, required) - Reference to User document
- `name` (String, required) - Student's full name
- `registrationNo` (String, unique, required) - Unique registration number
- `branch` (String, required) - Branch (e.g., CSE, ECE, IT)
- `batch` (String, required) - Batch year (e.g., "2024")
- `section` (String, required) - Section (single character, e.g., "A")
- `email` (String, required) - Student email (must end with @iiitranchi.ac.in)

**Indexes:**
- `userId`
- `registrationNo` (unique)
- `batch, section` (compound)
- `branch`
- `email`
- `batch, section, branch` (compound for filtering)

**Validation:**
- Email must end with @iiitranchi.ac.in
- Section is single character, uppercase
- Registration number is uppercase

---

### 3. Teacher Model (`lib/models/Teacher.ts`)

Stores teacher-specific information.

**Fields:**
- `userId` (ObjectId, ref: User, required) - Reference to User document
- `name` (String, required) - Teacher's full name
- `email` (String, required) - Teacher's email address

**Indexes:**
- `userId`
- `email`

---

### 4. TeacherAssignment Model (`lib/models/TeacherAssignment.ts`)

Maps teachers to their assigned sections and subjects.

**Fields:**
- `teacherId` (ObjectId, ref: Teacher, required) - Reference to Teacher document
- `batch` (String, required) - Batch year (e.g., "2024")
- `section` (String, required) - Section (single character)
- `subject` (String, required) - Subject name (e.g., "Mathematics")

**Indexes:**
- `teacherId`
- `batch, section` (compound)
- `batch, section, subject` (compound)
- `teacherId, batch, section, subject` (compound unique) - Prevents duplicate assignments

**Validation:**
- Section is single character, uppercase
- Unique constraint prevents assigning same teacher to same section/subject combination

---

### 5. Attendance Model (`lib/models/Attendance.ts`)

Records daily attendance for students.

**Fields:**
- `studentId` (ObjectId, ref: Student, required) - Reference to Student document
- `teacherId` (ObjectId, ref: Teacher, required) - Reference to Teacher who marked attendance
- `subject` (String, required) - Subject name
- `date` (Date, required) - Date of attendance
- `status` (String, enum, required) - 'present' or 'absent'
- `batch` (String, required) - Batch for denormalization
- `section` (String, required) - Section for denormalization

**Indexes:**
- `studentId`
- `teacherId`
- `date` (descending)
- `batch, section, subject` (compound)
- `studentId, subject` (compound)
- `studentId, subject, date` (compound unique) - Prevents duplicate attendance records
- `studentId, date` (descending) - For date range queries
- `batch, section, subject, date` (descending)

**Validation:**
- Status must be 'present' or 'absent'
- Unique constraint: one attendance record per student per subject per date
- Section is uppercase

---

## Relationships

```
User (1) ──→ (1) Student
User (1) ──→ (1) Teacher

Teacher (1) ──→ (many) TeacherAssignment
Teacher (1) ──→ (many) Attendance

Student (1) ──→ (many) Attendance

TeacherAssignment links:
- Teacher → Batch + Section + Subject
```

## Database Connection

**File:** `lib/db/connection.ts`

- Uses connection caching to prevent multiple connections in development
- Automatically reconnects on failure
- Environment variable: `MONGODB_URI`

**Usage:**
```typescript
import connectDB from '@/lib/db/connection';

await connectDB();
```

## Testing Database Connection

Visit the test endpoint after setting up your `.env.local`:

```
http://localhost:3000/api/test-db
```

This will return:
- Connection status
- Collection counts
- Model status

## Environment Variables Required

```env
MONGODB_URI=mongodb://localhost:27017/scholax
```

## Sample Data Structure

### User
```json
{
  "_id": "...",
  "email": "2024001@iiitranchi.ac.in",
  "role": "student",
  "isVerified": true,
  "createdAt": "2024-11-10T10:00:00.000Z",
  "updatedAt": "2024-11-10T10:05:00.000Z"
}
```

### Student
```json
{
  "_id": "...",
  "userId": "...",
  "name": "Amit Kumar",
  "registrationNo": "2024001",
  "branch": "CSE",
  "batch": "2024",
  "section": "A",
  "email": "2024001@iiitranchi.ac.in",
  "createdAt": "2024-11-10T10:00:00.000Z",
  "updatedAt": "2024-11-10T10:00:00.000Z"
}
```

### Teacher
```json
{
  "_id": "...",
  "userId": "...",
  "name": "Dr. Rajesh Kumar",
  "email": "rajesh@example.com",
  "createdAt": "2024-11-10T10:00:00.000Z",
  "updatedAt": "2024-11-10T10:00:00.000Z"
}
```

### TeacherAssignment
```json
{
  "_id": "...",
  "teacherId": "...",
  "batch": "2024",
  "section": "A",
  "subject": "Mathematics",
  "createdAt": "2024-11-10T10:00:00.000Z",
  "updatedAt": "2024-11-10T10:00:00.000Z"
}
```

### Attendance
```json
{
  "_id": "...",
  "studentId": "...",
  "teacherId": "...",
  "subject": "Mathematics",
  "date": "2024-11-10T00:00:00.000Z",
  "status": "present",
  "batch": "2024",
  "section": "A",
  "createdAt": "2024-11-10T15:30:00.000Z",
  "updatedAt": "2024-11-10T15:30:00.000Z"
}
```

## Common Queries

### Get students by batch and section
```typescript
const students = await Student.find({ batch: "2024", section: "A" });
```

### Get teacher's assignments
```typescript
const assignments = await TeacherAssignment.find({ teacherId })
  .populate('teacherId');
```

### Get student attendance for a subject
```typescript
const attendance = await Attendance.find({ 
  studentId, 
  subject: "Mathematics" 
}).sort({ date: -1 });
```

### Calculate attendance percentage
```typescript
const totalClasses = await Attendance.countDocuments({ 
  studentId, 
  subject 
});

const presentClasses = await Attendance.countDocuments({ 
  studentId, 
  subject, 
  status: 'present' 
});

const percentage = (presentClasses / totalClasses) * 100;
```

### Get attendance for a specific date
```typescript
const attendance = await Attendance.find({
  batch: "2024",
  section: "A",
  subject: "Mathematics",
  date: new Date("2024-11-10")
}).populate('studentId');
```

## Performance Considerations

1. **Indexes**: All frequently queried fields are indexed
2. **Compound Indexes**: Queries filtering by multiple fields use compound indexes
3. **Unique Constraints**: Prevent duplicate data at database level
4. **Connection Caching**: Single connection reused across requests
5. **Denormalization**: Batch and section stored in Attendance for faster queries

## Migration Notes

If you need to migrate existing data:

1. Create a User document for each person
2. Create Student/Teacher documents referencing the User
3. Import TeacherAssignments
4. Import historical Attendance records

## Backup Recommendations

```bash
# Backup
mongodump --uri="mongodb://localhost:27017/scholax" --out=/backup/path

# Restore
mongorestore --uri="mongodb://localhost:27017/scholax" /backup/path/scholax
```

