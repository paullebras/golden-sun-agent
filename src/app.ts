import { z } from 'zod';
import {
  generateText,
  LanguageModelV1,
  tool,
  ToolCallUnion,
  ToolResultUnion,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import dotenv from 'dotenv';
import BizhawkController from './bizhawk/BizhawkController';

console.log('Starting app.js');

dotenv.config();

const model = openai('gpt-3.5-turbo');

const toolSet = {
  weather: tool({
    description: 'Get the weather in a location',
    parameters: z.object({
      location: z.string().describe('The location to get the weather for'),
    }),
    execute: async ({ location }) => ({
      location,
      temperature: 72 + Math.floor(Math.random() * 21) - 10,
    }),
  }),
  mute: tool({
    description: 'Mute Bizhawk',
    parameters: z.object({}),
    execute: async () => BizhawkController.mute(),
  }),
  unmute: tool({
    description: 'Unmute Bizhawk',
    parameters: z.object({}),
    execute: async () => BizhawkController.unmute(),
  }),
  screenshot: tool({
    description: 'Take a screenshot of the game running in Bizhawk',
    parameters: z.object({}),
    execute: async () => BizhawkController.unmute(),
  }),
};

type MyToolCall = ToolCallUnion<typeof toolSet>;
type MyToolResult = ToolResultUnion<typeof toolSet>;

const generateSomething = async (
  model: LanguageModelV1,
  toolset: typeof toolSet,
  prompt: string,
): Promise<{
  text: string;
  toolCalls: Array<MyToolCall>;
  toolResults: Array<MyToolResult>;
}> => {
  return generateText({
    model: openai('gpt-4o'),
    tools: toolSet,
    prompt,
  });
};

// const prompt = 'What is the weather in San Francisco?';
// const prompt = 'mute bizhawk';
const prompt = 'unmute bizhawk';
// const prompt = 'look at what is going on in bizhawk';

const result = await generateSomething(model, toolSet, prompt);

// console.log('result =', result);
console.log('result.toolResults =', result.toolResults);

// console.log('result.response.messages =', result.response.messages);

// const { messages } = result.response;

// messages.forEach((message) => {
//   console.log('message.content[0].result =', message.content[0].result);
//   if (typeof message.content[0] === ToolResultPart) {
//     console;
//   }
//   const test = message.content[0];
// });
