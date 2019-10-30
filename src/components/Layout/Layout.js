import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Classes from './Layout.module.css';

const layout = (props) => (
    <Auxiliary>
        <div>
            Toolbar, Sidedrawer, Backdrop
        </div>

        <main className={Classes.Content}>
            {props.children}
        </main>
    </Auxiliary>
);

export default layout;