import { generateResponse } from '../ai/generateResponse';
import * as readline from 'readline';
import { setTimeout } from 'node:timers/promises';

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
        await generateResponse(userPrompt);
        await setTimeout(2000);
        loop();
      },
    );
  };

  loop();
}
