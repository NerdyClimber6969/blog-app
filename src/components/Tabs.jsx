import React, { useState } from 'react';

function Tabs({ children, defaultActiveTab=0 }) {
    const [activeTab, setActiveTab] = useState(defaultActiveTab);

    const tabs = React.Children.toArray(children).filter(
        child => React.isValidElement(child) && child.type === Pane
    );

    return (
        <div className='tabs'>
            <div className='tabs-header'>
                {tabs.map((tab, index) => (
                    <button key={index}
                        className={`font-sm tab-button ${index === activeTab ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.props.title}
                    </button>
                ))}
            </div>
            <div className='tabs-content'>
                {tabs[activeTab]}
            </div>
        </div>
    );
};

function Pane({ children, title, style }) {
    return (
        <div 
            className='tabs-pane'
            style={style}
        >
            {children}
        </div>
    );
};

Tabs.Pane = Pane;

export default Tabs;