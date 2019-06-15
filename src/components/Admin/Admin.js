import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//Components
import AdminTableItem from './AdminTableItem'
import './Admin.css'

class Admin extends Component {

    componentDidMount() {
        this.getFeedback();
    }

    getFeedback = () => {
        axios({
            method: 'GET',
            url: '/feedback'
        }).then(response => {
            for ( let singleFeedback of response.data ) {
                const formattedDate = this.formatDate(singleFeedback.date);
                this.props.dispatch({
                    type: 'GET_FEEDBACK',
                    // payload: response.data,
                    payload: {...singleFeedback, date: formattedDate},
                })
            }
        }).catch(error => {
            console.log(error);
        });
    }

    formatDate = (date) => {
        const splitDate = date.substring(0, 10).split('-');
        const newDate = splitDate[1] + '/' + splitDate[2] + '/' + splitDate[0];
        return newDate
    }

    render() {
        return (
            <>
                {/* {JSON.stringify(this.props.reduxState, null, 2)} */}
                <Paper>
                    <Table id="adminTable">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Feeling</TableCell>
                                <TableCell>Comprehension</TableCell>
                                <TableCell>Support</TableCell>
                                <TableCell>Notes</TableCell>
                                <TableCell>Needs Review</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.reduxState.map(item => <AdminTableItem key={item.id} item={item} refreshData={this.getFeedback} />)}
                        </TableBody>
                    </Table>
                </Paper>
                {/* 
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Feeling</th>
                            <th>Comprehension</th>
                            <th>Support</th>
                            <th>Notes</th>
                            <th>Needs Review</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.map(item => <AdminTableItem key={item.id} item={item} refreshData={this.getFeedback} />)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="7"></td>
                        </tr>
                    </tfoot>
                </table> */}
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState: reduxState.getFeedback,
})

export default connect(mapReduxStateToProps)(Admin)