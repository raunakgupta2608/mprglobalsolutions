import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  tableHead: {
    position: "sticky",
    top: 0,
    backgroundColor: "#282c34",
    zIndex: 100,
    whiteSpace: "nowrap",
    "& .MuiTableRow-root": {
      backgroundColor: "#282c34",
      textTransform: "uppercase",
      height: "70px !important",
    },
    "& .MuiTableSortLabel-root": {
      flexDirection: "row-reverse",
      paddingBottom: "4px",
    },
    "& .MuiTableCell-root": {
      color: "white",
      padding: "7px 10px 7px 16px",
      "& .Mui-active": {
        color: "white",
        backgroundColor: "#282c34",
        paddingBottom: "4px",
      },
    },
  },
});

const headCells = [
  {
    id: "id",
    label: "Id",
  },
  {
    id: "avatar",
    label: "Avatar",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "contact",
    label: "Contact",
  },
];

function AppTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const classes = useStyle();

  return (
    <TableHead classes={{ root: classes.tableHead }}>
      <TableRow style={{ height: "60px !important" }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
            {headCell.id && (
              <TableSortLabel
                data-testid="tableSort"
                active={orderBy === headCell.id}
                direction={
                  orderBy === headCell.id
                    ? order === "asc"
                      ? "asc"
                      : "desc"
                    : "asc"
                }
                onClick={() => {
                  onRequestSort(headCell.id, order === "asc" ? "desc" : "asc");
                }}
              >
                {orderBy === headCell.id ? (
                  <Box component="span">
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

AppTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc", ""]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default AppTableHead;
