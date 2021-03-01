import { useState, useEffect } from 'react'
import * as ProjectService from '../services/projectService'
import ProjectsTab from './ProjectsTab'
import ProjectDetail from './ProjectDetail'

const ProjectController = () => {

  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    const getProjects = async () => {
      const projectsFromServer = await ProjectService.fetchProjects();
      setProjects(projectsFromServer.map(project => {
        return {...project, selected: false}
      }));
    };
    getProjects();

  }, [openPopup])

  const changeTab = (tab) => {
    setActiveTab(tab);
  }

  if(selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    );
  }


  return (
        <ProjectsTab
            projects={projects}
            setProjects={setProjects}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            activeTab={activeTab}
            changeTab={changeTab}
            setSelectedProject={setSelectedProject}
        />
  );
}

export default ProjectController;
