import { tool } from 'ai';
import { z } from 'zod';
import { BizhawkController } from '../../bizhawk/BizhawkController';

export const muteTool = tool({
  description: 'Mute Bizhawk',
  parameters: z.object({}),
  execute: async () => BizhawkController.mute(),
});

export const unmuteTool = tool({
  description: 'Unmute Bizhawk',
  parameters: z.object({}),
  execute: async () => BizhawkController.unmute(),
});

export const screenshotTool = tool({
  description: 'Take a screenshot of the game running in Bizhawk',
  parameters: z.object({}),
  execute: async () => BizhawkController.screenshot(),
});

export const holdButtonTool = tool({
  description: 'Hold a button for a specified duration (in frames) in Bizhawk',
  parameters: z.object({
    button: z
      .enum([
        'A',
        'B',
        'Up',
        'Down',
        'Left',
        'Right',
        'L',
        'R',
        'Select',
        'Start',
      ])
      .describe('The button to hold.'),
    duration: z
      .number()
      .describe('The duration (in frames) to hold the button for.'),
  }),
  execute: async ({ button, duration }) =>
    BizhawkController.holdButton(button, duration),
});
