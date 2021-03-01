
const URI1 = 'https://penguin-prj-mngm-appservice.azurewebsites.net';

const URI2 = 'http://localhost:8080';

// Fetch Projects
const fetchProjects = async () => {
    const res = await fetch(URI2 + '/projects');
    const data = await res.json();
    return data;
}

// Fetch Project by Id
const fetchProjectById = async (prj_id) => {
    const res = await fetch(URI2 + '/projects/' + prj_id);
    const data = await res.json();
    return data;
}

// Add Project
const addProject = async (project) => {
    const res = await fetch(URI2 + '/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(project),
    });

    const data = await res.json();
    return data;
}

// Delete Project
const deleteProject = async (id) => {
    await fetch(URI2 + `/${id}`, {
        method: 'DELETE',
    })
}


// Add Project
const addFeature = async (projectId, feature) => {
    console.log(projectId)
    console.log(feature)
    const res = await fetch(URI2 + '/projects/features/' + projectId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(feature),
    });

    const data = await res.json();
    return data;
}


module.exports = {
    fetchProjects,
    fetchProjectById,
    addProject,
    deleteProject,

    addFeature,
}