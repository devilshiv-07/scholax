import crypto from 'crypto';

/**
 * Generate a 6-digit OTP
 */
export function generateOTP(): string {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Get OTP expiry time (10 minutes from now)
 */
export function getOTPExpiry(): Date {
  const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || '10');
  return new Date(Date.now() + expiryMinutes * 60 * 1000);
}

/**
 * Check if OTP is expired
 */
export function isOTPExpired(otpExpiry: Date): boolean {
  return new Date() > otpExpiry;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if email is a student email
 */
export function isStudentEmail(email: string): boolean {
  return email.toLowerCase().endsWith('@iiitranchi.ac.in');
}

