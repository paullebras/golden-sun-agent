import {
  generateText,
  LanguageModelV1,
  ToolCallUnion,
  ToolResultUnion,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { mistral } from '@ai-sdk/mistral';
import { AIModel, AIProvider } from '../types/aiTypes';
import { DEFAULT_MODEL, DEFAULT_PROVIDER } from '../config/envConfig';
import { toolSet } from './tools';

type MyToolCall = ToolCallUnion<typeof toolSet>;
type MyToolResult = ToolResultUnion<typeof toolSet>;
type GenerateResponse = {
  text: string;
  toolCalls: Array<MyToolCall>;
  toolResults: Array<MyToolResult>;
};

export class AIService {
  private model: LanguageModelV1;

  constructor(
    provider: AIProvider = DEFAULT_PROVIDER,
    model: AIModel = DEFAULT_MODEL,
  ) {
    switch (provider) {
      case 'openai':
        this.model = openai(model);
        break;
      case 'anthropic':
        this.model = anthropic(model);
        break;
      case 'mistral':
        this.model = mistral(model);
        break;
      default:
        throw new Error(`Unknown AI provider: ${provider}`);
    }
  }

  async generate(
    prompt: string,
    systemMessage?: string,
  ): Promise<GenerateResponse> {
    return await generateText({
      model: this.model,
      system: systemMessage,
      prompt,
      tools: toolSet,
    });
  }
}
