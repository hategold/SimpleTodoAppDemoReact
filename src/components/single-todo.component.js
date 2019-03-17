import React, { Component } from 'react';
import moment from 'moment';
import axiosApi from '../utils/axiosApi';

import { Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TodoDetail from "./todo-detail.component";


export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.onExpandTodoDetail = this.onExpandTodoDetail.bind(this);
        this.setTodoClass = this.setTodoClass.bind(this);
        this.state = {
            open: false,
            todoDetail: {}
        }
    }
    onExpandTodoDetail(todoSummary, e) {
        axiosApi.get('/todos/detail/' + todoSummary.todo_detail)
            .then(response => {
                this.setState({ todoDetail: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        this.setState({
            open: !this.state.open
        });
    }
    setTodoClass(todoSummary) {
        if(todoSummary.todo_completed){
            return 'completed'
        }
        return todoSummary.todo_priority;
    }
    render() {
        var showRow;
        if (this.state.open)
            showRow = (<TodoDetail todoDetail={this.state.todoDetail} open={this.state.open}/>);
        else
            showRow = <></>;
        return (
            <>
                <TableRow className={this.setTodoClass(this.props.todo)} onClick={(e) => this.onExpandTodoDetail(this.props.todo, e)}>
                    <TableCell >{this.props.todo.todo_title}</TableCell>
                    <TableCell >{moment(this.props.todo.todo_dueDate).format("YYYY-MM-DD")}</TableCell>
                    <TableCell>
                        <Link to={"/edit/" + this.props.todo._id}>
                            <button type="button" className="btn btn-primary">Edit</button>
                        </Link>
                    </TableCell>
                    <TableCell>
                        <button type="button" className="btn btn-danger" onClick={(e) => this.props.onDelete(this.props.todo, e)}>Delete</button>
                    </TableCell>
                </TableRow>
                {showRow}
            </>
        )
    }
}
