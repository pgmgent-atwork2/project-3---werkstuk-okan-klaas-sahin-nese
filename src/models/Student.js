import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
    name: 'student',
      tableName: 'student',
      columns: {
        id_student: {
          type: 'int',
          primary: true,
          name: 'iduser',
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
            joinColumns: [{ name: "id_student", referencedColumnName: "id_student" }],
            inverseJoinColumns: [{ name: "id_oefeningen", referencedColumnName: "id_oefeningen" }],
          },
        },
        commands: {
          type: "many-to-many",
          target: "commands",
          joinTable: {
            name: "student_has_commands",
            joinColumns: [{ name: "id_student", referencedColumnName: "id_student" }],
            inverseJoinColumns: [{ name: "id_commands", referencedColumnName: "id_commands" }],
          },
        },
    },
});