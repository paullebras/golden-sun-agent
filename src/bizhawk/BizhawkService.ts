import { sendMessage } from '../socketServer';

export enum BizhawkAction {
  MUTE = 'MUTE',
  UNMUTE = 'UNMUTE',
  SCREENSHOT = 'SCREENSHOT',
}

export function pushBizhawkEventStack(action: BizhawkAction) {
  sendMessage(action);
}
