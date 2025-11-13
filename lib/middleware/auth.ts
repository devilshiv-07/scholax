import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, JWTPayload } from '@/lib/utils/jwt';
import { UserRole } from '@/lib/models';

export interface AuthRequest extends NextRequest {
  user?: JWTPayload;
}

/**
 * Middleware to verify JWT token from cookies
 */
export async function authenticate(request: NextRequest): Promise<JWTPayload | null> {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  return payload;
}

/**
 * Check if user is authenticated
 */
export async function requireAuth(request: NextRequest): Promise<NextResponse | JWTPayload> {
  const user = await authenticate(request);

  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Please login.' },
      { status: 401 }
    );
  }

  return user as JWTPayload;
}

/**
 * Check if user has required role
 */
export async function requireRole(
  request: NextRequest,
  allowedRoles: UserRole[]
): Promise<NextResponse | JWTPayload> {
  const result = await requireAuth(request);

  if (result instanceof NextResponse) {
    return result;
  }

  const user = result as JWTPayload;

  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden. Insufficient permissions.' },
      { status: 403 }
    );
  }

  return user;
}

/**
 * Require admin role
 */
export async function requireAdmin(request: NextRequest): Promise<NextResponse | JWTPayload> {
  return requireRole(request, ['admin']);
}

/**
 * Require teacher role
 */
export async function requireTeacher(request: NextRequest): Promise<NextResponse | JWTPayload> {
  return requireRole(request, ['teacher']);
}

/**
 * Require student role
 */
export async function requireStudent(request: NextRequest): Promise<NextResponse | JWTPayload> {
  return requireRole(request, ['student']);
}

