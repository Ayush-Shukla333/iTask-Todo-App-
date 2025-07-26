import Navbar from './components/Navbar'
import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo,setTodo] = useState(""); //todo is inut text
  const [todos,setTodos] = useState([]); //todos is array that holds all todo
  const [showFinished, setshowFinished] = useState(true)

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)

  }
  
  useEffect(() => { //load all todos in single run
    let todoString = localStorage.getItem("todos")
    if (todoString) {
       let todos = JSON.parse(localStorage.getItem("todos"))
       setTodos(todos)
    }
  }, [])
  
  const handleAdd = ()=> {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}]) //previous todos will remain and current todo is added which is yet to be completed.
    setTodo("") 
    saveToLS()
  }

  const handleChange = (e)=> {  //accomodate changes made in the input
    setTodo(e.target.value)
  }

  const handleCheckbox = (e)=> {
    let id = e.target.name;
    let index = todos.findIndex(item=> {
      return item.id==id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  const handleEdit = (e, id)=> {
    let t = todos.filter(i=>i.id==id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=> {
      return item.id!=id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id)=> {
    let newTodos = todos.filter(item=> {
      return item.id!=id
    });
    setTodos(newTodos)
    saveToLS()
  }
  
    return (
    <>
    <Navbar/>
    <div className="mx-3 md:container md:mx-auto my-4 rounded-xl p-5 bg-violet-200 min-h-[90vh] md:w-1/2">
      <div className="addTodo flex flex-col gap-3">
        <h1 className="font-bold text-3xl text-center">iTask - Manage your todos at one place</h1>
        <h2 className="text-lg font-bold my-3">Add a Todo</h2>
         <input onChange = {handleChange}
            value={todo}
            type="text"
            className="w-full px-5 py-1 rounded-full bg-amber-50 focus:outline-none focus:ring-2 focus:ring-slate-800"
          />
        <button onClick = {handleAdd} disabled={todo.length<3} className="bg-red-400 cursor-pointer hover:bg-green-800 disabled:bg-blue-300 py-1 text-sm font-bold text-white rounded-md shadow-md ">Save</button>
      </div>
      <input onChange = {toggleFinished} type ="checkbox" checked={showFinished} className="my-3"/>Show Finished
      <div className="h-[1px] bg-black mx-4 opacity-18 my-2"></div>
      <h2 className="font-bold text-xl my-4">Your Todos</h2>
      
      <div className="todos ">
        {todos.length==0 && <div>No todos to display</div>}
        {todos.map(item => {
        return (showFinished || !item.isCompleted) &&  <div key = {item.id} className="todo flex my-4 justify-between ">
          <div className="flex gap-4">
          <input name = {item.id} onChange = {handleCheckbox} type="checkBox" checked = {item.isCompleted}/>
          <div className={item.isCompleted? "line-through":""}>{item.todo}</div>
          </div>
          <div className="buttons flex h-full">
            <button onClick = {(e) => {handleEdit(e, item.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 rounded-md py-1 text-white mx-3 font-bold cursor-pointer"><FaEdit/>
            </button>
            <button onClick = {(e) => {handleDelete(e, item.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 rounded-md py-1 text-white mx-6 font-bold cursor-pointer"><MdDelete/></button>
          </div>
        </div>
        })}
      </div>
    </div>
    </>
  )
}

export default App
