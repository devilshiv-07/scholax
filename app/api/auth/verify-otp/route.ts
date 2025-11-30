import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connection";
import { User, Student, Teacher } from "@/lib/models";
import type { IUser } from "@/lib/models";
import { isOTPExpired } from "@/lib/utils/otp";
import { generateToken } from "@/lib/utils/jwt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    // Validate inputs
    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find user
    const user = (await User.findOne({
      email: email.toLowerCase(),
    })) as IUser | null;

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Check if OTP exists
    if (!user.otp || !user.otpExpiry) {
      return NextResponse.json(
        { success: false, error: "No OTP found. Please request a new one." },
        { status: 400 }
      );
    }

    // Check if OTP is expired
    if (isOTPExpired(user.otpExpiry)) {
      return NextResponse.json(
        { success: false, error: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify OTP
    if (user.otp !== otp) {
      return NextResponse.json(
        { success: false, error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // OTP is valid, mark user as verified and clear OTP
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Generate JWT token
    const token = generateToken({
      userId: String(user._id),
      email: user.email,
      role: user.role,
    });

    // Get additional user details based on role
    const userData: Record<string, unknown> = {
      id: user._id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };

    if (user.role === "student") {
      const student = await Student.findOne({ userId: user._id });
      if (student) {
        userData.name = student.name;
        userData.registrationNo = student.registrationNo;
        userData.branch = student.branch;
        userData.batch = student.batch;
        userData.section = student.section;
      }
    } else if (user.role === "teacher") {
      const teacher = await Teacher.findOne({ userId: user._id });
      if (teacher) {
        userData.name = teacher.name;
      }
    }

    // Create response with token in httpOnly cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: userData,
    });

    // Set token in httpOnly cookie (secure in production)
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    console.error("Verify OTP error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: "Internal server error", message },
      { status: 500 }
    );
  }
}
