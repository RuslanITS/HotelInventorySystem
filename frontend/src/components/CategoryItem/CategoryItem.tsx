import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

import type { Category } from "../../types";

import { deleteCategory } from "../../store/categories/categoriesThunks.ts";
import { getErrorMessage } from "../../api/axiosApi";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks";

interface Props {
  category: Category;
}

const CategoryItem = ({ category }: Props) => {
  const dispatch = useAppDispatch();

  const { deleteLoading } = useAppSelector(
    (state) => state.categories,
  );

  const onDelete = async () => {
    try {
      await dispatch(deleteCategory(category.id)).unwrap();
      toast.success("Category deleted.");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to delete category."));
    }
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: "none" }}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontWeight: 700,
          }}
        >
          {category.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {category.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Stack
          sx={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Button
            component={RouterLink}
            to={`/categories/${category.id}/edit`}
            variant="outlined"
          >
            Edit
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={onDelete}
            disabled={deleteLoading}
          >
            Delete
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default CategoryItem;
