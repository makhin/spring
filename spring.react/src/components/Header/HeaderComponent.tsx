import * as React from 'react';
import { TodoModel } from '../../models/TodoModel';
import TodoTextInputComponent from "../TodoTextInput/TodoTextItemComponent";
import {FormGroup} from "reactstrap";

export interface HeaderProps {
  addTodo: (todo: Partial<TodoModel>) => any;
}

export interface HeaderState {
}

export class Header extends React.Component<HeaderProps, HeaderState> {
  private handleSave = (text: string) => {
    if (text.length) {
      this.props.addTodo({ text });
    }
  };

  render() {
    return (
      <header>
        <h1>Todos</h1>
          <FormGroup>
            <TodoTextInputComponent
              newTodo
              onSave={this.handleSave}
              placeholder="What needs to be done?"
            />
          </FormGroup>
      </header>
    );
  }
}