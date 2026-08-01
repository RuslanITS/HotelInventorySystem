import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";

import LocationItem from "../../components/LocationItem/LocationItem";
import { getErrorMessage } from "../../api/axiosApi";
import { fetchLocations } from "../../store/locations/locationsThunks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Locations = () => {
  const dispatch = useAppDispatch();
  const { items, fetchLoading } = useAppSelector((state) => state.locations);

  useEffect(() => {
    const loadLocations = async (): Promise<void> => {
      try {
        await dispatch(fetchLocations()).unwrap();
      } catch (error: unknown) {
        toast.error(getErrorMessage(error, "Failed to load locations."));
      }
    };

    void loadLocations();
  }, [dispatch]);

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Locations</Typography>
          <Typography color="text.secondary">Rooms and areas where hotel assets are located.</Typography>
        </Box>
        <Button component={RouterLink} to="/locations/new" variant="contained">Add location</Button>
      </Box>

      {fetchLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress /></Box>
      ) : items.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Typography color="text.secondary">No locations yet.</Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>{items.map((location) => <LocationItem key={location.id} location={location} />)}</Stack>
      )}
    </Stack>
  );
};

export default Locations;
