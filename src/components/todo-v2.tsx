import { useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import { Form, Field, Formik } from "formik";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { todoFiled } from "../app-constant/todo-table";

import * as Axios from "../services/rest-api";

export const TodoWithApi = (props: any) => {
  /************************************** Hook */

  const loc = useLocation();

  const [todoUserData, todoSetSate] = useState({ ...loc.state });

  const [inputValue, setInputState] = useState({
    isEdit: false,
    todoName: "",
    id: null
  });

  const [action, setStateAction] = useState({
    type: "No action",
  });

  const columnDefs = useMemo(() => {
    return [
      ...todoFiled,
      {
        headerName: "Action",
        cellRenderer: actionButtons,
      },
    ];
  }, []);

  const [todoList, setStateTodoList] = useState(() => {
    return {
      data: [
        {
          seno: null,
          todoName: "",
        },
      ],
    };
  });

  const getTodoList = async () => {
    const todoList = await Axios.getApi("/todo-list");
    setStateTodoList((pre: any) => {
      return { ...pre, data: [...todoList.data] };
    });
  };

  useEffect(() => {
    getTodoList();
    setInputState(pre => { return { ...pre, isEdit: false }})
  }, [action]);

  /************************************************ */

  // Ag grid button renderer
  const editTodo = ({ data }: any) => {
    console.log('Edit', data)
    setInputState((pre)=> { return { ...pre, todoName: data.todoName, isEdit: true, id: data.id }})
  }

  const deleteTodo = async ({ data }: any) => {
    const resData = await Axios.deleteApi(`/delete-todo/${data.id}`)
    if(resData.status === 200) {
      setStateAction(pre => { return { ...pre, type: 'Delete'}})
    }
  }

  function actionButtons(elementProp: any) {
    return (
      <>
        <Button
          onClick={() => {
            deleteTodo(elementProp);
          }}
        >
          DELETE
        </Button>
        <Button
          onClick={() => {
            editTodo(elementProp)
          }}
        >
          EDIT
        </Button>
      </>
    );
  }

  const addAndUpdateTodoList = async () => {
    if(inputValue.todoName) {
      if(!inputValue.isEdit){
        const resData = await Axios.createApi('/add-todo', { todoName: inputValue.todoName })
        console.log("add functionality", resData)
        if(resData.status === 200) {
          setStateAction(pre => { return { ...pre, type: 'Add'}})
        }
      }else {
        const resData = await Axios.updateApi(`/update-todo/${inputValue.id}`,{ todoName: inputValue.todoName })
        if(resData.status === 200) {
          setStateAction(pre => { return { ...pre, type: 'Update'}})
        }
      }
    }
  };

  return (
    <>
      <div className="card--container">
        <Card
          sx={{
            height: "100%",
          }}
        >
          <CardHeader title={todoUserData.userName}></CardHeader>
          <CardContent>
            <div className="card--content">
              <div className="todo--container">
                <div className="field--area todo--content__header">
                  <TextField
                    required
                    id="outlined-required"
                    label="Todo"
                    placeholder="Enter task"
                    name="todoName"
                    value={inputValue.todoName}
                    sx={{
                      width: "100%",
                    }}
                    onChange={(e) => {
                      setInputState((previousValue: any) => {
                        return {
                          ...previousValue,
                          [e.target.name]: e.target.value,
                        };
                      });
                    }}
                  />
                </div>
                <div className="btn--area todo--content__header">
                  <Button
                    variant="outlined"
                    sx={{
                      width: "100%",
                      height: "61%",
                    }}
                    onClick={() => {
                      addAndUpdateTodoList();
                    }}
                  >
                    { inputValue.isEdit ? 'UPDATE' : 'ADD'}
                  </Button>
                </div>
              </div>
              <div
                className="table--container ag-theme-alpine"
                style={{ height: 200 }}
              >
                <AgGridReact
                  rowData={todoList.data}
                  columnDefs={columnDefs}
                ></AgGridReact>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
