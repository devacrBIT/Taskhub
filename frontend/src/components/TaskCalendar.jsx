import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./TaskCalendar.css";


function TaskCalendar({ tasks }) {


    const [selectedDate, setSelectedDate] = useState(null);



    function getTasksForDay(date) {


        return tasks.filter(task => {


            if(!task.deadline)
                return false;



            const taskDate = new Date(task.deadline);



            return (

                taskDate.getDate() === date.getDate()

                &&

                taskDate.getMonth() === date.getMonth()

                &&

                taskDate.getFullYear() === date.getFullYear()

            );


        });


    }





    function handleDayClick(date) {

        setSelectedDate(date);

    }





    function tileContent({date, view}) {


        if(view !== "month")
            return null;



        const dayTasks = getTasksForDay(date);



        if(dayTasks.length === 0)
            return null;



        return (

            <div className="calendar-dots">


                {
                    dayTasks
                    .slice(0,3)
                    .map(task => (

                        <span

                            key={task.id}

                            className={
                                task.completed
                                ? "dot completed-dot"
                                : "dot pending-dot"
                            }

                        />


                    ))

                }


            </div>

        );

    }





    const selectedTasks = selectedDate

        ? getTasksForDay(selectedDate)

        : [];






    return (

        <div>


            <Calendar

                onClickDay={handleDayClick}

                tileContent={tileContent}

            />




            {
                selectedDate && (

                    <div className="calendar-tasks">


                        <h3>

                            {
                                selectedDate.toLocaleDateString()
                            }

                        </h3>



                        {
                            selectedTasks.length === 0

                            ?

                            <p>
                                No tasks
                            </p>


                            :


                            selectedTasks.map(task => (

                                <div

                                    key={task.id}

                                    className={
                                        `calendar-task ${task.priority}`
                                    }

                                >

                                    <span className="calendar-task-title">
                                        {task.title}
                                    </span>


                                    {
                                        task.completed && (

                                            <span className="calendar-task-status">
                                                Completed
                                            </span>

                                        )
                                    }


                                </div>

                            ))

                        }


                    </div>

                )

            }


        </div>

    );

}


export default TaskCalendar;