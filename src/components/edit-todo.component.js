import React, { Component } from 'react';

import axiosApi from '../utils/axiosApi';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this);
        this.onChangeTodoDueDate = this.onChangeTodoDueDate.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_title: '',
            todo_dueDate_str: moment(new Date()).format('YYYY-MM-DD'),
            todo_priority: '',
            todo_completed: false,

            todo_description: '',
            todo_responsible: '',
            todo_createDate: new Date(),
            todo_tags: []
        }
    }

    componentDidMount() {
        axiosApi.get('/todos/complete/' + this.props.match.params.id)
            .then(response => {
                let todoDetail = response.data.todoDetail;
                let todoSummary = response.data.todoSummary;
                this.setState({
                    todo_title: todoSummary.todo_title,
                    todo_dueDate_str: moment(todoSummary.todo_dueDate).format('YYYY-MM-DD'),
                    todo_priority: todoSummary.todo_priority,
                    todo_completed: todoSummary.todo_completed,
                    todo_detail: todoSummary.todo_detail,

                    todo_description: todoDetail.todo_description,
                    todo_responsible: todoDetail.todo_responsible,
                    todo_createDate: todoSummary.todo_createDate,
                    todo_tags: []
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onChangeTodoTitle(e) {
        this.setState({
            todo_title: e.target.value
        });
    }

    onChangeTodoDueDate(e) {
        this.setState({
            todo_dueDate_str: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }
    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }
    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }
    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const updateTodo = {
            todoSummary: {
                todo_title: this.state.todo_title,
                todo_dueDate: Date.parse(this.state.todo_dueDate_str),
                todo_priority: this.state.todo_priority,
                todo_completed: this.state.todo_completed,
            },
            todoDetail: {
                todo_description: this.state.todo_description,
                todo_responsible: this.state.todo_responsible,
                todo_createDate: this.state.todo_createDate,
                todo_tags: []
            }
        };

        axiosApi.post('/todos/update/'+this.props.match.params.id, updateTodo)
            .then(res => {
                console.log(res.data);
                this.props.history.push("/");
            });

    }

    render() {
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_title}
                            onChange={this.onChangeTodoTitle}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            id="date"
                            label="Due Date"
                            type="date"
                            value={this.state.todo_dueDate_str}
                            className={styles.textField + " form-control"}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.onChangeTodoDueDate}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.todo_responsible}
                            onChange={this.onChangeTodoResponsible}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.todo_priority === 'Low'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                                checked={this.state.todo_priority === 'Medium'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="High"
                                checked={this.state.todo_priority === 'High'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                            id="completedCheckbox"
                            type="checkbox"
                            name="completedCheckbox"
                            onChange={this.onChangeTodoCompleted}
                            checked={this.state.todo_completed}
                            value={this.state.todo_completed}
                        />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}