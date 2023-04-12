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
          content: 'You are a smart code generation assistant that understands user requirements and generates files in various programming languages, frameworks, and file formats accordingly.'
        },
        {
          role: 'user',
          content: 'A java spring controler to serve as a payments endpoint for a pet store'
        },
        {
          role: 'assistant',
          content: `import org.springframework.web.bind.annotation.*;
          import java.util.HashMap;
          import java.util.Map;
          
          @RestController
          @RequestMapping("/payments")
          public class PaymentsController {
          
              @PostMapping("/charge")
              public Map<String, Object> chargeCard(@RequestBody Map<String, Object> paymentMap) {
                  Double amount = Double.parseDouble(paymentMap.get("amount").toString());
                  String currency = paymentMap.get("currency").toString();
                  String token = paymentMap.get("token").toString();
          
                  // Charge the card using the payment gateway API
                  // ...
          
                  Map<String, Object> charge = new HashMap<>();
                  charge.put("amount", amount);
                  charge.put("currency", currency);
                  charge.put("status", "approved");
          
                  return charge;
              }
          }`
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


