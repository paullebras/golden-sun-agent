import { BizhawkController } from '../bizhawk/BizhawkController';
import { getScreenshotBase64 } from '../utils/imageUtils';
import { generateResponse } from '../ai/generateResponse';
import { setTimeout } from 'node:timers/promises';

const SYSTEM_MESSAGE = undefined;

const DESCRIBE_AND_ACT_PROMPT = `
    Interpret this Golden Sun game screenshot.
    If you are not in combat, choose a movement from the tools and then call the tool responsible for this action
    The movements must extend for at least 2 seconds but you can choose any duration above this threshold
    Do not take another screenshot.
    If you are in combat, press A for at least half a second.
    If you are in the pre game menu, press A for a single frame.
    Explain what you see and your decision.
  `;

export async function startAutomaticMode() {
  console.log('Starting automatic mode...');
  while (true) {
    BizhawkController.screenshot();
    await setTimeout(3000);
    const screenshot = await getScreenshotBase64();
    const description = await generateResponse(
      DESCRIBE_AND_ACT_PROMPT,
      SYSTEM_MESSAGE,
      screenshot,
    );
    console.log('description =', description);
    await setTimeout(3000);
  }
}
