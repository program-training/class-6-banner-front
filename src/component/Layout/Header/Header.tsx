import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import UserProfile from "./UserActions";
import axios from "axios";
import { useEffect, useState } from "react";
import { SearchResult } from "../../interface/interface";
const api = import.meta.env.VITE_MY_SERVER;

export default function Header() {
  const Navigate = useNavigate();
  const userName = localStorage.getItem("username");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (searchQuery: string) => {
    try {
      const response = await axios.get(
        `${api}/api/banners?search=${searchQuery}`
      );
      if (!Array.isArray(response.data)) {
        throw new Error("Response is not an array");
      }
      const searchItems = response.data.map((banner) => ({
        label: banner.image.alt,
        id: banner._id,
      }));
      setSearchResults(searchItems);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  useEffect(() => {
    const loadInitialSearchResults = async () => {
      try {
        const response = await axios.get(`${api}/api/banners`);
        if (!Array.isArray(response.data)) {
          throw new Error("Response is not an array");
        }
        const searchItems = response.data.map((banner) => ({
          label: banner.image.alt,
          id: banner._id,
        }));
        setSearchResults(searchItems);
      } catch (error) {
        console.error("Error fetching initial search results:", error);
      }
    };
    loadInitialSearchResults();
  }, []);

  if (!userName) {
    Navigate("/");
  }

  const homePage = () => {
    Navigate(`/userBanners`);
  };
  const handleAddBanner = () => {
    Navigate("/allProduct");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: "white",
            flexGrow: 1,
          }}
        >
          <UserProfile />
          <Typography variant="h6" sx={{ marginLeft: "0.5rem" }}>
            {JSON.parse(userName!)}
          </Typography>
        </Stack>

        <Typography
          onClick={homePage}
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { md: "flex" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            cursor: "pointer",
            marginLeft: "15rem",
          }}
        >
          BANNERS
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Autocomplete
            freeSolo
            options={searchResults}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.label
            }
            onChange={(_, value) => {
              if (typeof value !== "string" && value?.id) {
                Navigate(`/bannerPage/${value.id}`);
              }
            }}
            onInputChange={(_, newInputValue) => {
              if (newInputValue.length > 2) {
                handleSearch(newInputValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Banner"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  startAdornment: (
                    <SearchIcon sx={{ color: "white", marginRight: "10px" }} />
                  ),
                }}
                sx={{
                  width: 300,
                  backgroundColor: "#333",
                  borderRadius: "4px",
                  color: "white",
                  ".MuiInputLabel-root": {
                    color: "white",
                  },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
            )}
          />
          <Button
            variant="outlined"
            onClick={handleAddBanner}
            style={{
              borderColor: "white",
              color: "white",
              marginLeft: ".5rem",
            }}
          >
            ADD BANNER
          </Button>
          <Stack
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <HomeOutlinedIcon onClick={homePage} sx={{ color: "white" }} />
          </Stack>
        </div>
      </Toolbar>
    </AppBar>
  );
}
