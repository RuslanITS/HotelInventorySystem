import { useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ItemForm from "../../components/ItemForm/ItemForm";
import { getErrorMessage } from "../../api/axiosApi";
import { fetchCategories } from "../../store/categories/categoriesThunks";
import { createItem } from "../../store/items/itemsThunks";
import { fetchLocations } from "../../store/locations/locationsThunks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { ItemApi } from "../../types";

const NewItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { createLoading } = useAppSelector((state) => state.items);
  const { items: categories } = useAppSelector((state) => state.categories);
  const { items: locations } = useAppSelector((state) => state.locations);

  useEffect(() => {
    const loadFormData = async (): Promise<void> => {
      try {
        await Promise.all([dispatch(fetchCategories()).unwrap(), dispatch(fetchLocations()).unwrap()]);
      } catch (error: unknown) {
        toast.error(getErrorMessage(error, "Failed to load form data."));
      }
    };

    void loadFormData();
  }, [dispatch]);

  const onSubmit = async (item: ItemApi): Promise<void> => {
    try {
      await dispatch(createItem(item)).unwrap();
      toast.success("Item created.");
      navigate("/items");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to create item."));
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Button component={RouterLink} to="/items" sx={{ mb: 1 }}>← Back</Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Create item</Typography>
        <Typography color="text.secondary">Register a hotel asset and assign its location.</Typography>
      </Box>
      <ItemForm onSubmit={onSubmit} categories={categories} locations={locations} isLoading={createLoading} />
    </Stack>
  );
};

export default NewItem;
