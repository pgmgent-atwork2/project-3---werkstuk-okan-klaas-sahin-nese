import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    voornaam: {
        type: "varchar",
    },
    achternaam: {
        type: "varchar",
    },
    avatar: {
        type: "varchar",
    },
  },
  relations: {
    role: {
      target: "Role",
      type: "many-to-one",
      cascade: true,
      inverseSide: "users",
    }
}
});
