import { useState, Fragment } from 'react'
import TabNav from './components/TabNav'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tab from './components/Tab'
import Header from './components/layouts/Header'
import ProjectController from './components/ProjectController'
import './App.css';

const App = () => {

  const [selectedTab, setSelectedTab] = useState("Projects");

  return (
    <Fragment>
      <div className="container-main">
        <Header />
        <TabNav setActiveTab={setSelectedTab} activeTab={selectedTab} tabs={['Projects', 'Programs', 'Resources']} selected={selectedTab}>
          <Tab isSelected={selectedTab === 'Projects'}>
            <ProjectController />
          </Tab>
          <Tab isSelected={selectedTab === 'Programs'}>
            <p>Programs Tab is in development</p>
          </Tab>
          <Tab isSelected={selectedTab === 'Resources'}>
            <p>Resources Tab is in development</p>
          </Tab>
        </TabNav>
      </div>
    </Fragment>
  );
}

export default App;
