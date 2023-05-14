/** @format */

import { Payload } from './Payload';

export type Service<T extends Payload, K> = (payload: T) => Promise<K>;
