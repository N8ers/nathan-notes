import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import TabPanel from "./TabPanel";

import CypressNotes from "../markdown/CypressNotes.md";
import VueNotes from "../markdown/VueNotes.md";
import PythonNotes from "../markdown/PythonNotes.md";

export default function BasicTabs() {
  const [cypressNotes, setCypressNotes] = useState("");
  const [vueNotes, setVueNotes] = useState("");
  const [pythonNotes, setPythonNotes] = useState("");
  const [value, setValue] = useState(0);

  useEffect(() => {
    fetch(CypressNotes)
      .then((res) => res.text())
      .then((text) => setCypressNotes(text));
  });

  useEffect(() => {
    fetch(VueNotes)
      .then((res) => res.text())
      .then((text) => setVueNotes(text));
  });

  useEffect(() => {
    fetch(PythonNotes)
      .then((res) => res.text())
      .then((text) => setPythonNotes(text));
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    { label: "Vue", index: 0, notes: vueNotes },
    { label: "Cypress", index: 1, notes: cypressNotes },
    { label: "Python", index: 2, notes: pythonNotes },
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
            <ReactMarkdown children={tab.notes} remarkPlugins={[remarkGfm]} />
          </TabPanel>
        );
      })}
    </Box>
  );
}
