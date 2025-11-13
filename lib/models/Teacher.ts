import mongoose, { Schema, Model, Document, Types } from 'mongoose';

export interface ITeacher extends Document {
  userId: Types.ObjectId;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const TeacherSchema = new Schema<ITeacher>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
TeacherSchema.index({ userId: 1 });
TeacherSchema.index({ email: 1 });

const Teacher: Model<ITeacher> = mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);

export default Teacher;

