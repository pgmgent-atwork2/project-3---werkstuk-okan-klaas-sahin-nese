import klassenResponse from '../responses/klassen.js';

export default {
    '/klassen': {
      summary: 'Get all klassen',
      description: 'Get all klassen in the database',
      get: {
        tags: ['Klassen'],
        summary: 'Get all klassen',
        responses: klassenResponse,
      },
      post: {
        tags: ['Klassen'],
        summary: 'create a new klassen',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Klassen',
              },
            },
          },
        },
        responses: klassenResponse,
      },
      put: {
        tags: ['Klassen'],
      },
    },
    '/klassen/{id}': {
      summary: 'Get one klassen with given id',
      description: 'Get one klassen with given id',
      get: {
        tags: ['Klassen'],
        summary: 'Get one klassen with given id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the klassen to get',
          },
        ],
        responses: klassenResponse,
      },
      delete: {
        tags: ['Klassen'],
        summary: 'Delete a klassen with id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the klassen to delete',
          },
        ],
      },
    },
};
