import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: "Commands",
  tableName: "commands",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    tekst: {
      type: "varchar",
    },
    leerkracht: {
      type: "varchar",
    }
  },
  relations: {
    
}
});
