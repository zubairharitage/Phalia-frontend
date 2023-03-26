import axios from "axios";

import {
  ALL_BILL_REQUEST,
  ALL_BILL_SUCCESS,
  ALL_BILL_FAIL,
  CREATE_BILL_REQUEST,
  CREATE_BILL_SUCCESS,
  CREATE_BILL_FAIL,
  DELETE_BILL_REQUEST,
  DELETE_BILL_SUCCESS,
  DELETE_BILL_FAIL,
  DETAIL_BILL_REQUEST,
  DETAIL_BILL_SUCCESS,
  DETAIL_BILL_FAIL,
  EDIT_BILL_REQUEST,
  EDIT_BILL_SUCCESS,
  EDIT_BILL_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
} from "../constants/invoiceConstants";

export const getAllBillsAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BILL_REQUEST });

    const { data } = await axios.get("https://api.atifaps.online/api/v1/bills");
    dispatch({
      type: ALL_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    dispatch({ type: ALL_BILL_FAIL, payload: errorMessage.messsage });
  }
};

export const getUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const { data } = await axios.get(
      "https://api.atifaps.online/api/v1/user/get"
    );
    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    dispatch({ type: GET_USER_FAIL, payload: errorMessage.messsage });
  }
};

export const createBillAction = (bill) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BILL_REQUEST });

    const { data } = await axios.post(
      "https://api.atifaps.online/api/v1/bill/new",
      bill
    );
    dispatch({
      type: CREATE_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    dispatch({ type: CREATE_BILL_FAIL, payload: errorMessage });
  }
};

export const deleteBillAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BILL_REQUEST });

    const { data } = await axios.delete(
      `https://api.atifaps.online/api/v1/bill/${id}`
    );
    dispatch({
      type: DELETE_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    dispatch({ type: DELETE_BILL_FAIL, payload: errorMessage });
  }
};

export const billDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_BILL_REQUEST });

    const { data } = await axios.get(
      `https://api.atifaps.online/api/v1/bill/${id}`
    );
    dispatch({
      type: DETAIL_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    dispatch({ type: DETAIL_BILL_FAIL, payload: errorMessage });
  }
};

export const billEditAction = (id, bill) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_BILL_REQUEST });

    const { data } = await axios.put(
      `https://api.atifaps.online/api/v1/bill/${id}`,
      bill
    );
    dispatch({
      type: EDIT_BILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    dispatch({ type: EDIT_BILL_FAIL, payload: errorMessage });
  }
};
