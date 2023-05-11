import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: "Klassen",
  tableName: "klassen",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    naam: {
      type: "varchar",
    }
  },
  relations: {
    
}
});
