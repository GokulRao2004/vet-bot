import { Typography, Box, useTheme } from "@mui/material";


const Header = ({ title, subtitle }) => {
  const theme = useTheme();
 
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        fontFamily={'itim'}
        color={theme.palette.primary[600]}
        fontWeight="500"
        sx={{ m: "1rem 0 5px 3rem" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.grey[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;