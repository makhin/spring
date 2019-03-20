import * as React from 'react';
import * as classNames from 'classnames';
import {Input} from "reactstrap";

export interface TodoTextInputProps {
  text?: string;
  placeholder?: string;
  newTodo?: boolean;
  editing?: boolean;
  onSave: (text: string) => any;
}

export interface TodoTextInputState {
  text: string;
}

export class TodoTextInputComponent extends React.Component<
  TodoTextInputProps,
  TodoTextInputState
> {
  constructor(props?: TodoTextInputProps, context?: any) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }

  private handleSubmit = (e) => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  };

  private handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  private handleBlur = (e) => {
    const text = e.target.value.trim();
    if (!this.props.newTodo) {
      this.props.onSave(text);
    }
  };

  render() {
    const classes = classNames({
        "edit": this.props.editing,
        "new": this.props.newTodo
    });

    return (
      <Input
          className={classes}
          type="text"
          autoFocus
          placeholder={this.props.placeholder}
          value={this.state.text}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
      />
    );
  }
}

export default TodoTextInputComponent;
