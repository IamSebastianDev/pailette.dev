/** @format */

import type { Request, Response } from 'express';
import type { Payload } from './Payload';

export type ControllerFunction<ResponseData extends Record<PropertyKey, unknown> = {}, P extends Payload = any> = (
    payload: P,
    _request: Request,
    _response: Response
) => Promise<ResponseData>;
