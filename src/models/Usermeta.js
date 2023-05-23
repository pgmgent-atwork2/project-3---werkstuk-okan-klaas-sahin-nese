import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'usermeta',
  tableName: 'usermeta',
  columns: {
    id_meta: {
      type: Number,
      primary: true,
    },
    adres: {
      type: 'varchar',
      nullable: true,
    },
    geboortedatum: {
      type: 'varchar',
      nullable: true,
    },
    voornaam: {
      type: 'varchar',
      name: 'voornaam',
    },
    achternaam: {
      type: 'varchar',
      name: 'naam',
    },
    geboorteplaats: {
      type: 'varchar',
      name: 'naam',
    },
  },
  relations: {
    student: {
      target: "student",
      type: "one-to-one",
      joinColumn: {
        name: "student_id",
      },
      onDelete: "CASCADE",
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

