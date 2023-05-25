import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'Vakken',
  tableName: 'vakken',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    naam: {
      type: 'varchar',
    },
    vakcomentaar: {
      type: 'text',
    }
  },
  relations: {
    commands: {
      target: "commands",
      type: "one-to-many",
      joinColumn: {
        name: "vakken_id",
      },
      onDelete: "CASCADE",
    },
    oefeningen: {
      target: "oefeningen",
      type: "one-to-many",
      joinColumn: {
        name: "vakken_id",
      },
      onDelete: "CASCADE",
    },
    klassen: {
      type: "many-to-many",
      target: "klassen",
      joinTable: {
        name: "klassen_has_vakken",
        joinColumns: [{ name: "id_vakken", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "id_klassen", referencedColumnName: "id" }],
      },
    },
    staf: {
      type: "many-to-many",
      target: "staf",
      joinTable: {
        name: "staf_has_vakken",
        joinColumns: [{ name: "id_vakken", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "id_staf", referencedColumnName: "id" }],
      },
    },
    
  },
});
