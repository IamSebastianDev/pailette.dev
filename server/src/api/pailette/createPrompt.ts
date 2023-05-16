/** @format */

import type { ChatCompletionRequestMessage } from 'openai';
import { isNonNull } from '../../utils/isNonNull.util';

export const createPrompt = (
    prompt: string,
    base: string | undefined,
    colors: string[],
    format: string
): ChatCompletionRequestMessage[] => {
    const tokens = {
        prompt: (prompt: string) => `Create a color palette. Use the following prompt as inspiration and 
        guideline: "${prompt}".`,
        base: (base: string) => `Use the following color as base for the generation: ${base}`,
        colors: (colors: string[]) => `Create colors for the following color names: "${colors.join(', ')}"`,
        format: (format: string) => ` The Values of the color should be provided in the following format: "${format}".`,
        schema: () => `Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation. 
        {
            "prompt": "the original prompt",
            "reasoning": "your reasoning for your color choices",
            "colors": [
                {
                    "name": "First Color Name",
                    "hex: "First Color Value as hex",
                    "rgba": "First Color Value as RGBA",
                    "explanation": "Short text explaining the color choice"
                },
                {
                    "name: "Second Color Name",
                    "hex: "Second Color Value as hex",
                    "rgba": "Second Color Value as RGBA"
                    "explanation": "Short text explaining the color choice"
                },
                ... as many colors as there are color names should be generated here
            ],
            "output": "The color palette as easily copyable and formatted text"
        }`,
    };

    return [
        {
            role: 'system',
            content: 'You are a creative digital artist.',
        },
        {
            role: 'user',
            content: [
                tokens.prompt(prompt),
                base ? tokens.base(base) : null,
                tokens.colors(colors),
                tokens.format(format),
                tokens.schema(),
            ]
                .filter(isNonNull)
                .join('/n'),
        },
    ];
};
