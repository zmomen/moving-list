import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTodoCategories } from "./redux/actions/todoActions";
import "spectre.css";
import "./App.css";
import TodoList from "./todo/TodoList";
import Nav from "./common/Nav";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };
    this.props.getTodoCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todos !== this.props.todos) {
      this.setState({ todos: nextProps.todos });
    }
  }

  render() {
    return (
      <div>
        <div className="container grid-lg">
          <Nav />
          <TodoList data={this.state.todos} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTodoCategories }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
