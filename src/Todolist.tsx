import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeIsDone: (taskId: string, isDone: boolean) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeIsDone}: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
        setFilter(filter)
    }

	const onChangeHandler = (taskId: string, isDone: boolean) => {
		changeIsDone(taskId, isDone)
	}

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
                {error && <h4 className={'errorMessage'}>{error}</h4>}
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id)
                            }

                            // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            //     changeIsDone(task.id, event.currentTarget.checked)
                            // }

                            return <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={(event)=>onChangeHandler(task.id, event.currentTarget.checked)}/>
                                <span>{task.title}</span>
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button className={filter === 'all' ? 'activeFilter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}/>
                <Button className={filter === 'active' ? 'activeFilter' : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}/>
                <Button className={filter === 'completed' ? 'activeFilter' : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}
