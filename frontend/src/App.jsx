import { useEffect, useState } from "react";

import { getTasks } from "./api/tasks";

import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import TaskCalendar from "./components/TaskCalendar";


function App() {

    const [tasks, setTasks] = useState([]);

    const [theme, setTheme] = useState(() => {

        return localStorage.getItem("theme") || "ocean";

    });

    const [showAddTask, setShowAddTask] = useState(false);


    async function loadTasks() {

        const data = await getTasks();

        setTasks(data);

    }


    useEffect(() => {

        loadTasks();

    }, []);

    useEffect(() => {

        localStorage.setItem("theme", theme);

    }, [theme]);

    return (

        <div className={`app ${theme}`}>


            <Sidebar

                openAddTask={() => setShowAddTask(true)}

                theme={theme}

                setTheme={setTheme}

            />



            <main className="content">


                <TaskList

                    tasks={tasks}

                    refresh={loadTasks}

                />


            </main>



            <aside className="calendar-panel">

                <TaskCalendar tasks={tasks}/>

            </aside>



            {
                showAddTask && (

                    <div className="add-overlay">


                        <div className="add-window">


                            <button

                                className="close"

                                onClick={() => setShowAddTask(false)}

                            >
                                ✕
                            </button>



                            <AddTask

                                refresh={() => {

                                    loadTasks();

                                    setShowAddTask(false);

                                }}

                            />


                        </div>


                    </div>

                )
            }



        </div>

    );

}


export default App;