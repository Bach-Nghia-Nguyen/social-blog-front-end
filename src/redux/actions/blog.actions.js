import * as types from "../constants/blog.constants";
import api from "../../apiService";
import { alertActions } from "./alert.actions";
import { routeActions } from "./route.actions";

const getBlogs =
  (pageNum = 1, limit = 10, query = null, ownerId = null, sortBy = null) =>
  async (dispatch) => {
    dispatch({ type: types.GET_BLOGS_REQUEST, payload: null });
    try {
      let queryString = "";
      if (query) {
        queryString = `&title[$regex]=${query}&title[$options]=i`;
      }
      if (ownerId) {
        queryString = `${queryString}&author=${ownerId}`;
      }
      let sortByString = "";
      if (sortBy && sortBy.key) {
        sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
      }

      const res = await api.get(
        `/blogs?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
      );
      dispatch({ type: types.GET_BLOGS_SUCCESS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: types.GET_BLOGS_FAILURE, payload: error });
    }
  };

const getSingleBlog = (blog_id) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.get(`/blogs/${blog_id}`);
    dispatch({
      type: types.GET_SINGLE_BLOG_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_BLOG_FAILURE, payload: error });
  }
};

const createBlog = (title, content, images) => async (dispatch) => {
  dispatch({ type: types.CREATE_BLOG_REQUEST, payload: null });
  try {
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", content);

    const res = await api.post("/blogs", { title, content, images });

    dispatch({
      type: types.CREATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(routeActions.redirect("__GO_BACK__"));
    dispatch(alertActions.setAlert("New blog has been created!", "success"));
  } catch (error) {
    dispatch({ type: types.CREATE_BLOG_FAILURE, payload: error });
  }
};

const updateBlog = (blog_id, title, content, images) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null });
  try {
    // let formData = new FormData();
    // formData.set("title", title);
    // formData.set("content", content);
    const res = await api.put(`/blogs/${blog_id}`, { title, content, images });

    dispatch({
      type: types.UPDATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(routeActions.redirect("__GO_BACK__"));
    dispatch(alertActions.setAlert("The blog has been updated!", "success"));
  } catch (error) {
    dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: error });
  }
};

const deleteBlog = (blog_id) => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.delete(`/blogs/${blog_id}`);

    dispatch({
      type: types.DELETE_BLOG_SUCCESS,
      payload: res.data,
    });

    dispatch(routeActions.redirect("/"));
    dispatch(alertActions.setAlert("The blog has been deleted!", "success"));
  } catch (error) {
    dispatch({ type: types.DELETE_BLOG_FAILURE, payload: error });
  }
};

export const blogActions = {
  getBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
