import * as BizhawkService from './BizhawkService';

function mute() {
  BizhawkService.pushBizhawkEventStack(BizhawkService.BizhawkAction.MUTE);
}

function unmute() {
  BizhawkService.pushBizhawkEventStack(BizhawkService.BizhawkAction.UNMUTE);
}

export default {
  mute,
  unmute,
};
