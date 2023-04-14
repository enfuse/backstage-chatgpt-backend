import { ChatCompletionRequestMessage, Configuration, CreateChatCompletionRequest, OpenAIApi,  }  from "openai";

interface ChatGPTUserInput {
    description? : string
    temperature? : string
    maxTokens? : string
}

export const openAPIResponse =  async (input : ChatGPTUserInput) => {

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
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
        temperature: 0.8,
        max_tokens: 2000,
    };

    const response  = await openai.createChatCompletion(chatCompletionRequest);
    const completion = response.data.choices
    return completion
    
}


