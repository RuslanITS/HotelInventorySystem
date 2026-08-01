import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";

import type {
  Category,
  ItemApi,
  Location,
} from "../../types";

interface Props {
  onSubmit: (item: ItemApi) => void | Promise<void>;
  existingItem?: ItemApi;
  categories: Category[];
  locations: Location[];
  isLoading?: boolean;
}

const ItemForm = ({
                    onSubmit,
                    existingItem,
                    categories,
                    locations,
                    isLoading = false,
                  }: Props) => {
  const [item, setItem] = useState<ItemApi>(
    existingItem ?? {
      name: "",
      description: "",
      categoryId: "",
      locationId: "",
      createdAt: new Date().toISOString().slice(0, 10),
      image: null,
    },
  );

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] || null;

    setItem((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const onFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await onSubmit(item);
  };

  return (
    <Paper
      component="form"
      elevation={3}
      onSubmit={onFormSubmit}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        boxShadow: "none",
        border: 1,
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <TextField
          required
          fullWidth
          label="Item name"
          name="name"
          value={item.name}
          onChange={onChange}
        />

        <TextField
          required
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={item.description}
          onChange={onChange}
        />

        <TextField
          required
          select
          fullWidth
          label="Category"
          name="categoryId"
          value={item.categoryId}
          onChange={onChange}
        >
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              value={category.id}
            >
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          fullWidth
          type="date"
          label="Registration date"
          name="createdAt"
          value={item.createdAt}
          onChange={onChange}
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <TextField
          required
          select
          fullWidth
          label="Location"
          name="locationId"
          value={item.locationId}
          onChange={onChange}
        >
          {locations.map((location) => (
            <MenuItem
              key={location.id}
              value={location.id}
            >
              {location.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          component="label"
          variant="outlined"
        >
          Upload image

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save item"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ItemForm;
