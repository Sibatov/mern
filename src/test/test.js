import React, {Component} from "react";
import axios from 'axios';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: "",
            tasks: [],
            editId: '',
            checked: false,
            editKey: undefined,
            error: ''
        };
        this.updated = false;
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
    }

    handleAddTask = async e => {
        e.preventDefault();
        const newTask = {
            name: this.state.task,
            checked: false,
        };

        await axios.post('http://localhost:4000/tasks/addTask', newTask)
            .then(res => {
                this.setState(prevState => ({
                    task: '',
                    tasks: [
                        ...prevState.tasks, {
                            _id: res.data._id,
                            name: this.state.task,
                            checked: false,
                            updated: false,
                        }]
                }));
            });
    };

    handleOnChange = e => {
        this.setState({task: e.target.value});
    };

    componentDidMount() {
        axios.get('http://localhost:4000/tasks/')
            .then(response => {
                this.setState({tasks: response.data});
            })
            .catch(error => {
                console.log(error);
            })
    }


    handleRemoveTask = async key => {
        let items = this.state.tasks;
        const new_item = items.filter((obj, i) => {
            return i === key;
        });
        let itemId = new_item[0]._id;
        await axios.delete(`http://localhost:4000/tasks/deleteTask/${itemId}`)
            .then(() => {
                items.splice(key, 1);
                this.setState({
                    tasks: items
                });
            });
    };

    handleDoneTask = key => {
        let item = this.state.tasks;
        console.log(item);
        this.setState({
            tasks: item.map(
                (obj, i) => {
                    if (key === i) {
                        obj.checked = !obj.checked;
                        console.log(obj.checked)
                    }
                    return obj;
                })
        })
    };

    handleEditTask = async (key) => {
        let item = this.state.tasks;
        let new_item = item.filter((obj, i) => {
            return i === key;
        });
        await this.setState({
            tasks: item.map(
                (obj, i) => {
                    if (key === i) {
                        this.updated = !this.updated
                    }
                    return obj;
                }),
            task: new_item[0].name,
            editId: new_item[0]._id,
            editKey: key
        });
    };
    handleSaveTask = () => {
        let items = this.state.tasks;
        let itemId = this.state.editId;
        let value = this.state.task;
        let key = this.state.editKey;
        let new_item = items.filter((obj, i) => {
            return i === key;
        });
        const obj = {
            name: value,
            checked: new_item[0].checked,
        };
        axios.post(`http://localhost:4000/tasks/updateTask/${itemId}`, obj)
            .then(res => console.log(res.data));
        this.updated = !this.updated;
        this.setState({
            task: '',
            tasks: items.map((obj, i) => {
                if (itemId === obj._id) {
                    obj.name = value;
                }
                return obj;
            })
        });
    };


    render() {
        const { tasks } = this.state;
        return (
            <>
                <h1>Hello world!</h1>
                <input
                    type="text"
                    value={this.state.task}
                    name={"TestInput"}
                    onChange={this.handleOnChange}
                    placeholder={'add a new task'}
                />
                {
                    this.updated
                        ? <button onClick={this.handleSaveTask} type={'button'}>Save</button>
                        : <button onClick={this.handleAddTask}>Add task</button>
                }

                <div>
                    <h3>Tasks List</h3>

                    <ul>
                        {
                            tasks.length > 0
                            ? tasks.map((item, key) => (
                            <li key={key} className={'items'}>
                                <p className={item.checked ? 'newClass' : ''}>{item.name}</p>
                                <div className={'task_buttons'}>
                                    <button onClick={this.handleRemoveTask.bind(this, key)}>Delete</button>
                                    <button onClick={this.handleDoneTask.bind(this, key)}>Checked</button>
                                    <button onClick={this.handleEditTask.bind(this, key)}>Edit</button>
                                </div>
                            </li>
                            ))
                            : ''
                        }
                    </ul>
                </div>
            </>
        );
    }
}

export default Test;


