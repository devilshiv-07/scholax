import mongoose, { Schema, Model, Document, Types } from 'mongoose';

export type AttendanceStatus = 'present' | 'absent';

export interface IAttendance extends Document {
  studentId: Types.ObjectId;
  teacherId: Types.ObjectId;
  subject: string;
  date: Date;
  status: AttendanceStatus;
  batch: string;
  section: string;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student ID is required'],
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: [true, 'Teacher ID is required'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    status: {
      type: String,
      enum: ['present', 'absent'],
      required: [true, 'Status is required'],
    },
    batch: {
      type: String,
      required: [true, 'Batch is required'],
      trim: true,
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
      uppercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
AttendanceSchema.index({ studentId: 1 });
AttendanceSchema.index({ teacherId: 1 });
AttendanceSchema.index({ date: -1 });
AttendanceSchema.index({ batch: 1, section: 1, subject: 1 });
AttendanceSchema.index({ studentId: 1, subject: 1 });

// Compound unique index to prevent duplicate attendance records
// A student can only have one attendance record per subject per date
AttendanceSchema.index(
  { studentId: 1, subject: 1, date: 1 },
  { unique: true }
);

// Index for date range queries
AttendanceSchema.index({ studentId: 1, date: -1 });
AttendanceSchema.index({ batch: 1, section: 1, subject: 1, date: -1 });

const Attendance: Model<IAttendance> = 
  mongoose.models.Attendance || 
  mongoose.model<IAttendance>('Attendance', AttendanceSchema);

export default Attendance;

