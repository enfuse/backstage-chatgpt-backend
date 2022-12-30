import { Configuration, OpenAIApi,  }  from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type ChatGPTUserInput = {
    framework : string
    sample? : string
    functionality : string
    styling : string

}


export const openAPIResponse =  async (input : ChatGPTUserInput) => {
    const templatedPrompt : string = generatePrompt(input)
    const response  = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: templatedPrompt,
        temperature: 1,
        max_tokens: 300,
    });
    const completion = response.data.choices[0].text
    return completion
    
}

//Generates the prompt to be fed to the OpenAI call
const generatePrompt = (userInput : ChatGPTUserInput) =>{
    const templatePrompt = `create a {framework} component for a menu bar like this: {framework_sample} with ability to {functionality}`
    const promptWithSample = getSample(templatePrompt, userInput.framework, userInput.sample)
    return  promptWithSample
                .replace('{framework}',userInput.framework)
                .replace('{functionality}', userInput.functionality)
}   
 
//Provides a sample to prompt from a predefined set of samples supporting
//different frontend frameworks.
//If sample is provided, then that one is use as a first option.
const getSample = (prompt:string, framework:string, sample? :string)=>{
    if(sample){
        return prompt.replace('{framework_sample}', sample)
    }
    const framework_samples = {
        react : `const Button = ({ onClick, children }) => {
            return (
              <button type="button" onClick={onClick}>
                {children}
              </button>
            );
          };`,
        angular: `@Component({
                    selector:    'app-hero-list',
                    templateUrl: './hero-list.component.html',
                    providers:  [ HeroService ]
                })
            export class HeroListComponent implements OnInit {
                heroes: Hero[] = [];
                selectedHero: Hero | undefined;
                constructor(private service: HeroService) { }
                ngOnInit() {
                this.heroes = this.service.getHeroes();
                }
                selectHero(hero: Hero) { this.selectedHero = hero; }
            }`,
        vue: `
        export default {
            data() {
              return {
                count: 0
              }
            },
            template: \`
              <button @click="count++">
                You clicked me {{ count }} times.
              </button>\`
          }`
    }
    switch(framework){
        case 'react':
            return prompt.replace('{framework_sample}', framework_samples.react)
        case 'angular':
            return prompt.replace('{framework_sample}', framework_samples.angular)
        case 'vue':
            return prompt.replace('{framework_sample}', framework_samples.vue)
        default:
            return prompt.replace('{framework_sample}', framework_samples.react)
    }
}

