import {Todo} from '../models/todo.model';

/**
 * Recibiremos el TODO para poder crear el HTML que lo contendra
 * @param {Todo} todo 
 */
export const createTodoHTML = ( todo ) => {
    if( !todo ) throw new Error('A todo Object is required');
    
    const { description,done, id } = todo;

    const html = `
		<div class="view">
			<input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
			<label>${description}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
    `;
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);
    if(done){
        liElement.classList.add('completed');
    }

    return liElement;
};

