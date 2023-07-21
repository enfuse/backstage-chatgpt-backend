import { ChatCompletionRequestMessage,
   Configuration,
   CreateChatCompletionRequest,
   CreateCompletionRequest,
   OpenAIApi}  from "openai";
import BadRequest from 'http-errors'

interface ChatGPTUserInput {
  model? : string
  messages? : any[]
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
      let response
      if(input.model == 'gpt-3.5-turbo'){
        const chatCompletionRequest: CreateChatCompletionRequest = {
            model: input.model,
            messages: input.messages,
            temperature: input.temperature,
            max_tokens: input.maxTokens,
        };
        response  = await openai.createChatCompletion(chatCompletionRequest);
      }
      else {
        throw BadRequest("Invalid model")
      }
      const completion = response.data.choices
      return completion

}


