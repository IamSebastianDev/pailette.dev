/** @format */

import { Router } from 'express';
import { getSession } from '../service/getSession.service';
import { clearSession } from '../service/clearSession.service';

export const SessionController = Router().get('/', getSession).delete('/', clearSession);
