import React, { Fragment, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Controls from "../components/controls/Controls";
import { useForm } from '../components/useForm';


const projectStatuses = [
    { id: 'In Progress', title: 'In Progress' },
    { id: 'Tentative', title: 'Tentative' },
    { id: 'Completed', title: 'Completed' },
]

const useStyles = makeStyles({
    input: {
        backgroundColor: '#F8F8FF',
        width: '150px',
        color: 'black',
        borderRadius: '6px',
        fontSize:'15px',
        border: '2px solid rgba(0, 0, 0, 0.1)',
        padding: '5px',
        marginRight: "10px",
        marginTop: "10px",
        marginLeft: "12px",
    },
    select: {
        marginTop: "10px",
        backgroundColor: '#F8F8FF',
        borderRadius: '6px',
        width: '150px',
        fontSize:'15px',
        size: '50px',
        border: '2px solid rgba(0, 0, 0, 0.1)',
        padding: '6px',
        color: 'rgba(0, 0, 0, 0.6)',

    },
});

const ProjectSearchBar = ({ projectFilterOnChange, projects }) => {

    const [filter, setFilter] = useState('');
    const [manager, setManager] = useState('');
    const classes = useStyles();

    const onChange = (e) => {
        setFilter(e.target.value);
        const temp_mng = manager;
        projectFilterOnChange(e.target.value, temp_mng);
    };

    const onSelect = (e) => {
        setManager(e.target.value);
        const temp_filter = filter;
        projectFilterOnChange(temp_filter, e.target.value);
    }

    return (
        <div>
            <input
                className={classes.input}
                name="filter"
                value={filter}
                placeholder="Filter: Name, Code"
                onChange={onChange}
            />
            <select
                className={classes.select}
                name="prj_manager"
                label="Project Manager"
                value={manager}
                onChange={onSelect}
                options={projectStatuses}
            >
                <option value="" default>Project Manager</option>
                {projects.length > 0 ?
                    projects.map((instance) => {
                        return <option key={instance.prj_manager} value={instance.prj_manager}>{instance.prj_manager}</option>
                    }) : ("")
                }
            </select>
        </div>
    )
}

export default ProjectSearchBar;