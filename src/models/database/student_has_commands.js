import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'student_has_commands',
  tableName: 'student_has_commands',
  columns: {
    student_iduser: {
      type: 'int',
      nullable: false,
      primary: true,
    },
    student_personen_id_leerling: {
      type: 'int',
      nullable: false,
      primary: true,
    },
    student_klassen_idklassen: {
      type: 'int',
      nullable: false,
      primary: true,
    },
    commands_idcommands: {
      type: 'int',
      nullable: false,
      primary: true,
    },
    commands_vakken_idvakken: {
      type: 'int',
      nullable: false,
      primary: true,
    },
  },
  indices: [
    {
      name: 'fk_student_has_commands_student1_idx',
      columnNames: ['student_iduser', 'student_personen_id_leerling', 'student_klassen_idklassen'],
      isUnique: false,
    },
    {
      name: 'fk_student_has_commands_commands1_idx',
      columnNames: ['commands_idcommands', 'commands_vakken_idvakken'],
      isUnique: false,
    },
  ],
  relations: {
    student: {
      target: 'student',
      type: 'many-to-one',
      joinColumns: [
        { name: 'student_iduser', referencedColumnName: 'iduser' },
        { name: 'student_personen_id_leerling', referencedColumnName: 'personen_id_leerling' },
        { name: 'student_klassen_idklassen', referencedColumnName: 'klassen_idklassen' },
      ],
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    },
    command: {
      target: 'commands',
      type: 'many-to-one',
      joinColumns: [
        { name: 'commands_idcommands', referencedColumnName: 'idcommands' },
        { name: 'commands_vakken_idvakken', referencedColumnName: 'vakken_idvakken' },
      ],
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    },
  },
});
