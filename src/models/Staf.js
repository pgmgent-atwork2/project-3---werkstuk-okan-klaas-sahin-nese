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
    Email: {
      type: 'varchar',
      nullable: true,
    },
    Pasword: {
      type: 'varchar',
      nullable: true,
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