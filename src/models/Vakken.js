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
    description: {
      type: 'text',
    },
    abbreviation: {
      type: 'varchar',
    }
  },
  relations: {
    commands: {
      target: "commands",
      type: "one-to-many",
      cascade: true,
      onDelete: "CASCADE",
      inverseSide: "vakken",
    },
    oefeningen: {
      target: "oefeningen",
      type: "one-to-many",
      cascade: true,
      inverseSide: "vak",
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
