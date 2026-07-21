import { useState } from "react";
import { updateTask } from "../api/tasks";


function EditTask({task, close, refresh}) {


    const [title,setTitle] = useState(task.title);

    const [description,setDescription] = useState(
        task.description || ""
    );

    const [priority,setPriority] = useState(task.priority);

    const [deadline,setDeadline] = useState(
        task.deadline || ""
    );



    async function save(){


        await updateTask(task.id, {

            title,

            description,

            priority,

            deadline

        });


        refresh();

        close();


    }



    return (

        <div>


            <input
                value={title}
                onChange={
                    e=>setTitle(e.target.value)
                }
            />


            <textarea
                value={description}
                onChange={
                    e=>setDescription(e.target.value)
                }
            />


            <select
                value={priority}
                onChange={
                    e=>setPriority(e.target.value)
                }
            >

                <option>
                    LOW
                </option>

                <option>
                    MEDIUM
                </option>

                <option>
                    HIGH
                </option>


            </select>


            <input

                type="date"

                value={deadline}

                onChange={
                    e=>setDeadline(e.target.value)
                }

            />


            <button onClick={save}>
                Save
            </button>


            <button onClick={close}>
                Cancel
            </button>


        </div>

    );

}


export default EditTask;