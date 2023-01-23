import { useLocation } from "react-router-dom";
import { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import { Form, Field, Formik } from 'formik'

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { todoFiled } from "../app-constant/todo-table";

export const Todo = (props: any) => {
  /************************************** Hook */

  const loc = useLocation();

  const [todoUserData, todoSetSate] = useState({ ...loc.state });

  const [todoListData, todoListState] = useState({
    todoName: "",
    todoArrayList: [],
  } as Record<string, any>);

  const deleteActionButton = (prop: any) => {
    return (
      <>
        <Button
          onClick={() => {
            removeTodo(prop.data);
          }}
        >
          DELETE
        </Button>
      </>
    );
  };

  const [todoFileds, tableFieldSate] = useState(() => {
    return [
      ...todoFiled,
      {
        headerName: "Action",
        cellRenderer: deleteActionButton,
      },
    ];
  });

  /************************************************ */

  function removeTodo({ seno }: any) {

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    todoListState((previousToDolist) => {
      const newArray = previousToDolist.todoArrayList.filter(
        (item: any, index: number) => item.seno != seno
      );
      newArray.map((ele: any, idx: number) => {
        ele.seno = idx + 1;
        return ele;
      });
      return { ...previousToDolist, todoArrayList: [...newArray] };
    });
  }

  const enterToDoValue = (filedValue: any) => {
    const { name } = filedValue.target;
    const { value } = filedValue.target;
    todoListState((pre: any) => {
      return { ...pre, [name]: value };
    });
  };

  const updateTodoList = () => {
    if (todoListData.todoName.trim()) {
      todoListState((pre: any) => {
        const formObj = {
          seno:
            todoListData.todoArrayList.length === 0
              ? 1
              : todoListData.todoArrayList.length + 1,
          todo: todoListData.todoName,
          action: "action",
        };
        // todoListData.todoArrayList.push(formObj);
        return {
          ...pre,
          todoArrayList: [...todoListData.todoArrayList, formObj],
        };
      });
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
                  columnDefs={todoFileds}
                  // frameworkComponents={ deleteBtn.frameworksComponents }
                ></AgGridReact>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
