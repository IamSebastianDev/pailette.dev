/** @format */

import { app, env } from './bootstrap';
import { routes } from './api/routes';

const PORT = env.get('PORT') ?? 3000;
const APP_NAME = env.get('APP_NAME');

// Setup
app.use('/api/v1', routes);
// app.use(express.static('./'));  @todo -> implement static asset strategy if necessary

// Create a 404 fallback
app.use('*', (_, res) => res.status(404).send());

// Start the server
app.listen(PORT, () => console.log(`\x1b[34m\x1b[1m[${APP_NAME}]\x1b[0m\x1b[34m started on port ${PORT}\x1b[0m`));
