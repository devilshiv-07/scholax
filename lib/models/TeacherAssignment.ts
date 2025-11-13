import mongoose, { Schema, Model, Document, Types } from 'mongoose';

export interface ITeacherAssignment extends Document {
  teacherId: Types.ObjectId;
  batch: string;
  section: string;
  subject: string;
  createdAt: Date;
  updatedAt: Date;
}

const TeacherAssignmentSchema = new Schema<ITeacherAssignment>(
  {
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: [true, 'Teacher ID is required'],
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
      maxlength: 1,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
TeacherAssignmentSchema.index({ teacherId: 1 });
TeacherAssignmentSchema.index({ batch: 1, section: 1 });
TeacherAssignmentSchema.index({ batch: 1, section: 1, subject: 1 });

// Compound unique index to prevent duplicate assignments
TeacherAssignmentSchema.index(
  { teacherId: 1, batch: 1, section: 1, subject: 1 },
  { unique: true }
);

const TeacherAssignment: Model<ITeacherAssignment> = 
  mongoose.models.TeacherAssignment || 
  mongoose.model<ITeacherAssignment>('TeacherAssignment', TeacherAssignmentSchema);

export default TeacherAssignment;

