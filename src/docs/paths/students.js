import studentsResponse from '../responses/students.js'

export default {
    '/student': {
      summary: 'Get all students',
      description: 'Get all students in the database',
      get: {
        tags: ['Student'],
        summary: 'Get all Students',
        responses: studentsResponse,
      },
      post: {
        tags: ['Student'],
        summary: 'create a new Student',
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
    }
  };