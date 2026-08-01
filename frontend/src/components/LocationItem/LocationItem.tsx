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

import type { Location } from "../../types";

import { deleteLocation } from "../../store/locations/locationsThunks";
import { getErrorMessage } from "../../api/axiosApi";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks";

interface Props {
  location: Location;
}

const LocationItem = ({ location }: Props) => {
  const dispatch = useAppDispatch();

  const { deleteLoading } = useAppSelector(
    (state) => state.locations,
  );

  const onDelete = async () => {
    try {
      await dispatch(deleteLocation(location.id)).unwrap();
      toast.success("Location deleted.");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to delete location."));
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
          {location.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {location.description}
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
            to={`/locations/${location.id}/edit`}
            variant="outlined"
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="error"
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

export default LocationItem;
