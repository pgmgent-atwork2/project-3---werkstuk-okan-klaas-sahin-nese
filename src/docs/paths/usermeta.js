import usermetaResponse from '../responses/usermeta.js';

export default {
    '/usermeta': {
      summary: 'Get all usermeta',
      description: 'Get all usermeta in the database',
      get: {
        tags: ['Usermeta'],
        summary: 'Get all usermeta',
        responses: usermetaResponse,
      },
      post: {
        tags: ['Usermeta'],
        summary: 'create a new usermeta',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Usermeta',
              },
            },
          },
        },
        responses: usermetaResponse,
      },
      put: {
        tags: ['Usermeta'],
      },
    },
    '/usermeta/{id}': {
      summary: 'Get one usermeta with given id',
      description: 'Get one usermeta with given id',
      get: {
        tags: ['Usermeta'],
        summary: 'Get one usermeta with given id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the usermeta to get',
          },
        ],
        responses: usermetaResponse,
      },
      delete: {
        tags: ['Usermeta'],
        summary: 'Delete a usermeta with id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the usermeta to delete',
          },
        ],
      },
    },
};
