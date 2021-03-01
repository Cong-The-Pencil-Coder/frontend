import React from 'react'
import PropTypes from 'prop-types'

const TabNav = ({tabs, activeTab, setActiveTab, children}) => {
    return (
        <div className="tab1">
                {
                    tabs.map(tab => {
                        const active = (tab === activeTab ? 'active' : '');
                        const first_button = (tab === 'Projects' ? 'first-button' : '')
                        return(
                            <button key={tab} className={"tab-button " + active + " " + first_button} onClick={()=> setActiveTab(tab)}>
                                { tab }
                            </button>
                        )
                    })
                }
            { children }
        </div>
    );
}

TabNav.propTypes = {

}
export default TabNav;
