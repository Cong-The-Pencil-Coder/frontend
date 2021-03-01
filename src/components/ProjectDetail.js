import { React, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import FeatureDetail from './FeatureDetail'
import Popup from './Popup'
import FeatureAddForm from '../pages/FeatureAddForm'
import * as ProjectService from '../services/projectService'

const ProjectDetail = ({ project, setSelectedProject }) => {

    const [openPopup, setOpenPopup] = useState(false);
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        setFeatures(project.prj_features)
    }, [openPopup])

    const addFeature = (feature) => {
        ProjectService.addFeature(project._id, feature).then((addedFeature) => {
            setFeatures([addedFeature, ...features]);
        });
    }

    return (
        <div className="projectContainer">
            <button className="backButton" onClick={() => setSelectedProject(null)}>back</button>
            <h2>Project Name: {project.prj_name}</h2>
            <p>Project Status: {project.prj_stat}</p>
            <p>Project Manager: {project.prj_manager}</p>
            <p>Total Contract Value: {project.prj_ctr_val}</p>
            <button className="addButton" onClick={() => setOpenPopup(true)}>Add New Feature</button>
            {features.length > 0 ? (
                features.map((feature) => {
                    return <FeatureDetail key={feature._id} feature={feature} />;
                })
            ) : ('No Features To Show')}

            <Popup
                title="Feature Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <FeatureAddForm
                    setOpenPopup={setOpenPopup}
                    addFeature={addFeature}
                />
            </Popup>
        </div>
    )
}

ProjectDetail.propTypes = {

}

export default ProjectDetail
