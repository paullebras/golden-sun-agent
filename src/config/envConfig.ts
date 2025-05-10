import dotenv from 'dotenv';
import { z } from 'zod';
import {
  AIProvider,
  OpenAIModel,
  AnthropicModel,
  MistralModel,
} from '../types/aiTypes';

dotenv.config();

const envSchema = z.object({
  OPENAI_API_KEY: z.string(),
  ANTHROPIC_API_KEY: z.string(),
  MISTRAL_API_KEY: z.string(),

  AI_PROVIDER: z.nativeEnum(AIProvider).default(AIProvider.OPENAI),
  AI_MODEL: z
    .union([
      z.nativeEnum(OpenAIModel),
      z.nativeEnum(AnthropicModel),
      z.nativeEnum(MistralModel),
    ])
    .default(OpenAIModel.GPT_4O),

  BIZHAWK_SERVER_HOST: z.string(),
  BIZHAWK_SERVER_PORT: z.string().transform((val) => parseInt(val, 10)),
});

const parsedEnv = envSchema.parse(process.env);

export const envConfig = parsedEnv;
