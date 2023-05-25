import typeorm from 'typeorm';

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'Usermeta',
  tableName: 'usermeta',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    adres: {
      type: 'varchar',
      nullable: true,
    },
    geboortedatum: {
      type: 'varchar',
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
      name: 'geboorteplaats',
      nullable: true,
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

