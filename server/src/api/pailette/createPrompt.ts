/** @format */

import type { ChatCompletionRequestMessage } from 'openai';
import type { PailetteGenerator } from './entity/PailetteGenerator';

export const createPrompt = (
    prompt: string,
    schema: string[],
    generator: PailetteGenerator
): ChatCompletionRequestMessage[] => {
    const generators: Record<PailetteGenerator, string> = {
        css: '--color-<color-name>: <rgba color value>',
        hex: '#<color-hex-value>',
        rgba: 'rgba(<color-rgb-value>, 1)',
        hsla: 'hsla(<color-hsl-value>, 1)',
    };

    const content = `Create a color palette. Use the following prompt as inspiration and 
    guideline: "${prompt}". 
    Create colors for the following color names: "${schema.join(', ')}"
    The Values of the color should be provided in the following format: "${generators[generator]}".
    Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation. 
    {
        "prompt": "the original prompt",
        "reasoning": "your reasoning for your color choices",
        "colors": [
            {
                "name": "First Color Name",
                "value: "First Color Value",
                "explanation": "Short text explaining the color choice"
            },
            {
                "name: "Second Color Name",
                "value: "Second Color Value",
                "explanation": "Short text explaining the color choice"
            },
            ... as many colors as there are color names should be generated here
        ],
        "output": "The color palette as easily copyable and formatted text"
    }`;

    return [
        {
            role: 'system',
            content: 'You are a creative digital artist.',
        },
        {
            role: 'user',
            content: content,
        },
    ];
};
