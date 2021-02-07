import React from 'react'
import PropTypes from 'prop-types'
import ProjectsTable from './ProjectsTable'
import Button from './Button'

const ProjectsTab = ({ projects }) => {
    return (
        <div>
            <Button
                text={'Add New Project'}
            />
            <ProjectsTable
                projects={projects}
            />
        </div>
    )
}

ProjectsTab.propTypes = {
    projects: PropTypes.array.isRequired
}

export default ProjectsTab
