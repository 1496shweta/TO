document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById("input-box")
const todoBtn = document.getElementById("todo-btn")
const listContainer = document.getElementById("list-container")

let tasks= JSON.parse(localStorage.getItem("tasks"))||[]
tasks.forEach(task=>render(task))

todoBtn.addEventListener("click",function(){
    const tasktext=inputBox.value.trim()
    if(tasktext === "") return;

    const newTask={
        id:Date.now(),
        text:tasktext,
        completed:false
    }
   
    tasks.push(newTask)
    saveTasks()
    inputBox.value=""
    
    }
   
)
function render(task){
  const li=document.createElement("li")

  li.setAttribute("data-id",task.id)
  if(task.completed){
      li.classList.add("completed")
  }
  li.innerHTML=`
  <span>${task.text}</span>
  <button> Delete</button>`

  li.addEventListener("click",(e)=>{
    if(e.target.tagName === "BUTTON") return;

    task.completed= !task.completed
    li.classList.toggle("completed")
    li.style.color=task.completed?"green":"red"
    saveTasks()


  })

  li.querySelector("button").addEventListener("click",function(){
    li.remove()
    tasks=tasks.filter(task=>task.id !== parseInt(li.dataset.id))
    saveTasks()
  })

  



  listContainer.appendChild(li)




}
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
})