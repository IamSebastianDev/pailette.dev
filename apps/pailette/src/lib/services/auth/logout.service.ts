/** @format */

import { øAuth } from '../../stores/øauth/øauth.store';
import { httpService } from '../http/http.service';

export const logout = () => {
    httpService.get(`/user/auth/logout`);
    return øAuth;
};
