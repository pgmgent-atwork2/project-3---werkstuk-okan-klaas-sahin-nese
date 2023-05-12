import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'oefeningen',
  tableName: 'oefeningen',
  columns: {
    id_oefeningen: {
      type: 'int',
      primary: true,
    },
    naam: {
      type: 'varchar',
    },
    link: {
      type: 'varchar',
    },
    niveau: {
      type: 'varchar',
    },
  },
  relations: {
    vakken: {
      target: "vakken",
      type: "many-to-one",
      cascade: true,
      inverseSide: "oefeningen",
    },
    student: {
      type: "many-to-many",
      target: "student",
      joinTable: {
        name: "student_has_oefeningen",
        joinColumns: [{ name: "id_oefeningen", referencedColumnName: "id_oefeningen" }],
        inverseJoinColumns: [{ name: "id_student", referencedColumnName: "id_student" }],
      },
    },
  },
});
