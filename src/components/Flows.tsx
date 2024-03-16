import React, { useState, useEffect } from 'react';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading , setLoading] =useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [last , setLast] = useState<boolean>(false)
  const itemsPerPage: number = 10;

  useEffect(() => {
    // Fetch data from the to-do list API
    if(!loading){
        setLoading(true)
          fetch(`https://jsonplaceholder.typicode.com/todos?_page=${currentPage}&_limit=${itemsPerPage}`)
      .then((response) => response.json())
      .then((data: Todo[]) => {
        if(data.length === 0) {
            setLast(true)
        }
        // Append new data to the existing todos
       setTodos((prevTodos) => [...prevTodos, ...data]);
       setLoading(false)
      });
    }
  }, [currentPage]);

  const handleScroll = () => {
    const scrollY: number = window.scrollY;
    const windowHeight: number = window.innerHeight;
    const documentHeight: number = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 100) {
        !loading && setCurrentPage((prevPage) => prevPage + 1);
        console.log(currentPage);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  return (
    <div>
      {/* Display to-do list items */}
      <ul>
        {todos.map((todo: Todo , i) => (
          <li className='my-56' key={i}>{i}{todo.title}</li>
        ))}
      </ul>
      <div>{loading && "Loading ..."}</div>
    </div>
  );
}

export default App;
