import { useState, useEffect } from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'

import ProjectsTab from './components/ProjectsTab'



const App = () => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const projectsFromServer = await fetchProjects()
      setProjects(projectsFromServer)
    }

    getProjects();

  }, [])

  // Fetch Projects
  const fetchProjects = async () => {
    const res = await fetch('https://penguin-prj-mngm-appservice.azurewebsites.net/projects',
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json()

    return data
  }













  return (
    <div className="container">
      <ProjectsTab 
        projects={projects}
      />
    </div>
  );
}



export default App;
