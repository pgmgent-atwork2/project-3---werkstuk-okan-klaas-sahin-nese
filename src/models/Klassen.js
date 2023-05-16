import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'klassen',
  tableName: 'klassen',
  columns: {
    id_klassen: {
      type: 'int',
      primary: true,
      name: 'idklassen',
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
        joinColumns: [{ name: "id_klassen", referencedColumnName: "id_klassen" }],
        inverseJoinColumns: [{ name: "id_vakken", referencedColumnName: "id_vakken" }],
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
