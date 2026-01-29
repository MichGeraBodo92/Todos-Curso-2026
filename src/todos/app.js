import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases/index';

const elementIds = {
    TodoList : '.todo-list',
    NewTodoInput : '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLable: '#pending-cout',
}

//ESTA FUNCION RENDERIZARA LA APLICACION EN LA PANTALLA
/**
 * Pasar por argumento un elemento HTML
 * @param { String } elementId 
 */
export const App = ( elementId ) => {
    //FUNCION FLECHA PARA RENDERIZAR LOS TODOS EN NUESTRO HTML
    const displayTodos = () => {
        const todos = todoStore.getTodo( todoStore.getCurretFilter() );
        renderTodos( elementIds.TodoList, todos );
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(PendingCountLable);
    };

    (() => {
        const app = document.createElement( 'div' );
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    })();

    //REFERENCIAS HTML
    const newDescriptionInput = document.querySelector( elementIds.NewTodoInput );
    const todoListUL = document.querySelector( elementIds.TodoList );
    const clearCompletedButton = document.querySelector(elementIds.ClearCompleted);
    const filtersUL = document.querySelectorAll(elementIds.TodoFilters);

    //LISTENERS
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;
        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroy = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if ( !element || !isDestroy ) return;
        todoStore.deleteTodo( element.getAttribute( 'data-id' ) );
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersUL.forEach(element => {
        element.addEventListener( 'click', (element) => {
            filtersUL.forEach( element2 => element2.classList.remove('selected') );
            element.target.classList.add('selected');
            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                    break;
            }
            displayTodos();
        } );
    });
}


