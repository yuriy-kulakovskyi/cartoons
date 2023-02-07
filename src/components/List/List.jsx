import React, { useState, useEffect } from 'react';
import Todo from './Todo/Todo';
import "./List.scss";

const List = () => {
  // episodes state
  const [episodes, setEpisodes] = useState([]);

  // check for the dropdown menu
  const [isOpen, setIsOpen] = useState(true);

  // todo list
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem("todoList")) || []);

  // name of the episode you search
  const [name, setName] = useState("");

  // useEffect to fetch episodes
  useEffect(() => {
    // Fetching...
    fetch(`https://rickandmortyapi.com/api/episode/?name=${name}`)
    .then(response => response.json())
    .then(data => {
      // setting the episodes array
      setEpisodes(data.results);
    })
  }, [name]);

  // Click on the dropdown item
  const itemClickHandler = e => {
    setName(e.target.textContent);
    setIsOpen(!isOpen);
  }

  // Click on the input
  const inputClickHandler = () => {
    setIsOpen(true);
  }

  // addTodo function
  const addTodo = () => {
    todoList.push({_id: todoList.length, name: name, isChecked: false});
    setName("");
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  //Check todo
  const toggleCheckedTodo = idx => {
    const newArray = [].concat(todoList);
    newArray[idx].isChecked = !newArray[idx].isChecked;
    setTodoList(newArray);
    localStorage.setItem("todoList", JSON.stringify(newArray));
  }

  // Delete todo item
  const deleteTodo = idx => {
    const newArray = [].concat(todoList);
    newArray.splice(idx, 1);
    setTodoList(newArray);
    localStorage.setItem("todoList", JSON.stringify(newArray));
  }

  const sortedTodo = todoList.sort((a, b) => b.isChecked - a.isChecked);

  // HTML
  return (
    <section className="watchList" id="watchList">
      {/* Container */}
      <div className="watchList__container container">

        {/* Title */}
        <h1 className="watchList__container__title">my watch list</h1>

        <h3 className="watchList__container__noTodo">{sortedTodo[0] === undefined ? "Add episodes you want to watch later" : ""}</h3>

        {/* Input to search episodes from the API */}
        <div className="col">
          <div className="row">
            <input 
              type="text"
              value={name}
              placeholder="Search for episodes..."
              className="watchList__container__input"
              onChange={e => setName(e.target.value)}
              onClick={inputClickHandler}
            />

            {/* Add todo button */}
            <button 
              className="watchList__container__button"
              onClick={addTodo}
            >
              +
            </button>
          </div>

          {/* Dropdown menu */}
          <ul className="watchList__container__dropdown">
            {episodes && name && isOpen ? episodes.map((item, key) => {
              return (
                <li 
                  className="watchList__container__dropdown__item"
                  key={key}
                  onClick={itemClickHandler}
                >
                  {item.name}
                </li>
              )
            })
            : null
          }
          </ul>
        </div>

        {/* ToDo */}
        <div className="watchList__container__todo">
          {sortedTodo ? sortedTodo.map((item, idx) => {
            return <Todo 
                      key={`_todo_${idx}`} 
                      name={item.name} i
                      isChecked={item.isChecked} 
                      toggleCheckedTodo={toggleCheckedTodo}
                      deleteTodo={deleteTodo}
                      idx={idx}
                    />
          })
          : null
        }
        </div>
      </div>
    </section>
  );
}

export default List;
