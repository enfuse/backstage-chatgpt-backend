import { ChatCompletionRequestMessage, Configuration, CreateChatCompletionRequest, OpenAIApi,  }  from "openai";
import { useApi, configApiRef } from '@backstage/core-plugin-api';

interface ChatGPTUserInput {
    description? : string
    temperature? : number
    maxTokens? : number
}

interface OpenAIConfig {
  apiKey : string
}
 const CONFIG_OPENAI_API_KEY = `openai.apiKey`

export const openAPIResponse =  async (input : ChatGPTUserInput) => {
    const config = useApi(configApiRef);
    const openAIConfiguration = {
      apiKey: config.getString(CONFIG_OPENAI_API_KEY),
    } as OpenAIConfig
    const configuration = new Configuration({
      apiKey: openAIConfiguration.apiKey,
    });

    const openai = new OpenAIApi(configuration);
    const messages : ChatCompletionRequestMessage[]= [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role:'user',
          content : `${input.description}`
        } ]
      
    const chatCompletionRequest: CreateChatCompletionRequest = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: input.temperature,
        max_tokens: input.maxTokens,
    };

    const response  = await openai.createChatCompletion(chatCompletionRequest);
    const completion = response.data.choices
    return completion
    
}


