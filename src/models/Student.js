import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
    name: 'Student',
      tableName: 'student',
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
        meta: {
          target: "usermeta",
          type: "one-to-one",
          cascade: true,
          inverseSide: "student",
        },
        klassen: {
          target: "klassen",
          type: "many-to-one",
          cascade: true,
          inverseSide: "student",
        },
        oefeningen: {
          type: "many-to-many",
          target: "oefeningen",
          joinTable: {
            name: "student_has_oefeningen",
            joinColumns: [{ name: "id_student", referencedColumnName: "id" }],
            inverseJoinColumns: [{ name: "id_oefeningen", referencedColumnName: "id" }],
          },
        },
        commands: {
          type: "many-to-many",
          target: "commands",
          joinTable: {
            name: "student_has_commands",
            joinColumns: [{ name: "id_student", referencedColumnName: "id" }],
            inverseJoinColumns: [{ name: "id_commands", referencedColumnName: "id" }],
          },
        },
    },
});