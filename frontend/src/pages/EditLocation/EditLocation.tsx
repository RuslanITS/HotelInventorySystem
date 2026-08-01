import { useEffect } from "react";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import LocationForm from "../../components/LocationForm/LocationForm";
import { getErrorMessage } from "../../api/axiosApi";
import { fetchLocationById, updateLocation } from "../../store/locations/locationsThunks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { LocationApi } from "../../types";

const EditLocation = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { item, fetchOneLoading, updateLoading } = useAppSelector((state) => state.locations);

  useEffect(() => {
    const loadLocation = async (): Promise<void> => {
      if (!id) return;
      try {
        await dispatch(fetchLocationById(id)).unwrap();
      } catch (error: unknown) {
        toast.error(getErrorMessage(error, "Failed to load location."));
      }
    };

    void loadLocation();
  }, [dispatch, id]);

  const onSubmit = async (location: LocationApi): Promise<void> => {
    if (!id) return;
    try {
      await dispatch(updateLocation({ id, location })).unwrap();
      toast.success("Location updated.");
      navigate("/locations");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to update location."));
    }
  };

  if (fetchOneLoading) return <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress /></Box>;
  if (!item) return <Typography color="text.secondary">Location is unavailable.</Typography>;

  return (
    <Stack spacing={3}>
      <Box>
        <Button component={RouterLink} to="/locations" sx={{ mb: 1 }}>← Back</Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Edit location</Typography>
        <Typography color="text.secondary">Update the selected hotel location.</Typography>
      </Box>
      <LocationForm existingLocation={{ name: item.name, description: item.description }} onSubmit={onSubmit} isLoading={updateLoading} />
    </Stack>
  );
};

export default EditLocation;
