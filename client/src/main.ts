/** @format */

import App from './App.svelte';

const app = new App({
    target: document.body,
});

export default app;

document.head.querySelector('title')!.textContent = (window as any).application_name;
