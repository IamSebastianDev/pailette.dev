/** @format */

import './dotenv.config.js';
import esbuild from 'rollup-plugin-esbuild';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import { rld } from 'rollup-plugin-rld';
import scss from 'rollup-plugin-scss';
import pkg from '../package.json' assert { type: 'json' };

export default [
    {
        input: './server/src/app.ts',
        output: [
            {
                file: './server/dist/index.js',
                format: 'es',
                sourcemap: true,
            },
        ],
        external: Object.keys(pkg.dependencies || {}),
        plugins: [
            resolve({ preferBuiltins: true }),
            commonjs(),
            json(),
            esbuild({
                tsconfig: '../tsconfig.json',
            }),
            cleanup({ extensions: ['.ts'] }),
            process.env.NODE_ENV === 'production' && terser(),
        ],
    },
    {
        input: './client/src/main.ts',
        output: {
            file: './client/public/build/bundle.js',
            format: 'iife',
            name: 'app',
            intro: `window['environment']='${process.env.NODE_ENV || 'development'}'; 
                    window['application_name']='${process.env.APP_NAME}'`,
            assetFileNames: 'bundle[extname]',
        },
        plugins: [
            commonjs(),
            json(),
            svelte({
                preprocess: autoPreprocess(),
            }),
            scss({}),
            esbuild(),
            cleanup({ extensions: ['.ts'] }),
            resolve({ browser: true }),
            rld({ url: 'rld' }),
            process.env.NODE_ENV === 'production' && terser(),
        ],
    },
];
