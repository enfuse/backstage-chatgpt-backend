# ChatGPT Plugin Backend

Plugin that exposes an API to interact with OpenAI and serve the [frontend](https://github.com/enfuse/backstage-chatgpt-plugin) chatgpt plugin

## Releases
## v 1.0.0 
- /completions endpoint:  Mirrors the OpenAI chat/completions endpoint by injecting a simple system prompt to the request.

# Getting started

## Installation
Follow the installation process below. Using `yarn add` causes the plugin to fail

1. Add the dependency to your package.json in packages/app

```json
    "@enfuse/plugin-chatgpt-backend": "^1.0.0"
```
and run 
```sh
    yarn install
```

# Configuration
1. This plugin requires credential details. For now set up an environment variable before you run your backstage instace from your shell

``` bash
export OPENAI_API_KEY=<your-openai-key>
```

3. Create a chatgpt.tsx file inside your packages/backend/src/plugins directory and include the following:


``` js

import { createRouter } from '@internal/plugin-chatgpt-backend';
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

4. Inside your packages/backend/src/index/ts, find the section where backend envrionemnts and routes are set up and include the following:

``` js
import chatGPTBackend from './plugins/chatgpt'

...
  const chatgptEnv = useHotMemoize(module, () => createEnv('chatgpt-backend'))

  apiRouter.use('/chatgpt', await chatGPTBackend(chatgptEnv));

```

5. test your backend plugin installation by having backstage running and curling the endpoint

``` bash
curl localhost:7007/chatgpt
```

