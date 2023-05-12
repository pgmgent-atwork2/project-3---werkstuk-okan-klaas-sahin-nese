import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'role',
  tableName: 'role',
  columns: {
    id_role: {
      type: Number,
      primary: true,
    },
    label: {
      type: String,
      nullable: true,
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
