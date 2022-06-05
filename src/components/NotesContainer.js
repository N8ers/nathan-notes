import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import TabPanel from "./TabPanel";

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    { label: "Vue", index: 0, notes: "vue notes" },
    { label: "Cypress", index: 1, notes: "cypress notes" },
    { label: "Python", index: 2, notes: "python notes" },
    { label: "Flask", index: 3, notes: "flask notes" },
  ];

  return (
    <Box sx={{ width: "75%", backgroundColor: "white", color: "black" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          {tabs.map((tab) => {
            return <Tab key={tab.index} label={tab.label} />;
          })}
        </Tabs>
      </Box>

      {tabs.map((tab) => {
        return (
          <TabPanel key={tab.index} value={value} index={tab.index}>
            {tab.notes}
          </TabPanel>
        );
      })}
    </Box>
  );
}
