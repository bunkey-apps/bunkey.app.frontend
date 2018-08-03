/**
 * Rct Page Loader
 */
import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

const RctPageLoader = () => (
    <div className="page-loader d-flex justify-content-center">
        <CircularProgress />
    </div>
);

export default RctPageLoader;
