import JavaScript from "../a3/JavaScript";
import PathParameters from "../a3/PathParameters";
import Classes from "../a3/Classes";
import Styles from "../a3/Styles";
import ConditionalOutput from "../a3/ConditionalOutput";
import TodoList from "../a3/todo";
import { useSelector } from "react-redux";

function Assignment3() {
  const { todos } = useSelector((state) => state.todosReducer);

    return (
      <div className="container">
        <h1>Assignment 3</h1>

        <ul className="list-group">
          {todos.map((todo) => (
            <li className="list-group-item" key={todo.id}>
              {todo.title}
            </li>
          ))}
        </ul>
        <TodoList />
        <ConditionalOutput />
        <Styles />
        <Classes/>
        <PathParameters />
        <JavaScript/>
      </div>
    );
  }
  export default Assignment3;