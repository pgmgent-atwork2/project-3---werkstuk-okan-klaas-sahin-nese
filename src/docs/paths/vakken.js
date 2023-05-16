import vakkenResponse from '../responses/vakken.js';


export default {
    '/vakken': {
      summary: 'Get all vakken',
      description: 'Get all vakken in the database',
      get: {
        tags: ['Vakken'],
        summary: 'Get all vakken',
        responses: vakkenResponse,
      },
      post: {
        tags: ['Vakken'],
        summary: 'create a new vakken',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Vakken',
              },
            },
          },
        },
        responses: vakkenResponse,
      },
      put: {
        tags: ['Vakken'],
      },
    },
    '/vakken/{id}': {
      summary: 'Get one vakken with given id',
      description: 'Get one vakken with given id',
      get: {
        tags: ['Vakken'],
        summary: 'Get one vakken with given id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the vakken to get',
          },
        ],
        responses: vakkenResponse,
      },
      delete: {
        tags: ['Vakken'],
        summary: 'Delete a vakken with id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the vakken to delete',
          },
        ],
      },
    },
};