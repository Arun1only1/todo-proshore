import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../store/slice/todoSlice";
import Todo from "../components/Todo";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const HomeTabs = () => {
  const { tab } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setTab(newValue));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Todo task" {...a11yProps(0)} />
          <Tab label="Completed task" {...a11yProps(1)} />
          <Tab label="All task" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tab} index={0}>
        <Todo isCompleted={false} />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        <Todo isCompleted={true} />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={2}>
        <Todo isCompleted={undefined} />
      </CustomTabPanel>
    </Box>
  );
};

export default HomeTabs;
