import { updateTask, deleteTask } from "../api/tasks";
import { useState } from "react";
import "./TaskCard.css";
import EditTask from "./EditTask";


function TaskCard({ task, refresh }) {


    const [editing, setEditing] = useState(false);
    const [removing, setRemoving] = useState(false);



    async function toggleComplete() {

        setRemoving(true);


        setTimeout(async () => {

            await updateTask(task.id, {

                completed: !task.completed

            });

            refresh();


        },300);

    }




    async function removeTask() {

        setRemoving(true);


        setTimeout(async () => {

            await deleteTask(task.id);

            refresh();


        },300);

    }




    return (

        <>


            <tr className={task.completed ? "completed" : ""}>


                <td>

                    <strong>
                        {task.title}
                    </strong>

                </td>



                <td>

                    {task.description || "-"}

                </td>



                <td>

                    <span className={`priority ${task.priority}`}>

                        {task.priority}

                    </span>

                </td>



                <td>

                    {task.deadline || "None"}

                </td>



                <td>

                    {task.created_at}

                </td>



                <td>

                    <div className="task-actions">


                        <button onClick={toggleComplete}>

                            {
                                task.completed
                                ? "Undo"
                                : "Complete"
                            }

                        </button>



                        <button
                            onClick={() => setEditing(true)}
                        >

                            Edit

                        </button>




                        <button onClick={removeTask}>

                            Delete

                        </button>


                    </div>

                </td>


            </tr>





            {
                editing && (

                    <div className="add-overlay">

                    <div className="add-window">

                        <EditTask

                            task={task}

                            close={() => setEditing(false)}

                            refresh={refresh}

                        />

                    </div>

                </div>

                )
            }



        </>

    );

}


export default TaskCard;