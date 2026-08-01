import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
} from "@mui/material";

import type { CategoryApi } from "../../types";

interface Props {
  onSubmit: (category: CategoryApi) => void | Promise<void>;
  existingCategory?: CategoryApi;
  isLoading?: boolean;
}

const CategoryForm = ({
                        onSubmit,
                        existingCategory,
                        isLoading = false,
                      }: Props) => {
  const [category, setCategory] = useState<CategoryApi>(
    existingCategory ?? {
      name: "",
      description: "",
    },
  );

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await onSubmit(category);
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
          label="Category name"
          name="name"
          value={category.name}
          onChange={onChange}
        />

        <TextField
          required
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={category.description}
          onChange={onChange}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save category"}
        </Button>
      </Box>
    </Paper>
  );
};

export default CategoryForm;
