import React from 'react'
import PropTypes from 'prop-types'

const Tab = ({isSelected, children}) => {
    if (isSelected) {
        return (
            <div>
                {children}
            </div>
        )
    }

    return null;
}

Tab.propTypes = {

}

export default Tab;
