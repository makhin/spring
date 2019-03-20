import * as React from 'react';
import { TodoItemComponent, TodoActions } from '../TodoItem/TodoItemComponent';
import { TodoModel } from '../../models/TodoModel';
import {Form, FormGroup, Input, Label, ListGroupItem} from "reactstrap";

export interface TodoListProps extends TodoActions {
  todos: TodoModel[];
  completeAll: () => any;
}

export interface TodoListState {}

export class TodoListComponent extends React.Component<TodoListProps, TodoListState> {
  constructor(props?: TodoListProps, context?: any) {
    super(props, context);
  }

  private handleToggleAll = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    this.props.completeAll();
  };

  renderToggleAll() {
    const { todos } = this.props;
    const completedCount = todos.length;
    if (todos.length > 0) {
      return (
          <ListGroupItem>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" checked={completedCount === todos.length} onChange={this.handleToggleAll} />
                    Check all
                </Label>
            </FormGroup>
          </ListGroupItem>
      );
    }
  }

  render() {
    const { todos, ...actions } = this.props;
    return (
      <section>
      <Form>
          {this.renderToggleAll()}
          {todos.map((todo) => (
            <TodoItemComponent key={todo.id} todo={todo} {...actions} />
          ))}
        </Form>
      </section>
    );
  }
}