import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'staf',
  tableName: 'staf',
  columns: {
    id_staf: {
      type: 'int',
      primary: true,
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
    avatar: {
      type: 'varchar',
      nullable: true,
    },
  },
  relations: {
    role: {
      target: "role",
      type: "many-to-one",
      cascade: true,
      inverseSide: "staf",
    },
    meta: {
      target: "usermeta",
      type: "one-to-one",
      cascade: true,
      inverseSide: "staf",
    },
  },
});