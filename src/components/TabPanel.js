import Box from "@mui/material/Box";

export default function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index} id={`simple-tabpanel-${index}`}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
