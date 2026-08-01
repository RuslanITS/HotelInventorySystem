import { useEffect } from "react";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CategoryForm from "../../components/CategoryForm/CategoryForm";
import { getErrorMessage } from "../../api/axiosApi";
import { fetchCategoryById, updateCategory } from "../../store/categories/categoriesThunks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { CategoryApi } from "../../types";

const EditCategory = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { item, fetchOneLoading, updateLoading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    const loadCategory = async (): Promise<void> => {
      if (!id) return;
      try {
        await dispatch(fetchCategoryById(id)).unwrap();
      } catch (error: unknown) {
        toast.error(getErrorMessage(error, "Failed to load category."));
      }
    };

    void loadCategory();
  }, [dispatch, id]);

  const onSubmit = async (category: CategoryApi): Promise<void> => {
    if (!id) return;
    try {
      await dispatch(updateCategory({ id, category })).unwrap();
      toast.success("Category updated.");
      navigate("/categories");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to update category."));
    }
  };

  if (fetchOneLoading) return <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress /></Box>;
  if (!item) return <Typography color="text.secondary">Category is unavailable.</Typography>;

  return (
    <Stack spacing={3}>
      <Box>
        <Button component={RouterLink} to="/categories" sx={{ mb: 1 }}>← Back</Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Edit category</Typography>
        <Typography color="text.secondary">Update the selected asset category.</Typography>
      </Box>
      <CategoryForm existingCategory={{ name: item.name, description: item.description }} onSubmit={onSubmit} isLoading={updateLoading} />
    </Stack>
  );
};

export default EditCategory;
