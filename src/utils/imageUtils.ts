import * as fs from 'fs/promises';
import * as path from 'path';

export async function getScreenshotBase64(): Promise<string> {
  const filePath = path.resolve('screenshots/screenshot.png');
  const imageBuffer = await fs.readFile(filePath);
  return imageBuffer.toString('base64');
}
