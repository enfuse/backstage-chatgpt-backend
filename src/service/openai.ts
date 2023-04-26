import { ChatCompletionRequestMessage, Configuration, CreateChatCompletionRequest, OpenAIApi,  }  from "openai";

interface ChatGPTUserInput {
    description? : string
    temperature? : number
    maxTokens? : number
}

interface OpenAIConfig {
  apiKey : string
}

export const openAPIResponse =  async (apiKey : string ,input : ChatGPTUserInput) => {
    const openAIConfiguration = {
      apiKey: apiKey
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


