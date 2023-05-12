import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'commands',
  tableName: 'commands',
  columns: {
    id_commands: {
      type: Number,
      primary: true,
    },
    inhoud: {
      type: String,
      nullable: true,
    },
  },
  relations: {
    vakken: {
      target: "vakken",
      type: "many-to-one",
      cascade: true,
      inverseSide: "commands",
    },
    student: {
      type: "many-to-many",
      target: "student",
      joinTable: {
        name: "student_has_commands",
        joinColumns: [{ name: "id_commands", referencedColumnName: "id_commands" }],
        inverseJoinColumns: [{ name: "id_student", referencedColumnName: "id_student" }],
      },
    },
  },
});