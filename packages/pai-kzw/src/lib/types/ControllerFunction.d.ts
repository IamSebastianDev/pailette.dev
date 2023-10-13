/** @format */

import type { Request, Response } from 'express';
import type { øPayload } from './øPayload';

export type ControllerFunction<ResponseData extends Record<PropertyKey, unknown> = {}, P extends øPayload = any> = (
    payload: P,
    _request: Request,
    _response: Response
) => Promise<ResponseData>;
