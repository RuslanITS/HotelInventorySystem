import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
} from "@mui/material";

import type { LocationApi } from "../../types";

interface Props {
  onSubmit: (location: LocationApi) => void | Promise<void>;
  existingLocation?: LocationApi;
  isLoading?: boolean;
}

const LocationForm = ({
                        onSubmit,
                        existingLocation,
                        isLoading = false,
                      }: Props) => {
  const [location, setLocation] = useState<LocationApi>(
    existingLocation ?? {
      name: "",
      description: "",
    },
  );

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setLocation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await onSubmit(location);
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
          label="Location name"
          name="name"
          value={location.name}
          onChange={onChange}
        />

        <TextField
          required
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={location.description}
          onChange={onChange}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save location"}
        </Button>
      </Box>
    </Paper>
  );
};

export default LocationForm;
