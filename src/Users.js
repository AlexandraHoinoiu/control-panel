import React from 'react'
import Dashboard from './Dashboard'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";

const columns = [
    {
        dataField: "id",
        text: "ID User",
        sort: true
    },
    {
        dataField: "type",
        text: "Type",
        sort: true
    },
    {
        dataField: "name",
        text: "Name",
        sort: true
    },
    {
        dataField: "email",
        text: "Email",
        sort: true
    },
    {
        dataField: "disable",
        text: "Disable",
        sort: true
    },
    {
        dataField: "buttons",
        text: "Actions"
    }
];


export default function Users() {
    const { SearchBar, ClearSearchButton } = Search;
    const [users, setUsers] = useState([])
    const currentUser = JSON.parse(localStorage.getItem('user'));

    function disableUser(user) {
        const response = window.confirm('Are you sure you want to disable this user?')
        if (response) {
            const handleDelete = async () => {
                const response = await axios.post("http://api.local:9903/disableUser", user);
                if (response.data.success === true) {
                    window.location.reload()
                }
            }
            handleDelete();
        }
    }

    function deleteUser(user) {
        const response = window.confirm('Are you sure you want to delete this user?')
        if (response) {
            const handleDelete = async () => {
                const response = await axios.post("http://api.local:9903/deleteUser", user);
                if (response.data.success === true) {
                    window.location.reload()
                }
            }
            handleDelete();
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get('http://api.local:9903/users').catch(function (error) { });
            if (typeof response !== 'undefined' && response.data.success === true) {
                const items = response.data.users.map(user => {
                    if (user.type === 'Learner') {
                        user.name = user.firstName + ' ' + user.lastName
                    }
                    if (!user.hasOwnProperty('disable')) {
                        user.disable = ''
                    }
                    user.buttons = currentUser.type === 'Administrator' ?
                        <div>
                            <button type="button" className="btn btn-secondary btn-sm"
                                onClick={() => disableUser(user)}>
                                Disable
                            </button>
                            <button type="button" className="btn btn-danger btn-sm"
                                onClick={() => deleteUser(user)}>
                                Delete
                            </button>
                        </div> : ""
                    return user;
                })
                setUsers(items)
            }
        }
        fetchPosts()
    }, [])
    return (
        <div className="contentDashboard">
            <Dashboard />
            <ToolkitProvider
                bootstrap4
                keyField='id'
                data={users}
                columns={columns}
                search
            >
                {
                    props => (
                        <div>
                            <SearchBar {...props.searchProps} />
                            <ClearSearchButton {...props.searchProps} />
                            <hr />
                            <BootstrapTable
                                pagination={paginationFactory({ sizePerPage: 10 })}
                                {...props.baseProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}
