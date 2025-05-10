import { generateResponse } from '../ai/generateResponse';
import * as readline from 'readline';
import { setTimeout } from 'node:timers/promises';

const SYSTEM_MESSAGE = `
  You are a helpful assistant for the game "Golden Sun" on GBA.
  Possible inputs are "A", "B", "L", "R", "Select", "Start" and "Up", "Down", "Left", "Right".
  You also have access to a set of tools that can be used to perform these inputs in the bizhawk emulator.
  You will receive a prompt and your job is to respond to that prompt either by calling a tool to input the requested action or by answering the request.
`;

export function startManualMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const loop = () => {
    rl.question(
      'Enter your prompt (or type "exit" to quit): ',
      async (userPrompt) => {
        if (userPrompt.toLowerCase() === 'exit') {
          console.log('Goodbye!');
          rl.close();
          return;
        }
        const response = await generateResponse(userPrompt, SYSTEM_MESSAGE);
        console.log('response =', response);
        await setTimeout(2000);
        loop();
      },
    );
  };

  loop();
}
