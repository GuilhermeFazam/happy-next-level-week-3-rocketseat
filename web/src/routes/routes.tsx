import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateOrphanage from '../pages/CreateOrphanage';
import Landing from '../pages/Landing';
import Orphanage from '../pages/Orphanage';
import OrphanagesMap from '../pages/OrphanagesMap';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" exact component={OrphanagesMap} />
                <Route
                    path="/orphanges/create"
                    exact
                    component={CreateOrphanage}
                />
                <Route path="/orphanges/:id" exact component={Orphanage} />
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;
