import { Box, Grid, Pagination } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_LIMIT } from "../constants/general.constant";
import { getTodos } from "../lib/apis/todo.api";
import { openErrorSnackbar } from "../store/slice/snackbarSlice";
import { setPage } from "../store/slice/todoSlice";
import AddTodoDialog from "./AddTodoDialog";
import Loader from "./Loader";
import NoTaskFound from "./NoTaskFound";
import TodoCard from "./TodoCard";

const Todo = ({ isCompleted }) => {
  const { page } = useSelector((state) => state.todo);

  // dispatch
  const dispatch = useDispatch();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["todos", page],
    queryFn: () =>
      getTodos({
        page,
        limit: DEFAULT_LIMIT,
        isCompleted,
      }),
  });

  const todoData = data?.data?.items;
  const totalPage = data?.data?.meta?.totalPages;

  if (isError) {
    dispatch(openErrorSnackbar(error.response.data.message));
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AddTodoDialog />
      {todoData?.length < 1 ? (
        <NoTaskFound />
      ) : (
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            minHeight: "60vh",
            mb: "2rem",
          }}
        >
          {todoData?.map((item) => {
            return (
              <Grid item key={item._id}>
                <TodoCard {...item} />
              </Grid>
            );
          })}
        </Grid>
      )}

      {totalPage >= 1 && (
        <Pagination
          page={page}
          count={totalPage}
          color="secondary"
          onChange={(_, value) => {
            dispatch(setPage(value));
          }}
        />
      )}
    </Box>
  );
};

export default Todo;
