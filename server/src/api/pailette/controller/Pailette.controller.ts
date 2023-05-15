/** @format */

import { Router } from 'express';
import { createPailette } from '../service/createPailette.service';
import { handleBadRequest, handleNotFound } from '../../../lib/Errors';

export const PailetteController = Router();
PailetteController.post('/create', createPailette);
PailetteController.use(handleBadRequest(), handleNotFound());
