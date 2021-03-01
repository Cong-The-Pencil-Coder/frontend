import React from 'react'
import PropTypes from 'prop-types'

const FeatureDetail = ({feature}) => {
    return (
        <div>
            <hr/>
            <h3>{feature.ftr_name}</h3>
            <p>Status: {feature.ftr_stat}</p>
            <p>Group: {feature.ftr_group}</p>
            <p>Description: {feature.ftr_desc}</p>
        </div>
    )
}

FeatureDetail.propTypes = {

}

export default FeatureDetail
