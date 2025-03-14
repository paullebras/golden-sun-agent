// import { setTimeout } from 'node:timers/promises';
import { AIService } from './ai/aiService';
import * as readline from 'readline';

const aiService = new AIService();

async function generateResponse(prompt: string, systemMessage?: string) {
  try {
    const response = await aiService.generate(prompt, systemMessage);
    response.toolResults.forEach((result) => {
      console.log(result.toolName);
    });
  } catch (error) {
    console.error('Error generating response:', error);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const conversationLoop = () => {
  rl.question(
    'Enter your prompt (or type "exit" to quit): ',
    async (userPrompt) => {
      if (userPrompt.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        rl.close();
        return;
      }
      await generateResponse(userPrompt);
      // await setTimeout(2000);
      conversationLoop();
    },
  );
};

conversationLoop();
