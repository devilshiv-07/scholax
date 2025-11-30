import mongoose, { Schema, Model, Document, Types } from 'mongoose';

export interface IStudent extends Document {
  userId: Types.ObjectId;
  name: string;
  registrationNo: string;
  branch: string;
  batch: string;
  section: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
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
    registrationNo: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
      uppercase: true,
      trim: true,
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
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: function(v: string) {
          // Format: firstname.regno@iiitranchi.ac.in
          return /^[a-z]+\.[a-z0-9]+@iiitranchi\.ac\.in$/.test(v);
        },
        message: 'Student email must be in format: firstname.regno@iiitranchi.ac.in'
      }
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
// Note: registrationNo already has unique: true which creates an index automatically
StudentSchema.index({ userId: 1 });
StudentSchema.index({ batch: 1, section: 1 });
StudentSchema.index({ branch: 1 });
StudentSchema.index({ email: 1 });

// Compound index for efficient filtering
StudentSchema.index({ batch: 1, section: 1, branch: 1 });

const Student: Model<IStudent> = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);

export default Student;

