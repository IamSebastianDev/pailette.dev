/** @format */

import express from 'express';
import { __root } from './utils/root.util';

/**
 * The routes defined below should only be changed to include
 * static html files with different markup. All other routing
 * should be handled by svelte in the frontend.
 */

export default express.Router().get('/', (req, res) => res.sendFile(__root('./client/index.html')));
