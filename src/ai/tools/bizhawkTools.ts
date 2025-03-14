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
