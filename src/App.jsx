import { useEffect, useState } from 'react'
import './App.css'
import './bootstrap.min.css'
function App() {

  const localdata = ()=>{
  let list = localStorage.getItem("data")
  if(list){
    return JSON.parse(localStorage.getItem("data"))
  }
  else{
    return []
  }
  }

const [input,setinput]=useState("")
const [item,setitme]=useState(localdata())
const [togglebtn,settogglebtn]=useState(true)
const [isedit,setisedit]=useState(null)

const itemaddedd = ()=>{
  if(!input){
alert('please filel')
  }
  else if(input && !togglebtn){
   setitme(item.map((elem)=>{
    if(elem.id === isedit){
   return {...elem,name:input}
    }
    return elem;
   }))
  }
  else{
  const inputdata = {id:new Date().getTime().toString(),name:input}
setitme([...item,inputdata])
setinput(" ")
  }
}

useEffect(()=>{
localStorage.setItem("data",JSON.stringify(item))
},[item])


  const handleremove = (id)=>{
  const updateitem = item.filter((value,index)=>{
    return  value.id !==id
  })
  setitme(updateitem)
  }

  const handleedit = (id)=>{
  let newdata = item.find((elem)=>{
    return elem.id ===id
  })
  settogglebtn(false)
  setinput(newdata.name)
  setisedit(id)
  }

  const removeall =()=>{
    setitme([])
  }

  return (
    <>
<div className='aa text-danger '>
  <div className='cc'>
  <h1 className='text-center fs-2  text-dark  '>TODO LIST</h1>

    <div className='d-flex ee mt-4'>
    <input className=' form-control ' type="text" placeholder='' value={input} onChange={(e)=>setinput(e.target.value)}/>

<div className='ee  mx-5'>

{
  togglebtn ? <button className='btn btn-success ' onClick={itemaddedd}>Add</button>
  :
  <button className='btn btn-primary' onClick={itemaddedd} >edit</button>
  
}

</div>
    </div>


<div  className='ms-5 mt-3'>
  {item.map((value)=>(
    <div>
      <ul>
        <li>
        <h2 className='px-4 py-1 uppercase'>{value.name} <button className='btn btn-danger ms-4' onClick={()=>handleremove(value.id)}>Delete</button> <button onClick={()=>handleedit(value.id)} className='btn btn-primary ms-4'>Edit</button></h2>

        </li>
      </ul>
    </div>
  ))}
</div>
<button className='ms-5 mt-3 btn btn-danger' onClick={removeall}>RemoveAll</button>

  </div>
</div>

    </>
  )
}

export default App
