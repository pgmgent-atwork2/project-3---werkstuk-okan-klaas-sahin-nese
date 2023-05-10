import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: "Oefeningen",
  tableName: "oefeningen",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    naam: {
      type: "varchar",
    },
    link: {
      type: "varchar",
    },
    niveau: {
      type: "varchar",
    }
  },
  relations: {
    
}
});
