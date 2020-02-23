import React from 'react';
import './Contacts.css';
import { YMaps, Map } from 'react-yandex-maps';

import bgImage from '../../../assets/contacts1.jpg';
import person1 from '../../../assets/contacts-p1.jpg';
import person2 from '../../../assets/contacts-p2.jpg';
import person3 from '../../../assets/contacts-p3.jpg';
import person4 from '../../../assets/contacts-p4.jpg';

import Heading from '../../../UI/Heading/Heading';

export default () => {
    return (
        <div className="Contacts">
            <Heading bgImage={bgImage} title="Biz bilan bog'laning"/>
        
            <section id="contact" className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card p-4">
                                <div className="card-body">
                                    <h2>Manzil:</h2>
                                    <p>550 Main st, Boston MA</p>
                                    <h2>Email:</h2>
                                    <p>test@test.com</p>
                                    <h2>Telefon:</h2>
                                    <p>(555) 555-5555</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card p-0">
                                <div className="card-body Contacts_map">
                                    <YMaps>
                                        <Map 
                                            width="100%"
                                            height="100%"
                                            defaultState={{
                                                center: [41.340856, 69.286737], 
                                                zoom: 16
                                            }} />
                                    </YMaps>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 

            <section id="meet-staff" className="text-white text-center">
                <div className="container">
                    <h1 className="mb-5">Bizning hodimlar</h1>
                    <hr className="mb-4"/>
                    <div className="row">
                        <div className="col-md-3">
                            <img 
                                src={person1} 
                                alt="" 
                                className="img-fluid rounded-circle mb-2"/>
                            <h4>Jane Doe</h4>
                            <small>Marketing Manager</small>
                        </div>
                        <div className="col-md-3">
                            <img 
                                src={person2} 
                                alt="" 
                                className="img-fluid rounded-circle mb-2"/>
                            <h4>Sara Williams</h4>
                            <small>Business Manager</small>
                        </div>
                        <div className="col-md-3">
                            <img 
                                src={person3} 
                                alt="" 
                                className="img-fluid rounded-circle mb-2"/>
                            <h4>Jone Doe</h4>
                            <small>CEO</small>
                        </div>
                        <div className="col-md-3">
                            <img 
                                src={person4} 
                                alt="" 
                                className="img-fluid rounded-circle mb-2"/>
                            <h4>Steve Smith</h4>
                            <small>Web Developer</small>
                        </div>
                    </div>
                </div>
            </section>           
        </div>
    )
}
