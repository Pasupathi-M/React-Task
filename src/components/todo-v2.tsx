import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { TextField, Grid, Box } from "@mui/material";
import Button from "@mui/material/Button";

import { Form, Field, Formik } from "formik";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { todoFiled } from "../app-constant/todo-table";

import * as Axios from "../services/rest-api";
import * as LocalStorage from "../common-services/localstorage"


export const TodoWithApi = (props: any) => {
  /************************************** Hook */
  
  const navigate = useNavigate();
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

  if(!todoUserData.userName) {
    LocalStorage.remove('access-token')
    navigate('/')
    
  }

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
    try{

      const todoList = await Axios.getApi("/list-todo");
      setStateTodoList((pre: any) => {
        return { ...pre, data: [...todoList.data.resData] };
      });

    }catch(e){
      console.log("Error", e)
    }
  };

  useEffect(() => {
    getTodoList();
    setInputState(pre => { return { ...pre, isEdit: false }})
  }, [action]);

  /************************************************ */

  // Ag grid button renderer
  const editTodo = ({ data }: any) => {
    setInputState((pre)=> { return { ...pre, todoName: data.todoName, isEdit: true, id: data.id }})
  }

  const deleteTodo = async ({ data }: any) => {
    try {
      const resData = await Axios.deleteApi(`/delete-todo/${data.id}`);
      if (resData.data.status) {
        setStateAction((pre) => {
          return { ...pre, type: "Delete" };
        });
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

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
    try {
      if (inputValue.todoName) {
        if (!inputValue.isEdit) {
          const resData = await Axios.createApi("/add-todo", {
            todoName: inputValue.todoName,
          });
          if (resData.data.status) {
            setStateAction((pre) => {
              return { ...pre, type: "Add" };
            });
          }
        } else {
          const resData = await Axios.updateApi(
            `/update-todo/${inputValue.id}`,
            { todoName: inputValue.todoName }
          );
          if (resData.data.status) {
            setStateAction((pre) => {
              return { ...pre, type: "Update" };
            });
          }
        }
      }
    } catch (e) {
      console.log("Error", e);
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
          <Grid container>
            <Grid container item xs={12}>
              <Grid item xs={8}>
              <CardHeader title={todoUserData.userName}></CardHeader>
              </Grid>
              <Grid item xs={4}>
                <Box component="div" style={{
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
              <Button variant="text" onClick={()=> {
                LocalStorage.clean()
                navigate('/')
              }}>Signout</Button>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
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
                        {inputValue.isEdit ? "UPDATE" : "ADD"}
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
            </Grid>
          </Grid>
        </Card>
      </div>
    </>
  );
};
