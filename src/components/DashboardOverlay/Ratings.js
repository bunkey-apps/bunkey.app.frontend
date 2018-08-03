/**
 * Ratings Stats
 */
import React from 'react';
import { Progress } from 'reactstrap';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

import { RctCard, RctCardContent, RctCardFooter } from '../RctCard';

const RatingsStats = () => (
    <RctCard
        customClasses="overflow-hidden"
        heading="Ratings"
        headingCustomClasses="text-left"
    >
        <RctCardContent noPadding>
            <div className="p-20">
                <span className="fs-14">Average Ratings</span>
                <ul className="list-inline rating-star mb-0">
                    <li className="list-inline-item text-yellow"><i className="zmdi zmdi-star"></i></li>
                    <li className="list-inline-item text-yellow"><i className="zmdi zmdi-star"></i></li>
                    <li className="list-inline-item text-yellow"><i className="zmdi zmdi-star"></i></li>
                    <li className="list-inline-item text-yellow"><i className="zmdi zmdi-star"></i></li>
                    <li className="list-inline-item text-muted"><i className="zmdi zmdi-star"></i></li>
                </ul>
                <span className="fs-14">4.89 out of 122 Ratings</span>
            </div>
            <h2 className="report-title">Rating Count</h2>
            <div className="table-responsive">
                <table className="table table-borderless table-middle mb-0">
                    <tbody>
                        <tr>
                            <td>5 Star</td>
                            <td className="w-50"><Progress color="yellow" value={85} /></td>
                            <td>7.14%</td>
                        </tr>
                        <tr>
                            <td>4 Star</td>
                            <td className="w-50"><Progress color="yellow" value={55} /></td>
                            <td>6.14%</td>
                        </tr>
                        <tr>
                            <td>3 Star</td>
                            <td className="w-50"><Progress color="yellow" value={75} /></td>
                            <td>3.14%</td>
                        </tr>
                        <tr>
                            <td>2 Star</td>
                            <td className="w-50"><Progress color="yellow" value={65} /></td>
                            <td>2%</td>
                        </tr>
                        <tr>
                            <td>1 Star</td>
                            <td className="w-50"><Progress color="yellow" value={25} /></td>
                            <td>1%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </RctCardContent>
        <RctCardFooter>
            <Button component={Link} to="/app/pages/report" variant="raised" className="btn-danger text-white">
                View All
          </Button>
        </RctCardFooter>
    </RctCard>
);

export default RatingsStats;
