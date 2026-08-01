import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";

import ItemCard from "../../components/ItemCard/ItemCard";
import { getErrorMessage } from "../../api/axiosApi";
import { fetchCategories } from "../../store/categories/categoriesThunks";
import { fetchItems } from "../../store/items/itemsThunks";
import { fetchLocations } from "../../store/locations/locationsThunks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Items = () => {
  const dispatch = useAppDispatch();
  const { items, fetchLoading } = useAppSelector((state) => state.items);

  useEffect(() => {
    const loadItems = async (): Promise<void> => {
      try {
        await Promise.all([
          dispatch(fetchItems()).unwrap(),
          dispatch(fetchCategories()).unwrap(),
          dispatch(fetchLocations()).unwrap(),
        ]);
      } catch (error: unknown) {
        toast.error(getErrorMessage(error, "Failed to load inventory."));
      }
    };

    void loadItems();
  }, [dispatch]);

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Items</Typography>
          <Typography color="text.secondary">Registered hotel assets and their current locations.</Typography>
        </Box>
        <Button component={RouterLink} to="/items/new" variant="contained">Add item</Button>
      </Box>

      {fetchLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress /></Box>
      ) : items.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Typography color="text.secondary">No inventory items yet.</Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>{items.map((item) => <ItemCard key={item.id} item={item} />)}</Stack>
      )}
    </Stack>
  );
};

export default Items;
