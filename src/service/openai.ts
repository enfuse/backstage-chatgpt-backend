import { ChatCompletionRequestMessage,
   Configuration,
   CreateChatCompletionRequest,
   CreateCompletionRequest,
   OpenAIApi}  from "openai";

interface ChatGPTUserInput {
  model? : string
  userPrompt? : string
  temperature? : number
  maxTokens? : number
  systemPrompt? : string
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
      let response
      if(input.model == 'chatgpt-3.5-turbo'){
        const messages : ChatCompletionRequestMessage[] = [
          {
            role: 'system',
            content: `${input.systemPrompt}`
          },
          {
            role:'user',
            content : `${input.userPrompt}`
          }]
        
        const chatCompletionRequest: CreateChatCompletionRequest = {
            model: `${input.model}`,
            messages: messages,
            temperature: input.temperature,
            max_tokens: input.maxTokens,
        };
        response  = await openai.createChatCompletion(chatCompletionRequest);

      }
      else {
        const completionRequest: CreateCompletionRequest = {
          model: `${input.model}`,
          prompt: `${input.userPrompt}`,
          temperature: input.temperature,
          max_tokens: input.maxTokens,
        }
        response = await openai.createCompletion(completionRequest)

      }
      const completion = response.data.choices
      return completion

}


