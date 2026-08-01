import { Box, Container, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Categories from "./pages/Categories/Categories";
import EditCategory from "./pages/EditCategory/EditCategory";
import EditItem from "./pages/EditItem/EditItem";
import EditLocation from "./pages/EditLocation/EditLocation";
import Home from "./pages/Home/Home";
import Items from "./pages/Items/Items";
import Locations from "./pages/Locations/Locations";
import NewCategory from "./pages/NewCategory/NewCategory";
import NewItem from "./pages/NewItem/NewItem";
import NewLocation from "./pages/NewLocation/NewLocation";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "grey.50",
        }}
      >
        <Header />
        <Box component="main" sx={{ flexGrow: 1, py: { xs: 3, md: 5 } }}>
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/new" element={<NewCategory />} />
              <Route path="/categories/:id/edit" element={<EditCategory />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/locations/new" element={<NewLocation />} />
              <Route path="/locations/:id/edit" element={<EditLocation />} />
              <Route path="/items" element={<Items />} />
              <Route path="/items/new" element={<NewItem />} />
              <Route path="/items/:id/edit" element={<EditItem />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default App;
