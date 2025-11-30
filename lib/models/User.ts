import mongoose, { Schema, Model, Document } from 'mongoose';

export type UserRole = 'admin' | 'teacher' | 'student';

export interface IUser extends Document {
  email: string;
  role: UserRole;
  otp?: string;
  otpExpiry?: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function(v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Invalid email format'
      }
    },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student'],
      required: [true, 'Role is required'],
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
// Note: email already has unique: true which creates an index automatically
UserSchema.index({ otpExpiry: 1 });

// Delete OTP after verification or expiry
UserSchema.methods.clearOTP = function() {
  this.otp = undefined;
  this.otpExpiry = undefined;
  return this.save();
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

