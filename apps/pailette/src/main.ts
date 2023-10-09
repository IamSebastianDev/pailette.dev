/** @format */

import './app.scss';
import App from './App.svelte';

const app = new App({
    target: document.getElementById('app') ?? document.documentElement,
});

export default app;
