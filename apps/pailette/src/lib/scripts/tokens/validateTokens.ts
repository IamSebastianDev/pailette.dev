/** @format */

import { environment } from '../../../environment';
import * as jose from 'jose';

// Method will return a token or false if the token is in any way invalid
export const validateTokens = async (token: string): Promise<boolean> => {
    const now = Math.floor(Date.now() / 1000);
    const secret = new TextEncoder().encode(environment.api_bearer_secret);

    try {
        const { payload } = await jose.jwtVerify(token, secret);

        // Return false if the token is invalid or expired
        if (!payload || (payload && payload.exp && payload.exp <= now)) {
            return false;
        }

        return true;
    } catch (error) {
        if (
            error instanceof jose.errors.JWTInvalid ||
            error instanceof jose.errors.JWTExpired ||
            error instanceof jose.errors.JWTClaimValidationFailed
        ) {
            return false;
        }

        throw error;
    }
};
