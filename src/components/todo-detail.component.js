import React, { Component } from 'react';
import moment from 'moment';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Card from '@material-ui/core/Card';
import Grow from '@material-ui/core/Grow';

const style = {
    tableHead: {
        backgroundColor: '#2979ff'
    },
    th: { color: 'white' }
};


export default class TodoDetail extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <TableRow>
                <TableCell colSpan='4'>
                    <Card>
                        <Grow in={this.props.open}>
                            <Table>
                                <TableHead style={style.tableHead}>
                                    <TableRow>
                                        <TableCell style={style.th}>Responsible</TableCell>
                                        <TableCell style={style.th}>Create Date</TableCell>
                                        <TableCell style={style.th}>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell >{this.props.todoDetail.todo_responsible}</TableCell>
                                        <TableCell>{moment(this.props.todoDetail.todo_createDate).format("YYYY-MM-DD")}</TableCell>
                                        <TableCell >{this.props.todoDetail.todo_description}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grow>
                    </Card>
                </TableCell>
            </TableRow>
        )
    }
}
