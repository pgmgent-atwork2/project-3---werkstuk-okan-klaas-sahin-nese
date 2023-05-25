import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'Klassen',
  tableName: 'klassen',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    naam: {
      type: 'varchar',
    },
  },
  relations: {
    student: {
      target: "student",
      type: "one-to-many",
      joinColumn: {
        name: "klassen_id",
      },
      onDelete: "CASCADE",
    },
    vakken: {
      type: "many-to-many",
      target: "vakken",
      joinTable: {
        name: "klassen_has_vakken",
        joinColumns: [{ name: "id_klassen", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "id_vakken", referencedColumnName: "id" }],
      },
    },
    staf: {
      target: "staf",
      type: "one-to-one",
      joinColumn: {
        name: "staf_id",
      },
      onDelete: "CASCADE",
    },
  },  
});
