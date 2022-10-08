import * as jwt from 'jsonwebtoken';

export const APP_SECRET = 'MY_CUSTOM_SECRET_KEY';

export interface AuthTokenPayload {
	userId: number;
}

export function verifyJWT(authHeader: string): AuthTokenPayload {
	const token = authHeader.replace('Bearer', '');

	if (!token) {
		throw new Error('Token not found');
	}

	return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
}
