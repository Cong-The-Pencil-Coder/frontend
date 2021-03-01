import { React } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const StyledTableCell = withStyles(() => ({
    head: {
        backgroundColor: '#BDE4FC',
        color: '#696969',
        border: '1px solid gray',
        borderColor: 'rgba(158, 150, 150, .5)'
    },
    body: {
        fontSize: 14,
        border: '1px solid gray',
        borderColor: 'rgba(158, 150, 150, .5)'
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 650,
        border: '1px solid gray'
    },
    textBtn: {
        background: "none",
        border: "none",
        margin: 0,
        padding: 0,
        cursor: "pointer",
        color: "#3399FF"
    }
});

const formatToCurrency = amount => {
    return "$ " + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

function ProjectsTable({ projects, onCheck, setSelectedProject }) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>Project Name</StyledTableCell>
                        <StyledTableCell align="right">Project Status</StyledTableCell>
                        <StyledTableCell align="right">Project Manager</StyledTableCell>
                        <StyledTableCell align="right">Project Contract Value</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project) => (
                        <StyledTableRow key={project._id}>
                            <StyledTableCell padding='checkbox' size='small' component="th" scope="row">
                                <input type="checkbox" onChange={(e) => onCheck(project, e)} />
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                <button
                                    className={classes.textBtn}
                                    onClick={() => {setSelectedProject(project)}}>
                                        {project.prj_name}
                                </button>
                            </StyledTableCell>
                            <StyledTableCell align="right">{project.prj_stat}</StyledTableCell>
                            <StyledTableCell align="right">{project.prj_manager}</StyledTableCell>
                            <StyledTableCell align="right">{formatToCurrency(project.prj_ctr_val)}</StyledTableCell>
                        </StyledTableRow >
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

ProjectsTable.propTypes = {
    projects: PropTypes.array.isRequired
}

export default ProjectsTable;