/** @format */

import { Router } from 'express';
import { health } from '../service/health.service';

export const HealthController = Router().get('/', health);
