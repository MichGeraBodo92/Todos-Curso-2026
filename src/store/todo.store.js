//IMPORTAMOS LA CLASE TODO PARA CREAR OBJETOS DE ESTA CLASE.
import {Todo} from '../todos/models/todo.model';

//CREAMOS UN OBJETO CON LOS TRES FILTROS QUE USAREMOS PARA CATALOGAR LOS TODOS.
export const Filters = {
    All : 'all',
    Completed: 'Completed',
    Pending: 'Pending',
};

//EL ESTADO GENERAL DE NUESTROS DATOS DE LA APLICACION.
const state = {
    todos: [
        new Todo('Gema del Espacio'),
        new Todo('Gema de la Mente'),
        new Todo('Gema de la Realidad'),
        new Todo('Gema del Poder'),
        new Todo('Gema del Tiempo'),
        new Todo('Gema del Alma'),
    ],
    filter: Filters.All,
};

const initStore = () => {
    loadStore();
    console.log('InitStore 🍑');
};

const loadStore = () => {
    if( !localStorage.getItem('state')) return;
    const {todos = [], filter = Filters.All} = JSON.parse( localStorage.getItem( 'state' ) );
    state.todos = todos;
    state.filter = filter;
};

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
};

//REGRESA LA LISTA DE LOS TODOS DE ACUERDO A SU FILTRO(TODOS, COMPLETADOS Y PENDIENTES)
/**
 * 
 * @param {} filter 
 * @returns 
 */
const getTodo = ( filter = Filters.All ) => {
    switch( filter ){
        case Filters.All:
            return state.todos;
        case Filters.Completed:
            return state.todos.filter( todo => todo.done );
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);
        default:
            throw new Error(`Option ${ filter } is not Valid`);
    };
};


//AGREGAR UN NUEVO TODO A LA LISTA DE TODOS.
/**
 * Mandar la tarea o el pendiente del TODO para ser añadido, dato del tipo String
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if(!description) throw new Error('DescripTion is required');
    state.todos.push( new Todo(description) );
    saveStateToLocalStorage();
};

//OPCION DISEÑADA PARA MARCAR O DESMARCAR UN TODO COMO COMPLETADO O PENDIENTE.
/**
 * SE MANDA COMO PARAMETRO UN ID DEL TODO
 * @param {ID} todoId 
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo
    } );
    saveStateToLocalStorage();
};

//OPCION CREADA PARA ELIMINAR UN TODO DE LA LISTA
/**
 * Requiere el Id de el TODO a eliminar
 * @param {ID} todoId 
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateToLocalStorage();
};

//OPCION DISEÑADA PARA ELIMINAR LOS TODOS QUE ESTEN MARCADOS COMO COMPLETOS
/**
 * Funcion que elimina todos los TODOS que esten marcados como completados.
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage();
};


//OPCION DISEÑADA PARA ESTABLECER UN FILTRO DE LA LISTA DE TODOS(COMPLETE, TODOS, PENDIENTES)
/**
 * Funcion para cambiar el tipo de filtro de los TODOS
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
};

//MUESTRA EL FILTRO QUE SE TIENE ACTUALMENTE EN EL STATE CUANDO SE MANDA A LLAMAR LA FUNCION
const getCurretFilter = () => {
    return state.filter;
};


export default{
    initStore,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurretFilter,
    getTodo,
    Filters,
}
