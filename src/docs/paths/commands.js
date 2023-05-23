import commandsResponse from '../responses/commands.js';

export default {
    '/commands': {
      summary: 'Get all commands',
      description: 'Get all commands in the database',
      get: {
        tags: ['Commands'],
        summary: 'Get all commands',
        responses: commandsResponse,
      },
      post: {
        tags: ['Commands'],
        summary: 'create a new commands',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Commands',
              },
            },
          },
        },
        responses: commandsResponse,
      },
      put: {
        tags: ['Commands'],
      },
    },
    '/commands/{id}': {
      summary: 'Get one commands with given id',
      description: 'Get one commands with given id',
      get: {
        tags: ['Commands'],
        summary: 'Get one commands with given id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the commands to get',
          },
        ],
        responses: commandsResponse,
      },
      delete: {
        tags: ['Commands'],
        summary: 'Delete a commands with id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the commands to delete',
          },
        ],
      },
    },
};