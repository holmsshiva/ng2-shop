import { Component, OnInit } from '@angular/core';

import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  public todos;
  public activeTasks;
  public newTodo;
  public path;

  constructor(private productService: ProductService) { }

  	getProducts(){
	    return this.productService.get().then(todos => {
	      this.todos = todos;
	      this.activeTasks = this.todos.filter(todos => todos.isDone).length;
	    });
	}

    addTodo(){
	  this.productService.add({ title: this.newTodo, isDone: false }).then(() => {
	    return this.getProducts();
	  }).then(() => {
	    this.newTodo = ''; // clear input form value
	  });
	}

	updateTodo(todo, newValue) {
	  todo.title = newValue;
	  return this.productService.put(todo).then(() => {
	    todo.editing = false;
	    return this.getProducts();
	  });
	}

	destroyTodo(todo) {
	  this.productService.delete(todo).then(() => {
	    return this.getProducts();
	  });
	}
  	ngOnInit() {
      this.getProducts();
  	}
}
