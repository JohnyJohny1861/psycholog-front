import React from 'react';

import Header from './Header/Header';
import Features from './Features/Features';
import Story from './Story/Story';
import CoursesSection from './CoursesSection/CoursesSection';
import Contacts from './Contacts/Contacts';

const Main = () => {
    return (
        <div>
            <Header />
            <Features />  
            <Story />   
            <CoursesSection title="Yangi darslar"/> 
            <Contacts />  
        </div>
    )
}

export default Main;
