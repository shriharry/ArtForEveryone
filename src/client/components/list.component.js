import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteDrawing,
  FETCH_DRAWINGS_ACTION,
} from "./../stores/sagas/actions/drawing.action";
import {
  fetchDrawingsSelector,
  isDrawingDeletedSelector,
} from "./../stores/selectors/drawing.selector";
import { userIdSelector } from "../stores/selectors/auth.selector";
import { PRIVATE } from "../utils/constants";
import { dateOptions } from "../utils/helper";

const prepareRows = (response, deleteById) => {
  const currentUserId = useSelector(userIdSelector);

  return response?.map((data) => {
    let deleteButton = "";
    if (currentUserId === data.userId) {
      deleteButton = (
        <button
          type="button"
          onClick={() => deleteById(data.id)}
          className="btn btn-danger"
        >
          <i className="bi bi-trash"></i> Delete
        </button>
      );
    }

    let mode = (
      <>
        <i className="bi bi-eye-fill text-success" style={{ fontSize: 18 }}>
          {" "}
        </i>{" "}
        <span className="text-success">Public</span>
      </>
    );
    if (data.status.toLowerCase() === PRIVATE.toLowerCase()) {
      mode = (
        <>
          <i
            className="bi bi-eye-slash-fill text-danger"
            style={{ fontSize: 18 }}
          ></i>{" "}
          <span className="text-danger">Private</span>{" "}
          <span className="font-italic text-danger" style={{ fontSize: 10 }}>
            (Only visible to you)
          </span>
        </>
      );
    }

    return {
      drawingData: <img src={data?.drawingData} width="500" height="350"></img>,
      detail: [
        {
          "Name: ": (
            <span style={{ fontSize: 18 }}>
              {data.user.firstName} {data.user.lastName}
            </span>
          ),
        },
        { "Time taken: ": data.timeTaken },
        { "": mode },
        {
          "Created on: ": new Date(data.createdAt).toLocaleDateString(
            "en-US",
            dateOptions
          ),
        },
        { "": deleteButton },
      ],
    };
  });
};

export default function List() {
  const dispatch = useDispatch();
  const response = useSelector(fetchDrawingsSelector);
  const isDrawingDeleted = useSelector(isDrawingDeletedSelector);
  useEffect(() => {
    dispatch({ type: FETCH_DRAWINGS_ACTION });
  }, []);

  useEffect(() => {
    if (isDrawingDeleted) {
      toast.success("Drawing is deleted successfully.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      dispatch({ type: FETCH_DRAWINGS_ACTION });
    } else if (isDrawingDeleted === false) {
      toast.error("Something went wrong while deleting..; please try again", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  }, [isDrawingDeleted]);

  const deleteById = (drawingId) => {
    dispatch(deleteDrawing({ drawingId }));
    dispatch({ type: FETCH_DRAWINGS_ACTION });
  };
 const rows = prepareRows(response, deleteById);

  const getRowSpan = (details) =>
    details.reduce((previousValue, currentValue, currentIndex) => {
      const [[, value]] = Object.entries(currentValue);
      return value ? (previousValue += 1) : previousValue;
    }, 0) + 1;

  return (
    <div style={{ overflowX: "auto" }}>
      <table>
        <thead>
          <tr>
            <th colSpan="2" style={{ backgroundColor: "#f6f8fa" }}>
              <span style={{ fontSize: 25 }} className="multi-color">
                <i className="bi bi-palette-fill"></i> <span>All Drawings</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <Fragment key={index}>
              <tr>
                <td style={{ width: "40%" }} rowSpan={getRowSpan(item.detail)}>
                  {item.drawingData}
                </td>
              </tr>
              {item.detail.map((detail, idx) =>
                Object.entries(detail).map(
                  ([key, value]) =>
                    value && (
                      <tr key={idx}>
                        <td>
                          {key} {value}
                        </td>
                      </tr>
                    )
                )
              )}
            </Fragment>
          ))}
          {
              !rows?.length && (
              <tr>
                <td style={{ width: "40%" }} colSpan={2}>No drawings to show. <Link to="/create">Click here</Link> to create yours...</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}
