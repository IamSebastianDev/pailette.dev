/** @format */

import { execSync } from 'node:child_process';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Retrieve the APP_NAME & APP_TAG variable
const { APP_NAME, APP_TAG } = process.env;

// Construct the docker build command
const dockerBuildCommand = `docker build . -t ${APP_NAME}:${APP_TAG}`;

// Execute the docker build command
execSync(dockerBuildCommand, { stdio: 'inherit' });
