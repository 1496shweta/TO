document.addEventListener('DOMContentLoaded', () => { 

    const inputBox = document.getElementById("input-box")
    const todoBtn = document.getElementById("todo-btn")
    const listContainer = document.getElementById("list-container")

    let tasks= JSON.parse(localStorage.getItem("tasks"))||[]
    tasks.forEach(task=>render(task))


    todoBtn.addEventListener("click",function(){

        const newTask= inputBox.value.trim()
        if(newTask === "") return;


        const task_store={
            id:Date.now(),
            text:newTask.text,
            completed:false

        }

        tasks.push(task_store)
        saveTask()
        inputBox.value=""




    })

    function render(task){

        const li= document.createElement("li")
        li.setAttribute("data-id",task.id)
        if(task.completed){
            li.classList.add("completed")
        }

        li.innerHTML=`
        <span> {task.text}</span>
        <button> Delete</button>
        `


        li.addEventListener("click",(e)=>{
            if(e.target.tagName==="BUTTON") return

            task.completed=!task.completed
            li.classList.toggle("completed")
            li.style.color=task.completed?green:red
            saveTask()


        })


        li.querySelector("button").addEventListener("click",function(){
            li.remove()
           tasks=tasks.filter(task=>task.id !== parseInt(li.dataset.id))
           saveTask()
        })

        listContainer.appendChild(li)

    }




    function saveTask(){
        localStorage.setItem('tasks',JSON.stringify("tasks"))
    }

})