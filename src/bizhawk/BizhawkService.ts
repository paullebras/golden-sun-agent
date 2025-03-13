import { send } from '../socketServer';

export enum BizhawkAction {
  MUTE = 'MUTE',
  UNMUTE = 'UNMUTE',
}

export function pushBizhawkEventStack(action: BizhawkAction) {
  send(action);
}
