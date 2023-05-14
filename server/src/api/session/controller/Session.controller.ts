/** @format */

import { Router } from 'express';
import { getSession } from '../service/getSession.service';

export const SessionController = Router().get('/', getSession);
