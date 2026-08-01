import { useEffect } from "react";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ItemForm from "../../components/ItemForm/ItemForm";
import { getErrorMessage } from "../../api/axiosApi";
import { fetchCategories } from "../../store/categories/categoriesThunks";
import { fetchItemById, updateItem } from "../../store/items/itemsThunks";
import { fetchLocations } from "../../store/locations/locationsThunks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { ItemApi } from "../../types";

const EditItem = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { item, fetchOneLoading, updateLoading } = useAppSelector((state) => state.items);
  const { items: categories } = useAppSelector((state) => state.categories);
  const { items: locations } = useAppSelector((state) => state.locations);

  useEffect(() => {
    const loadFormData = async (): Promise<void> => {
      if (!id) return;
      try {
        await Promise.all([
          dispatch(fetchItemById(id)).unwrap(),
          dispatch(fetchCategories()).unwrap(),
          dispatch(fetchLocations()).unwrap(),
        ]);
      } catch (error: unknown) {
        toast.error(getErrorMessage(error, "Failed to load item data."));
      }
    };

    void loadFormData();
  }, [dispatch, id]);

  const onSubmit = async (itemData: ItemApi): Promise<void> => {
    if (!id) return;
    try {
      await dispatch(updateItem({ id, item: itemData })).unwrap();
      toast.success("Item updated.");
      navigate("/items");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to update item."));
    }
  };

  if (fetchOneLoading) return <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress /></Box>;
  if (!item) return <Typography color="text.secondary">Item is unavailable.</Typography>;

  return (
    <Stack spacing={3}>
      <Box>
        <Button component={RouterLink} to="/items" sx={{ mb: 1 }}>← Back</Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Edit item</Typography>
        <Typography color="text.secondary">Update asset details, image and registration date.</Typography>
      </Box>
      <ItemForm
        existingItem={{
          name: item.name,
          description: item.description,
          categoryId: item.categoryId,
          locationId: item.locationId,
          createdAt: item.createdAt.slice(0, 10),
          image: null,
        }}
        categories={categories}
        locations={locations}
        onSubmit={onSubmit}
        isLoading={updateLoading}
      />
    </Stack>
  );
};

export default EditItem;
