import studentsResponse from '../responses/students.js';


export default {
    '/student': {
      summary: 'Get all student',
      description: 'Get all student in the database',
      get: {
        tags: ['Student'],
        summary: 'Get all student',
        responses: studentsResponse,
      },
      post: {
        tags: ['Student'],
        summary: 'create a new student',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Students',
              },
            },
          },
        },
        responses: studentsResponse,
      },
      put: {
        tags: ['Student'],
      },
    },
    '/student/{id}': {
      summary: 'Get one student with given id',
      description: 'Get one student with given id',
      get: {
        tags: ['Student'],
        summary: 'Get one student with given id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the student to get',
          },
        ],
        responses: studentsResponse,
      },
      delete: {
        tags: ['Student'],
        summary: 'Delete a student with id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1,
            },
            description: 'ID of the student to delete',
          },
        ],
      },
    },
};