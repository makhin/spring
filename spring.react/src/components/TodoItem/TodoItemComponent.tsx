import * as React from 'react';
import * as classNames from 'classnames';
import { TodoTextInputComponent } from '../TodoTextInput/TodoTextItemComponent';
import { TodoModel } from '../../models/TodoModel';
import {Button, FormGroup, Input, Label, ListGroupItem} from "reactstrap";

export interface TodoActions {
  editTodo: (id: number, data: Partial<TodoModel>) => any;
  deleteTodo: (id: number) => any;
}

export interface TodoProps extends TodoActions {
  todo: TodoModel;
}

export interface TodoState {
  editing: boolean;
}

export class TodoItemComponent extends React.Component<TodoProps, TodoState> {
  constructor(props?: TodoProps, context?: any) {
    super(props, context);
    this.state = { editing: false };
  }

  private handleDoubleClick = (e: React.SyntheticEvent<any>) => {
    this.setState({ editing: true });
  };

  private handleToggleCheckbox = (e: React.SyntheticEvent<any>) => {
    const { todo } = this.props;
    const target = e.target as any;
    if (
      target &&
      target.checked !== undefined &&
      target.checked !== todo.completed
    ) {
      this.updateTodo({ completed: target.checked });
    }
  };

  private handleClickDeleteButton = (e: React.SyntheticEvent<any>) => {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  };

  private updateTodo = (data: Partial<TodoModel>) => {
    const { todo } = this.props;
    if (data.text !== undefined && data.text.trim().length === 0) {
      this.props.deleteTodo(todo.id);
    } else {
      this.props.editTodo(todo.id, data);
    }
    this.setState({ editing: false });
  };

  render() {
    const { todo } = this.props;

    const element = this.state.editing ? (
      <TodoTextInputComponent
        text={todo.text}
        editing={this.state.editing}
        onSave={(text) => this.updateTodo({ text })}
      />
    ) : (
      <FormGroup check className="mb-2 mr-sm-2 mb-sm-0">
        <Label check onDoubleClick={this.handleDoubleClick} className="mr-sm-2">
            <Input type="checkbox" checked={todo.completed} onChange={this.handleToggleCheckbox} />
            {todo.text}
        </Label>
        <Button color="primary" onClick={this.handleClickDeleteButton}>Delete</Button>
      </FormGroup>
    );

    const classes = classNames({
        ["completed"]: todo.completed,
        ["editing"]: this.state.editing,
        ["normal"]: !this.state.editing
    });

    return <ListGroupItem className={classes}>{element}</ListGroupItem>;
  }
}