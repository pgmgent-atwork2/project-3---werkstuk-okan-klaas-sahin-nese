import stafResponse from '../responses/staf.js';

export default {
    '/staf': {
      summary: 'Get all staf',
      description: 'Get all staf in the database',
      get: {
        tags: ['Staf'],
        summary: 'Get all staf',
        responses: stafResponse,
      },
      post: {
        tags: ['Staf'],
        summary: 'create a new staf',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Staf',
              },
            },
          },
        },
        responses: stafResponse,
      },
      put: {
        tags: ['Staf'],
      },
    },
    '/staf/{id}': {
      summary: 'Get one staf with given id',
      description: 'Get one staf with given id',
      get: {
        tags: ['Staf'],
        summary: 'Get one staf with given id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the staf to get',
          },
        ],
        responses: stafResponse,
      },
      delete: {
        tags: ['Staf'],
        summary: 'Delete a staf with id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the staf to delete',
          },
        ],
      },
    },
};
