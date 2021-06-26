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
        text: "#",
        sort: true
    },
    {
        dataField: "idUser",
        text: "ID User",
        sort: true
    },
    {
        dataField: "type",
        text: "Type",
        sort: true
    },
    {
        dataField: "reportType",
        text: "Report type",
        sort: true
    },
    {
        dataField: "idPost",
        text: "ID Post",
        sort: true
    },
    {
        dataField: "buttons",
        text: ""
    }
];

export default function Reports() {
    const { SearchBar, ClearSearchButton } = Search;
    const [reports, setReports] = useState([])
    function deleteReport(report) {
        const response = window.confirm('Are you sure you want to delete this report?')
        if (response) {
            const handleDeleteReport = async () => {
                const response = await axios.post("http://api.local:9903/deleteReport", report);
                if (response.data.success === true) {
                    window.location.reload()
                }
            }
            handleDeleteReport();
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response =
                await axios.get('http://api.local:9903/reports').catch(function (error) { });
            if (typeof response !== 'undefined' && response.data.success === true) {
                const items = response.data.reports.map(report => {
                    report.buttons =
                        <button type="button" className="btn btn-danger btn-sm"
                            onClick={() => deleteReport(report)}>
                            Delete
                        </button>
                    return report;
                })
                setReports(items)
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
                data={reports}
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
                                defaultSorted={[{
                                    dataField: 'id',
                                    order: 'desc'
                                }]}
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
