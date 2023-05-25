import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'Oefeningen',
  tableName: 'oefeningen',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    naam: {
      type: 'varchar',
    },
    link: {
      type: 'varchar',
    },
    niveau: {
      type: 'int',
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
        joinColumns: [{ name: "id_oefeningen", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "id_student", referencedColumnName: "id" }],
      },
    },
  },
});
