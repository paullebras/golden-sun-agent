import dotenv from 'dotenv';
import { z } from 'zod';
import {
  AIProvider,
  AIModel,
  OpenAIModel,
  AnthropicModel,
  MistralModel,
} from '../types/aiTypes';

dotenv.config();

const envSchema = z.object({
  OPENAI_API_KEY: z.string(),
  ANTHROPIC_API_KEY: z.string(),
  MISTRAL_API_KEY: z.string(),

  DEFAULT_PROVIDER: z.nativeEnum(AIProvider).default(AIProvider.OPENAI),
  DEFAULT_MODEL: z
    .union([
      z.nativeEnum(OpenAIModel),
      z.nativeEnum(AnthropicModel),
      z.nativeEnum(MistralModel),
    ])
    .default(OpenAIModel.GPT_4O),

  BIZHAWK_SERVER_HOST: z.string().default('127.0.0.1'),
  BIZHAWK_SERVER_PORT: z.string().default('53333'),
});

export const env = envSchema.parse(process.env);

export const DEFAULT_PROVIDER: AIProvider = env.DEFAULT_PROVIDER;
export const DEFAULT_MODEL: AIModel = env.DEFAULT_MODEL;
