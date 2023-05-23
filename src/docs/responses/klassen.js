export default {
    200: {
      description: 'Successful response',
      content: {
        'application/json': {
          schemas: {
            $ref: '#/components/schemas/klassen',
          },
        },
      },
    },
  };
  