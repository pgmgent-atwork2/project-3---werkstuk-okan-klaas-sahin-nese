import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: 'Staf',
  tableName: 'staf',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
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
      joinColumn: {
        name: "role_id",
      }
    },
    meta: {
      target: "usermeta",
      type: "one-to-one",
      cascade: true,
      inverseSide: "staf",
    },
    klassen: {
      target: "klassen",
      type: "one-to-one",
      cascade: true,
      inverseSide: "staf",
    },
    vakken: {
      type: "many-to-many",
      target: "vakken",
      joinTable: {
        name: "staf_has_vakken",
        joinColumns: [{ name: "id_staf", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "id_vakken", referencedColumnName: "id" }],
      },
    },
  },
});
