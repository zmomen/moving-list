import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTodoCategories } from "../redux/actions/todoActions";

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        todos: []
    };
  }
  render() {
      return (
          <>
              HERE tlist!
          </>
      )
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
)(TodoList);
