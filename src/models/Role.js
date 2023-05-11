import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Role",
  tableName: "Roles",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    lable: {
      type: "varchar",
    },
  },
  relations: {
    users: {
      target: "User",
      type: "one-to-many",
      joinColumn: {
        name: "role_id",
      },
      onDelete: "CASCADE",
    },
  },
});