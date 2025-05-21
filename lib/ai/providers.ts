import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
    languageModels: {
      'chat-model': openai.languageModel('gpt-4o-mini'),
      'chat-model-reasoning': wrapLanguageModel({
        model: openai.languageModel('gpt-4o-mini'),
        middleware: extractReasoningMiddleware({ tagName: 'think' }),
      }),
      'title-model': openai.languageModel('gpt-4o-mini'),
      'artifact-model': openai.languageModel('gpt-4o-mini'),
    },
    imageModels: {
      'small-model': openai.imageModel('dall-e-3'),
    },
  });
