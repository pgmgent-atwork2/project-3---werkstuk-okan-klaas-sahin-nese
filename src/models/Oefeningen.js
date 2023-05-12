import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'oefeningen',
  tableName: 'oefeningen',
  columns: {
    id_oefeningen: {
      type: Number,
      primary: true,
    },
    naam: {
      type: 'varchar',
      nullable: true,
    },
    link: {
      type: 'varchar',
      nullable: true,
    },
    niveau: {
      type: 'varchar',
      nullable: true,
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
