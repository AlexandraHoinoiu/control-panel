import React from 'react'
import { useState, useEffect } from "react";
import Dashboard from './Dashboard'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

const columns = [
    {
        dataField: "id",
        text: "ID",
        sort: true
    },
    {
        dataField: "email",
        text: "Email",
        sort: true
    },
    {
        dataField: "type",
        text: "Type",
        sort: true
    }
];

export default function Supervisors() {
    const { SearchBar, ClearSearchButton } = Search;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("Administrator");
    const [error, setError] = useState("");

    const [supervisors, setSupervisors] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const response =
                await axios.get('http://api.local:9903/supervisors').catch(function (error) { });
            if (typeof response !== 'undefined' && response.data.success === true) {
                setSupervisors(response.data.supervisors)
            }
        }
        fetch()
    }, [])

    const handleSubmit = () => {
        const call = async (e, p, t) => {
            const response = await axios.post('http://api.local:9903/addSupervisor',
                {
                    email: e,
                    password: p,
                    type: t
                }
            );
            if(response.data.success === true) {
                window.location.reload();
            } else {
                setError(response.data.message)
            }
        }
        call(email, password, type)
    }
    return (
        <div className="contentDashboard">
            <Dashboard />
            <Form className="form-add-supervisors">
                <Form.Control type="email" placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <Form.Control type="password" placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <Form.Control as="select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option defaultValue="Administrator">Administrator</option>
                    <option defaultValue="Moderator">Moderator</option>
                </Form.Control>
                <Button size="md" onClick={handleSubmit}>Add</Button>
                <p className="text-danger">{error}</p>
            </Form>
            <ToolkitProvider
                bootstrap4
                keyField='id'
                data={supervisors}
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
                                pagination={paginationFactory({ sizePerPage: 5 })}
                                {...props.baseProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}
