/** @format */

import { Payload } from '@pai/kzw';
import { øLoggedInUser } from '../../../../middlewares/user/øloggedInUser';

export type LogoutUserPayload = øLoggedInUser & Payload<{}>;
