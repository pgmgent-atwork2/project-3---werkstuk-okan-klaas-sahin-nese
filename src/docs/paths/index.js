import Student from './students.js';
import Staf from './staf.js';
import Commands from './commands.js';
import Exercises from './exercises.js';
import Klassen from './klassen.js';
import Usermeta from './usermeta.js';
import Vakken from './vakken.js';
export default {
...Student,
...Staf,
...Commands,
...Exercises,
...Klassen,
...Usermeta,
...Vakken,
}