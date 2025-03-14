export enum AIProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  MISTRAL = 'mistral',
}

export enum OpenAIModel {
  GPT_4O = 'gpt-4o',
  GPT_4_TURBO = 'gpt-4-turbo',
  GPT_3_5_TURBO = 'gpt-3.5-turbo',
}

export enum AnthropicModel {
  CLAUDE_3_OPUS = 'claude-3-opus',
  CLAUDE_3_SONNET = 'claude-3-sonnet',
  CLAUDE_3_HAIKU = 'claude-3-haiku',
}

export enum MistralModel {
  MISTRAL_SMALL = 'mistral-small',
  MISTRAL_MEDIUM = 'mistral-medium',
  MISTRAL_LARGE = 'mistral-large',
}

export type AIModel = OpenAIModel | AnthropicModel | MistralModel;
