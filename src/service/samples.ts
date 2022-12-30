
    export const frameworkSamples = {
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