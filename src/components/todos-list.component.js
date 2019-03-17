import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Todo from "./single-todo.component";

import axiosApi from '../utils/axiosApi';

const style = {
    tableHead: {
        backgroundColor: '#1565c0'
    },
    th: { color: 'white' }
};
export default class TodosList extends Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
        this.state = { todos: [] };
    }
    componentDidMount() {
        axiosApi.get('/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onDelete(todo, e) {
        var removeId = todo._id;
        axiosApi.get('/todos/delete/' + removeId)
            .then(response => {
                this.setState({ todos: this.state.todos.filter((item) => { return item._id !== removeId }) });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    todoList() {
        var self = this;
        return this.state.todos.map(function (currentTodo, i) {
            return <Todo todo={currentTodo} key={i} onDelete={self.onDelete} />;
        })
    }
    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <Table className="table" style={{ marginTop: 20 }} >
                    <TableHead style={style.tableHead}>
                        <TableRow>
                            <TableCell style={style.th}>Title</TableCell>
                            <TableCell style={style.th}>Due Date</TableCell>
                            <TableCell colSpan='2' style={style.th}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.todoList()}
                    </TableBody>
                </Table>
            </div>
        )
    }
}