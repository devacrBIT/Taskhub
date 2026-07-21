import { useState } from "react";
import TaskCard from "./TaskCard";
import "./TaskList.css";


function TaskList({ tasks = [], refresh }) {


    const [activeTab, setActiveTab] = useState("incomplete");

    const [search, setSearch] = useState("");

    const [priorityFilter, setPriorityFilter] = useState("ALL");

    const [sort, setSort] = useState("default");



    function priorityValue(priority) {

        if (priority === "HIGH")
            return 3;

        if (priority === "MEDIUM")
            return 2;

        if (priority === "LOW")
            return 1;

        return 0;

    }



    function filterTasks() {


        let filtered = tasks.filter(task => {


            const tabMatch =

                activeTab === "completed"

                ? task.completed

                : !task.completed;



            const searchMatch =

                task.title
                .toLowerCase()
                .includes(search.toLowerCase())

                ||

                (task.description || "")
                .toLowerCase()
                .includes(search.toLowerCase());



            const priorityMatch =

                priorityFilter === "ALL"

                ||

                task.priority === priorityFilter;



            return (

                tabMatch

                &&

                searchMatch

                &&

                priorityMatch

            );


        });



        switch(sort) {


            case "priority-high":

                filtered.sort(
                    (a,b)=>
                    priorityValue(b.priority)
                    -
                    priorityValue(a.priority)
                );

                break;



            case "priority-low":

                filtered.sort(
                    (a,b)=>
                    priorityValue(a.priority)
                    -
                    priorityValue(b.priority)
                );

                break;



            case "deadline-near":

                filtered.sort(
                    (a,b)=>
                    new Date(a.deadline)
                    -
                    new Date(b.deadline)
                );

                break;



            case "deadline-far":

                filtered.sort(
                    (a,b)=>
                    new Date(b.deadline)
                    -
                    new Date(a.deadline)
                );

                break;



            case "created-new":

                filtered.sort(
                    (a,b)=>
                    new Date(b.created_at)
                    -
                    new Date(a.created_at)
                );

                break;



            case "created-old":

                filtered.sort(
                    (a,b)=>
                    new Date(a.created_at)
                    -
                    new Date(b.created_at)
                );

                break;



            default:

                break;

        }



        return filtered;


    }




    const displayedTasks = filterTasks();




    return (

        <div className="task-container">



            <div className="tabs">


                <button

                    className={
                        activeTab === "incomplete"
                        ? "active"
                        : ""
                    }

                    onClick={
                        () => setActiveTab("incomplete")
                    }

                >

                    Incomplete ({tasks.filter(t => !t.completed).length})

                </button>



                <button

                    className={
                        activeTab === "completed"
                        ? "active"
                        : ""
                    }

                    onClick={
                        () => setActiveTab("completed")
                    }

                >

                    Completed ({tasks.filter(t => t.completed).length})

                </button>


            </div>





            <div className="task-controls">


                <input

                    placeholder="Search tasks..."

                    value={search}

                    onChange={
                        e => setSearch(e.target.value)
                    }

                />



                <select

                    value={priorityFilter}

                    onChange={
                        e => setPriorityFilter(e.target.value)
                    }

                >

                    <option value="ALL">
                        All priorities
                    </option>

                    <option value="HIGH">
                        High
                    </option>

                    <option value="MEDIUM">
                        Medium
                    </option>

                    <option value="LOW">
                        Low
                    </option>


                </select>




                <select

                    value={sort}

                    onChange={
                        e => setSort(e.target.value)
                    }

                >

                    <option value="default">
                        Default
                    </option>

                    <option value="priority-high">
                        Priority highest
                    </option>

                    <option value="priority-low">
                        Priority lowest
                    </option>

                    <option value="deadline-near">
                        Deadline soonest
                    </option>

                    <option value="deadline-far">
                        Deadline latest
                    </option>

                    <option value="created-new">
                        Newest
                    </option>

                    <option value="created-old">
                        Oldest
                    </option>


                </select>


            </div>





            <table className="task-table">


                <thead>

                    <tr>

                        <th>Title</th>

                        <th>Description</th>

                        <th>Priority</th>

                        <th>Deadline</th>

                        <th>Created</th>

                        <th>Actions</th>

                    </tr>

                </thead>



                <tbody>


                {

                    displayedTasks.map(task => (

                        <TaskCard

                            key={task.id}

                            task={task}

                            refresh={refresh}

                        />

                    ))

                }


                </tbody>


            </table>



        </div>

    );

}


export default TaskList;