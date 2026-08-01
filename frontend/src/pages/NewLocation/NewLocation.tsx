import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LocationForm from "../../components/LocationForm/LocationForm";
import { getErrorMessage } from "../../api/axiosApi";
import { createLocation } from "../../store/locations/locationsThunks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { LocationApi } from "../../types";

const NewLocation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { createLoading } = useAppSelector((state) => state.locations);

  const onSubmit = async (location: LocationApi): Promise<void> => {
    try {
      await dispatch(createLocation(location)).unwrap();
      toast.success("Location created.");
      navigate("/locations");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to create location."));
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Button component={RouterLink} to="/locations" sx={{ mb: 1 }}>← Back</Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Create location</Typography>
        <Typography color="text.secondary">Add a room or area where assets can be stored.</Typography>
      </Box>
      <LocationForm onSubmit={onSubmit} isLoading={createLoading} />
    </Stack>
  );
};

export default NewLocation;
