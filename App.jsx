import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';




function App() { 

  const [Todo, setTodo] = useState("")

  const [Todos, setTodos] = useState([])
  const [showFinished, setshowFinished]= useState(true)
  

  useEffect(() => {
    let todosString = localStorage.getItem("todos")
    if(todosString){
   let todos =JSON.parse(localStorage.getItem("todos"))
   setTodo(todos)
  } 
   },[])
  


  const saveToLS =(params) =>{
    localStorage.setItem("todos",JSON.stringify(Todos))
  }

  const toggleFinished =(e)=>{
    setshowFinished(!showFinished)

  }

  const handleEdit = (e, id)=>{
    let t = Todos.filter(i=>i.id ===id)
    setTodo(t[0].Todo)
    let newTodos = Todos.filter(item=>{
      return item.id!==id
    });
   setTodos(newTodos)
   saveToLS()
    
  }

  const handleDelete = (e, id)=>{
    let newTodos = Todos.filter(item=>{
      return item.id!==id
    });
   setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = ()=>{
    setTodos([...Todos,{  id:uuidv4(), Todo, isCompleted: false}])
    setTodo("")
     saveToLS()
 

  }

  const handleChange = (e)=>{
    setTodo(e.target.value)

  }

  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = Todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
     saveToLS()
   
  }


  return (
    <>
    <Navbar/> 
     <div className=" mx-3 md:container md:mx-auto rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%] ">
        <h1 className='font-bold  text-center text-xl'>iTask - manage your todo at one place</h1>
      <div className="addTodo my-5 flex flex-col gap-5">
        <h2 className='text-lg font-bold'>Add Todo</h2>
      <div className="flex">
        <input onChange={handleChange} value={Todo}  type="text" className='w-full rounded-full px-5 py-1'   />
      <button  onClick={handleAdd} disabled={Todo.length<=3} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-700  p-2 py-1 text-sm font-bold text-white '>Save</button>
      </div>
      </div>
      <input className='my-4' onChange={toggleFinished}  type="checkbox" check={showFinished} /> <label classNamemx-2 htmlFor="show"> Show Finished</label>
      <div className="h-[1px] bg-black opacity-15 w-[90%] my-3 mx-auto"></div>
      
      <h2 className='text-lg font-bold'>You Todos</h2>
      <div className="todos">
        {Todos.length ===0 && <div className='m-5'> No Todo to display </div>}
        {Todos.map(item=>{

        return (showFinished || !item.isCompleted) && < div key={item.id} className="todo flex md: w-1/4 my-3 justify-between" >
          <div className='flex gap-5'>
          <input name={item.id} onChange={handleCheckbox} type="checkbox" check={item.isCompleted} id="" />
          <div className={item.isCompleted?"line-through":""}>{item.Todo}</div>
          </div>
          <div className="button flex h-full">
          <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-4 '><FaEdit /></button>
          <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2 '><AiFillDelete /></button>
        </div>
        </div>

          })}

        </div>
        </div>
      
         
    </>
       
  )
}

export default App
