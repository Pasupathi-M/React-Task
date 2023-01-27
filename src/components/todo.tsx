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


  const [todoFileds, tableFieldSate] = useState(() => {
    return [
      ...todoFiled,
      {
        headerName: "Action",
        cellRenderer: actionButtons,
      },
    ];
  });

  const [updateCondition, setStateUpdateCondition] = useState(() => {
    return {
      updateId: null,
      flag: false,
    };
  });

  /************************************************ */

    // Ag grid button renderer

  function actionButtons(prop: any) {
    return (
      <>
        <Button
          onClick={() => {
            removeTodo(prop.data);
          }}
        >
          DELETE
        </Button>
        <Button
        onClick={()=> {
          updateTodo(prop.data)
        }}>
          UPDATE
        </Button>
      </>
    );
  };

  const inputTodoValue = (filedValue: any) => {
    const { name } = filedValue.target;
    const { value } = filedValue.target;
    todoListState((pre: any) => {
      return { ...pre, [name]: value };
    });
  };

  const addAndUpdateTodoList = () => {

    if (todoListData.todoName.trim()) {
      todoListState((pre: any) => {
        if (!updateCondition.flag) {
          const formObj = {} as Record<any, any>;
          formObj.seno =
            todoListData.todoArrayList.length === 0
              ? 1
              : todoListData.todoArrayList.length + 1;
          formObj.todo = todoListData.todoName;
          formObj.action = "action";
          todoListData.todoArrayList.push(formObj);
        } else {
          const findData = pre.todoArrayList.find(
            (item: any) => item.seno === updateCondition.updateId
          );
          console.log("find data", findData)
          findData.todo = todoListData.todoName;
          setStateUpdateCondition((preState) => {
            return { ...preState, flag: false };
          });
        }
        return {
          ...pre,
          todoArrayList: [...todoListData.todoArrayList],
        };
      });
    }
    setStateUpdateCondition((preState) => {
      return { ...preState, flag: false };
    });
  };

  // Update todo list
  function updateTodo(newData: any) {
    todoListState((previousTodoList)=> {
      return { ...previousTodoList, todoName: newData.todo }
    })
    setStateUpdateCondition((preState) => {
      return { ...preState, flag: true, updateId: newData.seno };
    });
  }

  // Remove todo list 
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

  return (
    <>
      <div className="card--container">
        <Card
          sx={{
            height: "100%"
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
                      inputTodoValue(e);
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
                    { updateCondition.flag ? 'Update' : 'Add' }
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
                ></AgGridReact>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
