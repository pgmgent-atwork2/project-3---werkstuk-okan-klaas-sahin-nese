const { EntitySchema } = typeorm;

export default new EntitySchema({

  name: 'role',

  tableName: 'role',

  columns: {

    id: {

      type: 'int',

      primary: true,

    },

    label: {

      type: "varchar",

    },

  },

  relations: {

    staf: {

      target: "staf",

      type: "one-to-many",

      cascade: true,

      inverseSide: "role"

    },

  },  

});
