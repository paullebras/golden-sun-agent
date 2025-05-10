import AIService from './aiService';

const aiService = AIService.getInstance();

export async function generateResponse(
  prompt: string,
  systemMessage?: string,
  base64Image?: string,
) {
  try {
    const response = await aiService.generate(
      prompt,
      systemMessage,
      base64Image,
    );
    response.toolResults.forEach((result) => {
      console.log(`[TOOL RESULT] ${result.toolName}`);
    });
    response.toolCalls.forEach((call) => {
      console.log(`[TOOL CALL] ${call.toolName}`);
    });
    return response.text;
  } catch (error) {
    console.error('Error generating response:', error);
  }
}
