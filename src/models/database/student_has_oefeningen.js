import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'studentOefeningen',
  tableName: 'student_has_oefeningen',
  columns: {
    student_iduser: { 
        type: Number, 
        primary: true 
    },
    oefeningen_idoefeningen: { 
        type: Number, 
        primary: true 
    },
    score: { 
        type: Number 
    },
  },
  relations: {
    student: {
      target: 'student',
      type: 'many-to-one',
      joinColumn: {
        name: 'student_iduser',
        referencedColumnName: 'iduser',
      },
    },
    oefeningen: {
      target: 'oefeningen',
      type: 'many-to-one',
      joinColumn: {
        name: 'oefeningen_idoefeningen',
        referencedColumnName: 'idoefeningen',
      },
    },
  },
});