/** @format */

import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import pkg from '../package.json' assert { type: 'json' };
import * as config from "@pai/config/rollup.js"; 

export default [
    {
        ...config.bundle(pkg),
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
        ...config.types(pkg),
        plugins: [resolve(), commonjs(), cleanup({ extensions: ['.ts'] }), dts()],
    },
];
