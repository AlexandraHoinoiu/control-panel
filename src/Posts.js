import React from 'react'
import { Modal } from 'react-bootstrap'
import { CircularProgress } from "@material-ui/core";
import Dashboard from './Dashboard'
import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import axios from 'axios';

const columns = [
    {
        dataField: "idPost",
        text: "ID Post",
        sort: true
    },
    {
        dataField: "text",
        text: "Content",
        sort: true
    },
    {
        dataField: "imgPath",
        text: "Image Path",
        sort: true,
        style: { wordWrap: 'break-word' }
    },
    {
        dataField: "idUser",
        text: "ID User",
        sort: true
    },
    {
        dataField: "type",
        text: "User type",
        sort: true
    },
    {
        dataField: "name",
        text: "User name",
        sort: true
    },
    {
        dataField: "buttons",
        text: ""
    }
];
const defaultSorted = [{
    dataField: 'idPost',
    order: 'desc'
}];

export default function Posts() {
    const { SearchBar, ClearSearchButton } = Search;
    const [posts, setPosts] = useState([])
    const [editModal, setEditModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('')
    const [idP, setIdP] = useState('')
    const newText = useRef();

    const handleCloseEditModal = () => setEditModal(false);

    function editPost(post) {
        setText(post.text)
        setIdP(post.idPost)
        setEditModal(true)
    }

    const handleEditPost = (e) => {
        e.preventDefault();
        setLoading(true)
        const editCall = async (newDesc) => {
            const response = await axios.post("http://api.local:9901/editPost",
                {
                    postId: idP,
                    text: newDesc
                }
            )
            if (response.data.success === true) {
                window.location.reload()
            }
        }
        editCall(newText.current.value)
    }

    function deletePost(id) {
        const response = window.confirm('Are you sure you want to delete this post?')
        if (response) {
            const handleDeletePost = async () => {
                const response = await axios.post("http://api.local:9901/deletePost", { postId: id });
                if (response.data.success === true) {
                    window.location.reload()
                }
            }
            handleDeletePost();
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response =
                await axios.get('http://api.local:9903/posts').catch(function (error) { });
            if (typeof response !== 'undefined' && response.data.success === true) {
                const items = response.data.posts.map(item => {
                    if (item.type === 'Learner') {
                        item.name = item.firstName + ' ' + item.lastName
                    }
                    item.buttons = <div>
                        <button type="button" className="btn btn-info btn-sm"
                            onClick={() => editPost(item)}>
                            Edit
                        </button>
                        <button type="button" className="btn btn-danger btn-sm"
                            onClick={() => deletePost(item.idPost)}>
                            Delete
                        </button>
                    </div>
                    return item;
                })
                setPosts(items)
            }
        }
        fetchPosts()
    }, [])
    return (
        <div className="contentDashboard">
            <Dashboard />
            <ToolkitProvider
                bootstrap4
                keyField='idPost'
                data={posts}
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
                                defaultSorted={defaultSorted}
                                pagination={paginationFactory({ sizePerPage: 10 })}
                                {...props.baseProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
            <Modal show={editModal} onHide={handleCloseEditModal} className="modalEdit">
                {!loading ?
                    <div>
                        <Modal.Header className="text-center">
                            Edit post description
                        </Modal.Header>
                        <Modal.Body>
                            <textarea type='text' ref={newText} defaultValue={text}>
                            </textarea>
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={handleEditPost} className="btn btn-primary">
                                Save
                            </button>
                            <button onClick={handleCloseEditModal} className="btn btn-danger">
                                Close
                            </button>
                        </Modal.Footer>
                    </div>
                    :
                    <Modal.Body className="text-center"><CircularProgress size="40px" /></Modal.Body>
                }
            </Modal>
        </div>
    )
}
