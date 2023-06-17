import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'Commands',
  tableName: 'commands',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    inhoud: {
      type: 'varchar',
    },
  },
  relations: {
    vakken: {
      target: "vakken",
      type: "many-to-one",
      onDelete: "CASCADE",
      joinColumn: {
        name: "vakken_id",
      },
      inverseSide: "commands",
    },
    student: {
      type: "many-to-many",
      target: "student",
      joinTable: {
        name: "student_has_commands",
        joinColumns: [{ name: "id_commands", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "id_student", referencedColumnName: "id" }],
      },
    },
  },
});