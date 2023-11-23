import {AppBar, Toolbar,Button, Stack,Typography,styled,InputBase,alpha,} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";


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
  
    const homePage = () => {
      Navigate(`/userBanners`);
    };
  
    const handleSignOut = () => {
      localStorage.setItem("username", JSON.stringify(""));
      Navigate("/");
    };
  
    const handleAddBanner = () => {
      Navigate("/allProduct");
    };
  
    return (
      <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Stack sx={{ display: "flex", flexDirection: "row", alignItems: "center", flexGrow: 1 }}>
            <Button onClick={handleSignOut} sx={{ color: "white" }}>
              Sign Out
            </Button>
          </Stack>
  
          <Stack sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginX: 2 }}>
            <Stack direction="row" spacing={3}>
              <HomeOutlinedIcon onClick={homePage} sx={{ color: "white" }} />
            </Stack>
  
            <Stack sx={{ display: "flex", flexDirection: "row", alignItems: "center", color: "white" }}>
              <AccountCircleIcon />
              <Typography variant="h6">{JSON.parse(userName!)}</Typography>
            </Stack>
          </Stack>
          <Button onClick={handleAddBanner} sx={{ color: "white" }}>
            ADD BANNER
          </Button>
  
          <Search>
            <SearchIcon sx={{ color: "white" }} />
            <InputBaseStyled placeholder="Search…" />
          </Search>
        </Toolbar>
      </AppBar>
    );
  }