import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'vakken',
  tableName: 'vakken',
  columns: {
    id_vakken: {
      type: 'int',
      primary: true,
      name: 'idvakken',
    },
    naam: {
      type: 'varchar',
      nullable: true,
    },
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
        joinColumns: [{ name: "id_vakken", referencedColumnName: "id_vakken" }],
        inverseJoinColumns: [{ name: "id_klassen", referencedColumnName: "id_klassen" }],
      },
    },
  },
});
