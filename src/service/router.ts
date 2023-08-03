
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
    const parsedArray = (request.query.messages as []);
    const temperature = Number(request.query.temperature as string)
    const maxTokens = Number(request.query.maxTokens as string)
    const completion = await openAPIResponse(config.getString('openai.apiKey'),{model, messages:parsedArray, temperature, maxTokens})

    response.send({completion: completion})
  })

  router.use(errorHandler());
  return router;
}
