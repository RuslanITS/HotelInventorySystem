import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

import type { Item } from "../../types";

import { deleteItem } from "../../store/items/itemsThunks";
import { getErrorMessage } from "../../api/axiosApi";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks";

const apiUrl = "http://localhost:8000";

interface Props {
  item: Item;
}

const ItemCard = ({ item }: Props) => {
  const dispatch = useAppDispatch();

  const { deleteLoading } = useAppSelector(
    (state) => state.items,
  );
  const category = useAppSelector((state) =>
    state.categories.items.find((entry) => entry.id === item.categoryId),
  );
  const location = useAppSelector((state) =>
    state.locations.items.find((entry) => entry.id === item.locationId),
  );

  const onDelete = async () => {
    try {
      await dispatch(deleteItem(item.id)).unwrap();
      toast.success("Item deleted.");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to delete item."));
    }
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: "none" }}>
      {item.image && (
        <CardMedia
          component="img"
          height="220"
          image={`${apiUrl}/${item.image}`}
          alt={item.name}
        />
      )}

      <CardContent>
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontWeight: 700,
          }}
        >
          {item.name}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mb: 2,
          }}
        >
          {item.description}
        </Typography>

        <Typography variant="body2">
          <strong>Category:</strong> {category?.name ?? "Unknown"}
        </Typography>

        <Typography variant="body2">
          <strong>Location:</strong> {location?.name ?? "Unknown"}
        </Typography>

        <Typography variant="body2">
          <strong>Registration date:</strong> {new Date(item.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>

      <CardActions>
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Button
            component={RouterLink}
            to={`/items/${item.id}/edit`}
            variant="outlined"
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="error"
            disabled={deleteLoading}
            onClick={onDelete}
          >
            Delete
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
