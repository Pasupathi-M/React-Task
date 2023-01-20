import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import { AgGridReact } from "ag-grid-react";
import { render } from "react-dom";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { todoFiled } from "../app-constant/todo-table";

export const Todo = (props: any) => {
  /************************************** Hook */

  const data = useParams();
  const loc = useLocation();

  const [todoUserData, todoSetSate] = useState({...loc.state});

//   const todoUserData = {
//     userName: "Test user",
//     role: { id: 1, role: "Admin" },
//   };

  const [todoListData, todoListState] = useState({
    todoName: "",
    todoArrayList: [],
  } as Record<string, any>);

  /************************************************ */

  const enterToDoValue = (filedValue: any) => {
    const { name } = filedValue.target;
    const { value } = filedValue.target;
    todoListState((pre: any) => {
      return { ...pre, [name]: value };
    });
    console.log("enterToDoValue", value);
  };

  const updateTodoList = () => {
    if (todoListData.todoName.trim()) {
      todoListState((pre: any) => {
        const formObj = {
          seno: todoListData.todoArrayList.length,
          todo: todoListData.todoName,
          action: "Action",
        };
        todoListData.todoArrayList.push(formObj);
        return { ...pre, todoArrayList: [...todoListData.todoArrayList] };
      });
    }
  };

  return (
    <>
      <div className="card--container">
        <Card sx={{
            height: '100%'
        }}>
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
                    value={todoListData.todoName}
                    sx={{
                      width: "100%",
                    }}
                    onChange={(e) => {
                      enterToDoValue(e);
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
                      updateTodoList();
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div
                className="table--container ag-theme-alpine"
                style={{ height: 200 }}
              >
                <AgGridReact
                  rowData={todoListData.todoArrayList}
                  columnDefs={todoFiled}
                ></AgGridReact>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
