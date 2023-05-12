import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'stafKlassenVakken',
  tableName: 'staf_has_klassen_has_vakken',
  columns: {
    staf_iduser: { 
        type: Number, 
        primary: true 
    },
    klassen_has_vakken_klassen_idklassen: { 
        type: Number, 
        primary: true 
    },
    klassen_has_vakken_vakken_idvakken: { 
        type: Number, 
        primary: true 
    },
  },
  relations: {
    staf: {
      target: 'Staf',
      type: 'many-to-one',
      joinColumn: {
        name: 'staf_iduser',
        referencedColumnName: 'iduser',
      },
    },
    klassen_has_vakken: {
      target: 'klassenVakken',
      type: 'many-to-one',
      joinColumns: [
        {
          name: 'klassen_has_vakken_klassen_idklassen',
          referencedColumnName: 'klassen_idklassen',
        },
        {
          name: 'klassen_has_vakken_vakken_idvakken',
          referencedColumnName: 'vakken_idvakken',
        },
      ],
    },
  },
});



