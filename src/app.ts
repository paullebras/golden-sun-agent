import { startManualMode } from './modes/manual';
import { startAutomaticMode } from './modes/automatic';

const mode = process.argv[2];

if (mode === 'auto') {
  startAutomaticMode();
} else {
  startManualMode();
}
