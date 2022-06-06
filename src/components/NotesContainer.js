import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import TabPanel from "./TabPanel";

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    { label: "Vue", index: 0, notes: "./vueNotes.md" },
    { label: "Cypress", index: 1, notes: "cypress notes" },
    { label: "Python", index: 2, notes: "python notes" },
    { label: "Flask", index: 3, notes: "flask notes" },
    { label: "Postgres", index: 4, notes: "postgres notes" },
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
            <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
          </TabPanel>
        );
      })}
    </Box>
  );
}
