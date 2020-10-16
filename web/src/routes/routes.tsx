import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from '../pages/landing';
import OrphanagesMap from '../pages/orphanagesMap';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" exact component={OrphanagesMap} />
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;
