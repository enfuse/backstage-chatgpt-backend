/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { Config } from '@backstage/config';

import { openAPIResponse } from './openai';

export interface RouterOptions {
  logger: Logger;
  config: Config;
}

export async function createRouter(
  options: RouterOptions,
  

): Promise<express.Router> {
  const { config, logger } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.send({ status: 'ok' });
  });

  router.get('/completions', async (request, response) => {
    const model = request.query.model as string
    const systemPrompt = request.query.systemPrompt as string
    const userPrompt = request.query.userPrompt as string
    const temperature = Number(request.query.temperature as string)
    const maxTokens = Number(request.query.maxTokens as string)
    const completion = await openAPIResponse(config.getString('openai.apiKey'),{model, systemPrompt, userPrompt, temperature, maxTokens})
    response.send({completion: completion})
  })

  router.use(errorHandler());
  return router;
}
