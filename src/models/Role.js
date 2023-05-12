import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'role',
  tableName: 'role',
  columns: {
    id_role: {
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
      joinColumn: {
        name: "role_id",
      },
      onDelete: "CASCADE",
    },
  },  
});
