import * as React from 'react';
import * as classNames from 'classnames';

import {
  TodoFilter,
  TODO_FILTER_TITLES,
  TODO_FILTER_TYPES
} from '../../constants/todos';
import {Button} from "reactstrap";

export interface FooterProps {
  filter: TodoFilter;
  activeCount: number;
  completedCount: number;
  onChangeFilter: (filter: TodoFilter) => any;
  onClearCompleted: () => any;
}

export interface FooterState {
  /* empty */
}

export class Footer extends React.Component<FooterProps, FooterState> {
  renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter: TodoFilter) {
    const title = TODO_FILTER_TITLES[filter];
      const { filter: selectedFilter, onChangeFilter } = this.props;
      const className = classNames({
          ["selected"]: filter === selectedFilter
      });

      return (
          <Button color="link" className={className} style={{ cursor: 'pointer' }} onClick={() => onChangeFilter(filter)}>
              {title}
          </Button>
      );
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
          <Button color="primary" onClick={onClearCompleted} >Clear Completed</Button>
      );
    }
  }

  render() {
    return (
      <footer>
        {this.renderTodoCount()}
        <ul>
          {TODO_FILTER_TYPES.map((filter) => (
            <li key={filter} children={this.renderFilterLink(filter)} />
          ))}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}