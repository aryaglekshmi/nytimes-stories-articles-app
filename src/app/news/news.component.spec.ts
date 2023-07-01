// State: The application's state is represented by a central store, which in this case will include an array of todo items.

// Actions: Actions describe the changes to be made to the state. In our example, we'll have the following actions:
// AddTodo: Adds a new todo item.
// DeleteTodo: Deletes a todo item.
// ToggleTodo: Toggles the completed status of a todo item.
// LoadTodos: Loads the initial todo items from an external source.
// LoadTodosSuccess: Indicates a successful loading of todo items.
// LoadTodosFailure: Indicates a failure in loading todo items.

// Reducers: Reducers are pure functions that handle actions and update the state accordingly. In our example, we'll have a single reducer called todoReducer that will handle all todo-related actions. It will take the current state and the dispatched action as input and return a new state.

// function todoReducer(state: Todo[] = [], action: TodoActions): Todo[] {
//   switch (action.type) {
//     case TodoActionTypes.AddTodo:
//       return [...state, action.payload];
//     case TodoActionTypes.DeleteTodo:
//       return state.filter(todo => todo.id !== action.payload);
//     case TodoActionTypes.ToggleTodo:
//       return state.map(todo =>
//         todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
//       );
//     case TodoActionTypes.LoadTodosSuccess:
//       return action.payload;
//     default:
//       return state;
//   }
// }
// Effects: Effects allow you to perform side effects, such as HTTP requests, based on dispatched actions. In our example, we'll use an effect to load the initial todo items from an external source. We'll define a loadTodosEffect that listens for the LoadTodos action, performs an asynchronous operation (e.g., an HTTP request), and dispatches the appropriate success or failure action.

// typescript
// @Injectable()
// export class TodoEffects {
//   loadTodos$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(TodoActionTypes.LoadTodos),
//       mergeMap(() =>
//         this.todoService.getTodos().pipe(
//           map(todos => TodoActions.loadTodosSuccess(todos)),
//           catchError(error => of(TodoActions.loadTodosFailure(error.message)))
//         )
//       )
//     )
//   );

//   constructor(private actions$: Actions, private todoService: TodoService) {}
// }
// Selectors: Selectors are functions that extract specific slices of state from the store. They provide a way to access the state in a controlled and efficient manner. In our example, we'll create a selectTodos selector to retrieve the todo items from the state.

// export const selectTodos = (state: AppState) => state.todos;
// Component Interaction: In our Angular component, we can interact with the store by dispatching actions and selecting specific parts of the state.

// export class TodoListComponent implements OnInit {
//   todos$: Observable<Todo[]>;

//   constructor(private store: Store<AppState>) {}

//   ngOnInit() {
//     this.todos$ = this.store.select(selectTodos);
//     this.store.dispatch(TodoActions.loadTodos());
//   }

//   addTodo() {
//     const todo: Todo = { id: uuid(), text: 'New Todo', completed: false };
//     this.store.dispatch(TodoActions.addTodo(todo));
//   }

//   deleteTodo(todoId: string) {
//     this.store.dispatch(TodoActions.deleteTodo(todoId));
//   }

//   toggleTodoCompletion(todoId: string) {
//     this.store.dispatch(TodoActions.toggleTodo(todoId));
//   }
// }
// Component Subscription: In the component's template, we can use the async pipe to subscribe to the todos$ observable and automatically update the view whenever the state changes.

// html
// Copy code
// <ul>
//   <li *ngFor="let todo of todos$ | async" [class.completed]="todo.completed">
//     <span>{{ todo.text }}</span>
//     <button (click)="toggleTodoCompletion(todo.id)">Toggle</button>
//     <button (click)="deleteTodo(todo.id)">Delete</button>
//   </li>
// </ul>
// <button (click)="addTodo()">Add Todo</button>
// That's the complete flow! To summarize, here's how it works:

// The component dispatches actions to the store.
// The actions are passed to the reducers, which update the state accordingly.
// Side effects (e.g., HTTP requests) can be handled by effects, which dispatch additional actions.
// The updated state is made available to the component through selectors.
// The component subscribes to the state changes and updates the view accordingly.
// This flow ensures a unidirectional data flow, centralized state management, and separation of concerns, making it easier to understand, test, and maintain the Angular application.
// import { TestBed } from '@angular/core/testing';
// import { StoreModule } from '@ngrx/store';
// import { NewsComponent } from './news.component';
// import { newsReducer } from './redux/news.reducer';
// import { NewsCardsComponent } from './news-cards/news-cards.component';
// import { NewsService } from './redux/news.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('NewsComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [NewsComponent, NewsCardsComponent],
//       imports: [
//         StoreModule.forRoot({ news: newsReducer }),
//         HttpClientTestingModule,
//       ],
//       providers: [NewsService],
//     }).compileComponents();
//   });
// });
