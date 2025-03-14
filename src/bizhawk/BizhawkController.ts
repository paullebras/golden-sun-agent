import * as BizhawkService from './BizhawkService';

export const BizhawkController = {
  mute: () =>
    BizhawkService.pushBizhawkEventStack(BizhawkService.BizhawkAction.MUTE),

  unmute: () =>
    BizhawkService.pushBizhawkEventStack(BizhawkService.BizhawkAction.UNMUTE),

  screenshot: () =>
    BizhawkService.pushBizhawkEventStack(
      BizhawkService.BizhawkAction.SCREENSHOT,
    ),
};
