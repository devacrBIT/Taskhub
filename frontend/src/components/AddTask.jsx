import { useState } from "react";

import { createTask } from "../api/tasks";


function AddTask({ refresh }) {


    const [task, setTask] = useState({

        title:"",
        description:"",
        deadline:"",
        priority:"MEDIUM"

    });



    function handleChange(e) {

        setTask({

            ...task,

            [e.target.name]: e.target.value

        });

    }



    async function handleSubmit(e) {

        e.preventDefault();


        await createTask({

            ...task,

            deadline: task.deadline || null

        });



        setTask({

            title:"",
            description:"",
            deadline:"",
            priority:"MEDIUM"

        });


        refresh();

    }




    return (

        <form onSubmit={handleSubmit}>


            <h2>
                Add Task
            </h2>



            <input

                name="title"

                placeholder="Title"

                value={task.title}

                onChange={handleChange}

                required

            />



            <input

                name="description"

                placeholder="Description"

                value={task.description}

                onChange={handleChange}

            />



            <input

                type="date"

                name="deadline"

                value={task.deadline}

                onChange={handleChange}

            />



            <select

                name="priority"

                value={task.priority}

                onChange={handleChange}

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



            <button type="submit">

                Create

            </button>


        </form>

    );

}


export default AddTask;