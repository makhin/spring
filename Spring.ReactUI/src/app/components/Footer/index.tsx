import * as React from 'react';
import {
  TodoFilter,
  TODO_FILTER_TITLES,
  TODO_FILTER_TYPES
} from 'app/constants';

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
    const { onChangeFilter } = this.props;

    return (
      <a
        style={{ cursor: 'pointer' }}
        onClick={() => onChangeFilter(filter)}
      >
        {title}
      </a>
    );
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <button onClick={onClearCompleted} />
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

export default Footer;
