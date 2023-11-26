import {AppBar,Toolbar,Button,Stack,Typography,styled,InputBase,alpha,} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserActions";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: "auto",
  marginRight: "auto",
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const InputBaseStyled = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const userName = localStorage.getItem("username");
  const Navigate = useNavigate();
  if (!userName) {Navigate('/')}

  const homePage = () => {
    Navigate(`/userBanners`);
  };
  const handleAddBanner = () => {
    Navigate("/allProduct");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "black"  }}>
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
            marginLeft: "15rem"
          }}
        >
          BANNERS
        </Typography>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Search sx={{ flexGrow: 1 }}>
            <SearchIcon sx={{ color: "white" }} />
            <InputBaseStyled placeholder="Search…" />
          </Search>

          <Button variant="outlined" onClick={handleAddBanner} style={{ borderColor: 'white', color: 'white',marginLeft: ".5rem" }}>ADD BANNER</Button>

          <Stack
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Stack direction="row" spacing={3}>
              <HomeOutlinedIcon onClick={homePage} sx={{ color: "white" }} />
            </Stack>


          </Stack>
        </div>
      </Toolbar>
    </AppBar>
  );
}
