import { useCallback, useReducer } from "react";

const httpReducer = (state, action) => {
  if (action.type === "SUCCESS") {
    return {
      status: "success",
      data: action.data,
      error: null,
    };
  }
  if (action.type === "SENDING") {
    return {
      status: "pending",
      data: null,
      error: null,
    };
  }
  if (action.type === "ERROR") {
    return {
      status: "error",
      data: null,
      error: action.message,
    };
  }
  return state;
};

const useHttp = (requestFunction, isPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: isPending ? "pending" : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData,callFunction) {
      dispatch({ type: "SENDING" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", data:responseData });
        callFunction(responseData)
      } catch (error) {
        dispatch({
          type: "ERROR",
          message: error.message || "Error in sending request!!",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
