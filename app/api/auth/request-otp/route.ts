import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { User } from '@/lib/models';
import { generateOTP, getOTPExpiry, isValidEmail } from '@/lib/utils/otp';
import { sendOTPEmail } from '@/lib/utils/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find or create user
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // For new users, we'll create them during OTP verification
      // For now, just generate OTP and send email
      // We need to determine the role based on email
      return NextResponse.json(
        { 
          success: false, 
          error: 'User not found. Please contact administrator to register.' 
        },
        { status: 404 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    // Update user with OTP
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP email
    try {
      await sendOTPEmail(email, otp);
    } catch (emailError: any) {
      console.error('Failed to send OTP email:', emailError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send OTP email. Please check your email configuration.' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully to your email',
    });
  } catch (error: any) {
    console.error('Request OTP error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

