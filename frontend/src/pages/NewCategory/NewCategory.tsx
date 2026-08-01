import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CategoryForm from "../../components/CategoryForm/CategoryForm";
import { getErrorMessage } from "../../api/axiosApi";
import { createCategory } from "../../store/categories/categoriesThunks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { CategoryApi } from "../../types";

const NewCategory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { createLoading } = useAppSelector((state) => state.categories);

  const onSubmit = async (category: CategoryApi): Promise<void> => {
    try {
      await dispatch(createCategory(category)).unwrap();
      toast.success("Category created.");
      navigate("/categories");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to create category."));
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Button component={RouterLink} to="/categories" sx={{ mb: 1 }}>← Back</Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Create category</Typography>
        <Typography color="text.secondary">Add a category for hotel assets.</Typography>
      </Box>
      <CategoryForm onSubmit={onSubmit} isLoading={createLoading} />
    </Stack>
  );
};

export default NewCategory;
