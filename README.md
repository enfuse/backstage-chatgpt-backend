# ChatGPT Plugin Backend

Plugin that exposes an API to interact with OpenAI and serve the [frontend](https://github.com/enfuse/backstage-chatgpt-plugin) chatgpt plugin

## Releases
## v 1.0.1
- /completions endpoint:  Mirrors the OpenAI chat/completions endpoint by injecting a simple system prompt to the request.

# Getting started

# Installation
Navigate to root of Backstage installation and run
```sh
# From root directory of your Backstage installation
yarn add --cwd packages/backend @enfuse/plugin-chatgpt-backend
```

# Configuration
1. This plugin requires an OpenAI API Key. This should be provided in the backstage configuration as shown below:

```yml
//app-config.yml or app-config-local.yml

openai:
  apiKey: <openai-api-key>
  
```
This can be generated here: [ChatGPT API keys](https://platform.openai.com/account/api-keys).

3. Create a `chatgpt.ts` file inside your `packages/backend/src/plugins` directory and include the following:


``` js

import { createRouter } from '@enfuse/plugin-chatgpt-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    logger: env.logger,
  });
}
```

4. Inside your `packages/backend/src/index.ts` file, find the section where backend environments and routes are set up and include the following:

``` js
import chatGPTBackend from './plugins/chatgpt';

...
  const chatgptEnv = useHotMemoize(module, () => createEnv('chatgpt-backend'));

  apiRouter.use('/chatgpt', await chatGPTBackend(chatgptEnv));

```

5. Test your backend plugin installation by having backstage running and curling the endpoint

``` bash
curl localhost:7007/chatgpt
```

