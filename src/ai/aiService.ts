import {
  generateText,
  LanguageModelV1,
  ToolCallUnion,
  ToolResultUnion,
  Message,
  CoreMessage,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { mistral } from '@ai-sdk/mistral';
import { AIModel, AIProvider } from '../types/aiTypes';
import { toolSet } from './tools';
import { envConfig } from '../config/envConfig';

type MyToolCall = ToolCallUnion<typeof toolSet>;
type MyToolResult = ToolResultUnion<typeof toolSet>;
type GenerateResponse = {
  text: string;
  toolCalls: Array<MyToolCall>;
  toolResults: Array<MyToolResult>;
};
type PromptInput = {
  model: LanguageModelV1;
  system?: string;
  tools: typeof toolSet;
  maxSteps: number;
  prompt?: string;
  messages?: CoreMessage[] | Omit<Message, 'id'>[];
};

/**
 * Service for interacting with AI models
 */
class AIService {
  private static instance: AIService;
  private model: LanguageModelV1;

  private constructor() {
    const provider: AIProvider = envConfig.AI_PROVIDER;
    const model: AIModel = envConfig.AI_MODEL;
    this.model = this.initializeModel(provider, model);
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  private initializeModel(
    provider: AIProvider,
    model: AIModel,
  ): LanguageModelV1 {
    try {
      switch (provider) {
        case 'openai':
          return openai(model);
        case 'anthropic':
          return anthropic(model);
        case 'mistral':
          return mistral(model);
        default:
          throw new Error(`Unsupported AI provider: ${provider}`);
      }
    } catch (error) {
      console.error(
        `Failed to initialize AI model: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new Error(
        `Failed to initialize AI model with provider ${provider} and model ${model}`,
      );
    }
  }

  public buildInput(
    prompt: string,
    systemMessage?: string,
    base64Image?: string,
  ): PromptInput {
    const commonConfig = {
      model: this.model,
      system: systemMessage,
      tools: toolSet,
    };

    // If no image is provided, use text-only prompt format
    if (!base64Image) {
      return {
        ...commonConfig,
        prompt,
        maxSteps: 2,
      };
    }

    // If image is provided, use multimodal message format
    return {
      ...commonConfig,
      maxSteps: 2,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image',
              image: base64Image,
            },
          ],
        },
      ],
    };
  }

  public async generate(
    prompt: string,
    systemMessage?: string,
    base64Image?: string,
  ): Promise<GenerateResponse> {
    try {
      const input = this.buildInput(prompt, systemMessage, base64Image);
      return await generateText(input);
    } catch (error) {
      console.error(
        'AI generation error:',
        error instanceof Error ? error.message : String(error),
      );
      throw new Error(
        `Failed to generate AI response: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}

export default AIService;
