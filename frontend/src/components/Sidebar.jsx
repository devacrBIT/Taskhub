function Sidebar({
    openAddTask,
    theme,
    setTheme
}) {


    return (

        <aside className="sidebar">

            <div className="app-title">
                <img 
                    src="/icon.svg"
                    alt="logo"
                />

                <h1>
                    TaskHub
                </h1>

            </div>



            <button

                className="add-button"

                onClick={openAddTask}

            >

                + Add Task

            </button>




            <label>
                Theme
            </label>


            <select

                value={theme}

                onChange={(e)=>setTheme(e.target.value)}

            >

                <option value="ocean">
                    Ocean Light
                </option>

                <option value="ocean-dark">
                    Ocean Dark
                </option>


                <option value="purple">
                    Purple Light
                </option>


                <option value="purple-dark">
                    Purple Dark
                </option>


                <option value="green">
                    Green Light
                </option>


                <option value="green-dark">
                    Green Dark
                </option>


                <option value="red">
                    Red Light
                </option>


                <option value="red-dark">
                    Red Dark
                </option>


            </select>



        </aside>

    );

}


export default Sidebar;