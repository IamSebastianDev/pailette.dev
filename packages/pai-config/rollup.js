/** @format */

const filterExternal = (deps) => Object.keys(deps).filter((key) => !key.startsWith('@pai/'));

export const bundle = (pkg) => ({
    input: './src/index.ts',
    output: [
        {
            file: pkg.module ?? './dist/index.mjs',
            format: 'esm',
            sourcemap: true,
        },
    ],
    external: filterExternal(pkg.dependencies ?? {}),
});

export const types = (pkg) => ({
    input: './src/index.ts',
    output: [
        {
            file: pkg.types ?? './dist/types/index.d.ts',
            format: 'es',
        },
    ],
    external: filterExternal(pkg.dependencies ?? {}),
});
