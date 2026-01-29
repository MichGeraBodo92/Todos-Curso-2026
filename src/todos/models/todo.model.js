//ESTA IMPORTACION NOS AYUDA A CREAR UN ID AUTOMATICO
import { v4 as uuid } from 'uuid';

export class Todo{
    /**
     * Es una clase para construir instancias de los todos, requiere la tarea a realizar
     * @param {String} description 
     */
    constructor( description ){
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createAt = new Date();
    }
};

