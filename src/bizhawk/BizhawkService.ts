import { sendMessage } from '../socketServer';

export enum BizhawkAction {
  MUTE = 'MUTE',
  UNMUTE = 'UNMUTE',
  SCREENSHOT = 'SCREENSHOT',
  HOLD_BUTTON = 'HOLD_BUTTON', // Keep this enum for consistency
}

export interface BizhawkEventPayload {
  button?: string;
  duration?: number;
}

export function pushBizhawkEventStack(
  action: BizhawkAction,
  payload?: BizhawkEventPayload,
) {
  console.log('action =', action);
  console.log('payload =', payload);
  let message: string;

  switch (action) {
    case BizhawkAction.HOLD_BUTTON:
      if (!payload?.button || !payload?.duration) {
        throw new Error(
          'Button and duration are required for HOLD_BUTTON action',
        );
      }
      // Format message as "Button,Duration" for button holding actions
      message = `${payload.button},${payload.duration}`;
      break;
    default:
      // For other actions, just send the action name
      message = action;
      break;
  }

  sendMessage(message);
}
