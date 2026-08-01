import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";

import CategoryItem from "../../components/CategoryItem/CategoryItem";
import { getErrorMessage } from "../../api/axiosApi";
import { fetchCategories } from "../../store/categories/categoriesThunks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { items, fetchLoading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    const loadCategories = async (): Promise<void> => {
      try {
        await dispatch(fetchCategories()).unwrap();
      } catch (error: unknown) {
        toast.error(getErrorMessage(error, "Failed to load categories."));
      }
    };

    void loadCategories();
  }, [dispatch]);

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Categories</Typography>
          <Typography color="text.secondary">Asset groups used throughout the hotel.</Typography>
        </Box>
        <Button component={RouterLink} to="/categories/new" variant="contained">Add category</Button>
      </Box>

      {fetchLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress /></Box>
      ) : items.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Typography color="text.secondary">No categories yet.</Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>{items.map((category) => <CategoryItem key={category.id} category={category} />)}</Stack>
      )}
    </Stack>
  );
};

export default Categories;
