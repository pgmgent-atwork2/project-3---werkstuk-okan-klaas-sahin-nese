import exercisesResponse from '../responses/exercises.js';

export default {
    '/exercises': {
      summary: 'Get all exercises',
      description: 'Get all exercises in the database',
      get: {
        tags: ['Exercises'],
        summary: 'Get all exercises',
        responses: exercisesResponse,
      },
      post: {
        tags: ['Exercises'],
        summary: 'create a new exercises',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Exercises',
              },
            },
          },
        },
        responses: exercisesResponse,
      },
      put: {
        tags: ['Exercises'],
      },
    },
    '/exercises/{id}': {
      summary: 'Get one exercises with given id',
      description: 'Get one exercises with given id',
      get: {
        tags: ['Exercises'],
        summary: 'Get one exercises with given id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the exercises to get',
          },
        ],
        responses: exercisesResponse,
      },
      delete: {
        tags: ['Exercises'],
        summary: 'Delete a exercises with id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the exercises to delete',
          },
        ],
      },
    },
};
