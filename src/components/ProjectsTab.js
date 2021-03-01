import { React, useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import ProjectsTable from './ProjectsTable'
import Button from './controls/Button'
import Popup from './Popup'
import ProjectAddForm from '../pages/ProjectAddForm'
import * as ProjectService from '../services/projectService'
import ProjectSearchBar from './ProjectSearchBar'


const ProjectsTab = ({ projects, setProjects, activeTab, changeTab, openPopup, setOpenPopup, setSelectedProject }) => {

    const classes = useStyles();
    const buttons = ['All', 'In Progress', 'Tentative', 'Completed'];
    const [selectedProjects, setSelectedProjects] = useState({});
    const [projectView, setProjectView] = useState(projects);
    const [disabled, setDisabled] = useState(true);

    const initStatusButtons = () => {
        let tempArr = {};
        tempArr['All'] = 0;
        projects.forEach((prj) => {
            let status = prj.prj_stat;
            if (!tempArr[status]) {
                tempArr[status] = 0;
            }
            tempArr[status] += 1;
            tempArr['All'] += 1;
        })
        return tempArr;
    }

    const [statusButtons, setStatusButtons] = useState(initStatusButtons());

    useEffect(() => {
        setStatusButtons(initStatusButtons());
        setProjectView(projects);
    }, [projects])

    const addProject = (project) => {
        ProjectService.addProject(project).then((addedProject) => {
            setProjects([addedProject, ...projects]);
        });
    }

    function getAllIndexes(arr, val) {
        var indexes = [], i;
        for (i = 0; i < arr.length; i++)
            if (arr[i] === val)
                indexes.push(i);
        return indexes;
    }

    const onCheck = (project, e) => {
        selectedProjects[project._id] = e.target.checked;
        setSelectedProjects(selectedProjects);
        setDisabled(isProjectSelected())
    }

    const deleteSelected = () => {
        const indexes = getAllIndexes(Object.values(selectedProjects), true);
        const allSelectedIds = Object.keys(selectedProjects);
        let tempProjects = projects;
        indexes.forEach((index) => {
            const id = allSelectedIds[index];
            ProjectService.deleteProject(id).then(() => {
                tempProjects = tempProjects.filter(prj => prj._id !== id)
            }).then(() => {
                setProjects(tempProjects);
                setSelectedProjects({});
            });
        });
    }

    const isProjectSelected = () => {
        if (Object.values(selectedProjects).indexOf(true)) {
            return true;
        }
        return false;
    }

    const projectFilterOnChange = (projName, projManager) => {
        setProjectView(projects.filter(prj => prj.prj_name.toLowerCase().includes(projName.toLowerCase()) &&
            prj.prj_manager.includes(projManager)
        ))
    }

    return (
        <div className={classes.projectContainer}>
            <div className={classes.container1}>
                <Button
                    text={'Add New Project'}
                    onClick={() => setOpenPopup(true)}
                    className={classes.add_btn}
                />

                <Button
                    text={'Delete'}
                    onClick={() => deleteSelected()}
                    className={classes.delete_btn}
                    disabled={disabled}
                />
                <div className={classes.container2}>
                    <ProjectSearchBar
                        projectFilterOnChange={projectFilterOnChange}
                        projects={projects}
                    />

                    <div className={classes.container3}>
                        {buttons.map(button => {
                            return <Fragment key={button}>
                                <button
                                    className={classes.tab_btn}
                                    onClick={() => changeTab(button)}
                                    style={button === activeTab ? { color: '#00008B' } : { color: '#000000' }}
                                >
                                    {statusButtons[button]}<br />{button}
                                </button>
                                <label className={classes.bar}> | </label>
                            </Fragment>
                        })}
                    </div>

                    {projects.length > 0 ? (
                        <ProjectsTable
                            setSelectedProject={setSelectedProject}
                            onCheck={onCheck}
                            projects={
                                activeTab === 'All' ? projectView : projectView.filter(project => project.prj_stat === activeTab)}
                        />
                    ) : ('No Projects To Show')}

                    <Popup
                        title="Project Form"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        < ProjectAddForm
                            setOpenPopup={setOpenPopup}
                            addProject={addProject} />
                    </Popup>
                </div>
            </div>
        </div>
    )
}

ProjectsTab.propTypes = {
    projects: PropTypes.array.isRequired
}

const useStyles = makeStyles({
    add_btn: {
        backgroundColor: '#0066FF',
        color: 'white',
        borderRadius: '6px',
        padding: '5px 10px 5px',
        marginLeft: '20px',
        marginTop: '80px'
    },

    delete_btn: {
        backgroundColor: '#0066FF',
        color: 'white',
        borderRadius: '6px',
        padding: '5px 10px 5px',
        marginTop: '80px'
    },

    tab_btn: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        shadowOpacity: 0,
        elevation: 0,
        fontSize: '20px',
        marginRight: '25px',
        marginLeft: '25px',
        padding: '10px ',
        border: 'none'
    },

    container3: {
        marginLeft: '20px',
        marginRight: '100px',
    },

    container2: {
        backgroundColor: '#e7e7e7',
        borderRadius: '10px',
        border: '1px solid gray',
        marginTop: '15px',
        marginLeft: '20px',
        marginRight: '20px'
    },

    container1: {
        border: 'none',
        marginTop: '70px',
        padding: '10px'
    },

    bar: {
        fontSize: '35px',
        color: 'rgba(0, 0, 0, 0.1)',
    },

    projectContainer: {
        border: 'none',
        borderColor: 'white',
        backgroundColor: 'white',
        marginTop: '-70px'
    }
});

export default ProjectsTab
