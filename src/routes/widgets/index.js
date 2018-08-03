/**
 * Widgets
 */
/* eslint-disable */
import React from 'react';

// Listing
import ToDoListWidget from '../../components/Widgets/ToDoList';
import NewCustomersWidget from '../../components/Widgets/NewCustomers';
import Notifications from '../../components/Widgets/Notifications';

import OrderStatusWidget from '../../components/Widgets/OrderStatus';

import EmployeePayrollWidget from '../../components/Widgets/EmployeePayroll';
import RecentOrdersWidget from '../../components/Widgets/RecentOrders';

import VisitorAreaChartWidget from '../../components/Widgets/VisitorAreaChart';
import SalesAreaChartWidget from '../../components/Widgets/SalesAreaChart';
import OrdersAreaChartWidget from '../../components/Widgets/OrdersAreaChart';

import OverallTrafficStatusWidget from '../../components/Widgets/OverallTrafficStatus';
import ExpensesWidget from '../../components/Widgets/Expenses';

import TotalEarnsChartWidget from '../../components/Widgets/TotalEarnsChart';
import EmailStatisticsVersion2Widget from '../../components/Widgets/EmailStatisticsVersion2';

import CommentsWidget from '../../components/Widgets/Comments';
import SocialCompaninesWidget from '../../components/Widgets/SocialCompanies';

import NewEmailsWidget from '../../components/Widgets/NewEmails';
import TopSellingWidget from '../../components/Widgets/TopSelling';

// Miscellaneous
import TotalSalesWidget from '../../components/Widgets/TotalSales';
import NetProfitWidget from '../../components/Widgets/NetProfit';
import TaxStatsWidget from '../../components/Widgets/TaxStats';
import SocialFeedsWidget from '../../components/Widgets/SocialFeeds';

import WeatherWidgetV2 from '../../components/Widgets/WeatherV2';
import SiteVisitorChartWidget from '../../components/Widgets/SiteVisitorsChart';

import Reminders from '../../components/Widgets/Reminders';
import ContactRequestWidget from '../../components/Widgets/ContactRequest';
import Notes from '../../components/Widgets/Notes';
import WeatherWidget from '../../components/Widgets/Weather';

import DiscoverPeoplesWidget from '../../components/Widgets/DiscoverPeoples';
import ProductReportsWidget from '../../components/Widgets/ProductReports';
import RecentActivity from '../../components/Widgets/RecentActivity';

import ComposeEmailWidget from '../../components/Widgets/ComposeEmail';
import CurrentTimeLocation from '../../components/Widgets/CurrentTimeLocation';
import CurrentDateWidget from '../../components/Widgets/CurrentDate';
import TodayOrdersStatsWidget from '../../components/Widgets/TodayOrdersStats';

// Graphs And Charts
import BandWidthAreaChartWidget from '../../components/Widgets/BandWidthAreaChart';
import BandWidthUsageBarChartWidget from '../../components/Widgets/BandWidthUsageBarChart';

import TotalEarnsWithAreaChartWidget from '../../components/Widgets/TotalEarnsWithAreaChart';

import ProductStatsWidget from '../../components/Widgets/ProductStats';
import EmailStaticsWidget from '../../components/Widgets/EmailStatics';

import RevenueWidget from '../../components/Widgets/Revenue';
import OnlineVisitorsWidget from '../../components/Widgets/OnlineVisitors';
import TrafficSourcesWidget from '../../components/Widgets/TrafficSources';
import BandwidthUsageWidget from '../../components/Widgets/BandwidthUsage';

// page title bar
import PageTitleBar from '../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../util/IntlMessages';

// rct card box
import { RctCard, RctCardContent } from '../../components/RctCard';

// rct collapsible card
import RctCollapsibleCard from '../../components/RctCollapsibleCard/RctCollapsibleCard';

// data
import {
  todoData,
  newCustomers,
  messages,
  notificationTypes,
  notifications,
  ordersStatus,
  employeePayroll,
  newEmails,
  trafficStatus,
  totalSales,
  netProfit,
  expenses,
  totalEarns,
  taxStats
} from '../dashboard/dashboard-v1/data';

// widgets data
import {
  recentOrders,
  comments,
  socialCompanines,
  topSellingProducts,
  siteVisitors,
  reminders,
  discoverPeoples,
  productsReports,
  recentActivities,
  visitorsData,
  salesData,
  ordersData,
  emailStatisticsData,
  dataUsed,
  productStats,
  emailStatisticsV2Data,
  totalRevenue,
  onlineVisitorsData,
  trafficSources,
  totalEarnsV2
} from './data';

const Widgets = ({ match }) => (
  <div className="app-widgets">
    <PageTitleBar title={<IntlMessages id="sidebar.widgets" />} match={match} />
    <h2 className="widget-heading">Listing</h2>
    <div className="row">
      <RctCollapsibleCard
        customClasses="to-do-list"
        colClasses="col-sm-6 col-md-4 col-lg-4 d-xs-half-block d-xxs-full"
        heading={<IntlMessages id="widgets.toDoList" />}
        collapsible
        reloadable
        closeable
        fullBlock
      >
        <ToDoListWidget data={todoData} />
      </RctCollapsibleCard>
      <RctCollapsibleCard
        colClasses="col-sm-6 col-md-4 col-lg-4 d-xs-half-block d-xxs-full"
        heading={<IntlMessages id="widgets.newCustomers" />}
        collapsible
        reloadable
        closeable
        fullBlock
      >
        <NewCustomersWidget data={newCustomers} />
      </RctCollapsibleCard>
      <RctCollapsibleCard
        colClasses="col-sm-12 col-md-4 col-lg-4 d-xs-full"
        fullBlock
      >
        <Notifications
          messages={messages}
          notificationTypes={notificationTypes}
          notifications={notifications}
        />
      </RctCollapsibleCard>
    </div>
    <RctCollapsibleCard
      heading={<IntlMessages id="widgets.orderStatus" />}
      collapsible
      reloadable
      closeable
      fullBlock
    >
      <OrderStatusWidget data={ordersStatus} />
    </RctCollapsibleCard>
    <div className="row">
      <RctCollapsibleCard
        colClasses="col-sm-12 col-md-6 d-xs-full"
        heading={<IntlMessages id="widgets.employeePayroll" />}
        collapsible
        reloadable
        closeable
        fullBlock
      >
        <EmployeePayrollWidget data={employeePayroll} />
      </RctCollapsibleCard>
      <RctCollapsibleCard
        colClasses="col-sm-12 col-md-6 d-xs-full"
        heading={<IntlMessages id="widgets.RecentOrders" />}
        collapsible
        reloadable
        closeable
        fullBlock
      >
        <RecentOrdersWidget data={recentOrders} />
      </RctCollapsibleCard>
    </div>
    <RctCollapsibleCard
      heading={<IntlMessages id="widgets.socialCompanines" />}
      collapsible
      reloadable
      closeable
      fullBlock
    >
      <SocialCompaninesWidget data={socialCompanines} />
    </RctCollapsibleCard>
    <div className="row">
      <RctCollapsibleCard
        colClasses="col-sm-12 col-md-7 col-lg-8 w-xs-full"
        heading={<IntlMessages id="widgets.commments" />}
        collapsible
        reloadable
        closeable
        fullBlock
        contentCustomClasses="comment-section"
      >
        <CommentsWidget data={comments} />
      </RctCollapsibleCard>
      <RctCollapsibleCard
        colClasses="col-sm-12 col-md-5 col-lg-4 w-xs-full"
        heading={<IntlMessages id="widgets.topSellings" />}
        collapsible
        reloadable
        closeable
        fullBlock
      >
        <TopSellingWidget data={topSellingProducts} />
      </RctCollapsibleCard>
    </div>
    <div className="row">
      <RctCollapsibleCard
        colClasses="col-sm-12 col-md-12"
        heading={<IntlMessages id="widgets.newEmails" />}
        collapsible
        reloadable
        closeable
        fullBlock
      >
        <NewEmailsWidget data={newEmails} />
      </RctCollapsibleCard>
    </div>
    <h2 className="widget-heading">Miscellaneous</h2>
    <div className="social-card-wrapper">
      <div className="row">
        <div className="col-sm-6 col-md-3 col-lg-3 b-3 d-xxs-half-block d-xs-half-block">
          <SocialFeedsWidget
            type="facebook"
            friendsCount="89k"
            icon="ti-facebook"
            feedsCount="459"
          />
        </div>
        <div className="col-sm-6 col-md-3 col-lg-3 b-3 d-xxs-half-block d-xs-half-block">
          <SocialFeedsWidget
            type="twitter"
            friendsCount="89k"
            feedsCount="459"
            icon="ti-twitter"
          />
        </div>
        <div className="col-sm-6 col-md-3 col-lg-3 b-3 d-xxs-half-block d-xs-half-block">
          <SocialFeedsWidget
            type="linkedIn"
            friendsCount="89k"
            feedsCount="459"
            icon="ti-linkedin"
          />
        </div>
        <div className="col-sm-6 col-md-3 col-lg-3 b-3 d-xxs-half-block d-xs-half-block">
          <SocialFeedsWidget
            type="google"
            friendsCount="89k"
            feedsCount="459"
            icon="ti-google"
          />
        </div>
      </div>
    </div>
    <div className="row">
      <RctCollapsibleCard
        colClasses="col-sm-12 col-md-6 w-xs-full"
        fullBlock
      >
        <WeatherWidgetV2 city="Chandigarh" />
      </RctCollapsibleCard>
      <RctCollapsibleCard
        colClasses="col-sm-12 col-md-6 w-xs-full"
        heading={<IntlMessages id="widgets.siteVisitors" />}
        collapsible
        reloadable
        closeable
        fullBlock
      >
        <SiteVisitorChartWidget data={siteVisitors} />
      </RctCollapsibleCard>
    </div>
    <div className="dash-cards">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-3 col-xl-3 b-3 d-xs-half-block">
          <Reminders />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 col-xl-3 b-3 d-xs-half-block">
          <ContactRequestWidget />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 col-xl-3 b-3 d-xs-half-block">
          <Notes />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 col-xl-3 b-3 d-xs-half-block">
          <WeatherWidget />
        </div>
      </div>
    </div>
    <div className="row">
      <RctCollapsibleCard
        colClasses="col-sm-6 col-md-4 col-lg-4 d-xs-half-block d-xxs-full"
        heading={<IntlMessages id="widgets.discoverPeople" />}
        collapsible
        reloadable
        closeable
        fullBlock
      >
        <DiscoverPeoplesWidget data={discoverPeoples} />
      </RctCollapsibleCard>
      <RctCollapsibleCard
        colClasses="col-sm-6 col-md-4 col-lg-4 d-xs-half-block d-xxs-full"
        heading={<IntlMessages id="widgets.productReports" />}
        collapsible
        reloadable
        closeable
        fullBlock
      >
        <ProductReportsWidget data={productsReports} />
      </RctCollapsibleCard>
      <RctCollapsibleCard
        colClasses="col-sm-12 col-md-4 col-lg-4 d-xs-full"
        heading={<IntlMessages id="widgets.recentActivities" />}
        collapsible
        reloadable
        closeable
      >
        <RecentActivity data={recentActivities} />
      </RctCollapsibleCard>
    </div>
    <div className="row">
      <RctCollapsibleCard
        colClasses="col-sm-12 col-md-8 w-xs-full"
        heading={<IntlMessages id="widgets.ComposeEmail" />}
        collapsible
        reloadable
        closeable
        fullBlock
      >
        <ComposeEmailWidget />
      </RctCollapsibleCard>
      <div className="col-sm-12 col-md-4 w-xs-full">
        <CurrentTimeLocation />
        <CurrentDateWidget />
        <TodayOrdersStatsWidget />
      </div>
    </div>
    <div className="row">
      <RctCard
        colClasses="col-sm-12 col-md-4 col-lg-4 d-xs-half-block"
      >
        <img src={require('../../assets/img/post-1.jpg')} alt="project" className="img-fluid" />
        <RctCardContent>
          <div className="media mb-20">
            <div className="media-left mr-20">
              <img src={require('../../assets/img/user-8.jpg')} alt="user profile" className="media-object rounded-circle" width="80" height="80" />
            </div>
            <div className="media-body pt-20">
              <h5 className="mb-0">Charles Hampton</h5>
              <span className="text-muted fs-14">Share Public Post - a hours ago</span>
            </div>
          </div>
          <p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, dolores facilis maiores minus itaque excepturi.</p>
          <div className="card-action">
            <a href="javascript:void(0)"><i className="ti-comment"></i>21 Comments</a>
            <a href="javascript:void(0)"><i className="ti-thumb-up"></i>16 Likes</a>
          </div>
        </RctCardContent>
      </RctCard>
      <RctCard
        customClasses="pos-relative"
        colClasses="col-sm-12 col-md-4 col-lg-4 d-xs-half-block"
      >
        <img src={require('../../assets/img/post-2.jpg')} className="img-fluid border-rad-sm" alt="post" />
        <div className="rct-img-overlay p-20 border-rad-sm">
          <p className="fs-14">Lorem ipsum dolor sit amet, consectetur facilis maiores minus itaque excepturi.</p>
          <div className="media">
            <div className="media-left mr-20">
              <img src={require('../../assets/img/user-5.jpg')} className="media-object rounded-circle" alt="user profile" width="40" height="40" />
            </div>
            <div className="media-body">
              <h5 className="mb-0">Alejandro Garza</h5>
              <span className="fs-14">Share Public Post - a hours ago</span>
            </div>
          </div>
        </div>
      </RctCard>
      <RctCard
        colClasses="col-sm-12 col-md-4 col-lg-4 d-xs-full"
      >
        <RctCardContent>
          <div className="media">
            <div className="media-left mr-20">
              <img src={require('../../assets/img/user-1.jpg')} alt="user profile" className="img-fluid rounded-circle" width="80" height="80" />
            </div>
            <div className="media-body pt-20">
              <h5 className="mb-0">Ann Holt</h5>
              <span className="text-muted fs-14">Share Public Post - a hours ago</span>
            </div>
          </div>
        </RctCardContent>
        <div className="card-gradient-primary">
          <h3 className="card-heading">Technology Tools: Web 2.0 in the Classroom</h3>
        </div>
        <RctCardContent>
          <p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, dolores facilis maiores minus itaque excepturi.</p>
          <div className="card-action">
            <a href="javascript:void(0)"><i className="ti-comment"></i>21 Comments</a>
            <a href="javascript:void(0)"><i className="ti-thumb-up"></i>16 Likes</a>
          </div>
        </RctCardContent>
      </RctCard>
    </div>
    <h2 className="widget-heading">Graphs &amp; Charts</h2>
    <div className="row">
      <div className="col-sm-6 col-md-4">
        <VisitorAreaChartWidget
          data={visitorsData}
        />
      </div>
      <div className="col-sm-6 col-md-4">
        <SalesAreaChartWidget
          data={salesData}
        />
      </div>
      <div className="col-sm-12 col-md-4">
        <OrdersAreaChartWidget
          data={ordersData}
        />
      </div>
    </div>
    <div className="row row-eq-height">
      <RctCollapsibleCard
        colClasses="col-sm-12 col-md-6 col-lg-6 w-xs-full b-6"
        heading={<IntlMessages id="widgets.overallTrafficStatus" />}
        collapsible
        reloadable
        closeable
        fullBlock
      >
        <OverallTrafficStatusWidget
          chartData={trafficStatus}
        />
      </RctCollapsibleCard>
      <div className="col-sm-12 col-md-6 col-lg-6 w-xs-full b-6">
        <div className="row">
          <div className="col-sm-6 col-md-6 d-xxs-half-block">
            <TotalSalesWidget
              label={totalSales.label}
              chartdata={totalSales.chartdata}
              labels={totalSales.labels}
            />
          </div>
          <div className="col-sm-6 col-md-6 d-xxs-half-block">
            <NetProfitWidget
              label={netProfit.label}
              chartdata={netProfit.chartdata}
              labels={netProfit.labels}
            />
          </div>
          <div className="col-sm-6 col-md-6 d-xxs-half-block">
            <TaxStatsWidget
              label={taxStats.label}
              chartdata={taxStats.chartdata}
              labels={taxStats.labels}
            />
          </div>
          <div className="col-sm-6 col-md-6 d-xxs-half-block">
            <ExpensesWidget
              label={expenses.label}
              chartdata={expenses.chartdata}
              labels={expenses.labels}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <RctCollapsibleCard
        colClasses="col-sm-12 col-md-5 col-lg-5 w-xs-full col-xl-4"
        heading={<IntlMessages id="widgets.emailsStatistics" />}
        customClasses="gradient-primary"
        collapsible
        reloadable
        closeable
        fullBlock
      >
        <EmailStatisticsVersion2Widget data={emailStatisticsData} />
      </RctCollapsibleCard>
      <RctCollapsibleCard
        colClasses="col-sm-12 col-md-7 col-lg-7 w-xs-full col-xl-8"
        heading={<IntlMessages id="widgets.totalEarns" />}
        collapsible
        reloadable
        closeable
      >
        <TotalEarnsChartWidget data={totalEarnsV2} />
      </RctCollapsibleCard>
    </div>
    <div className="row">
      <div className="col-sm-12 col-md-6">
        <BandWidthAreaChartWidget />
      </div>
      <div className="col-sm-12 col-md-6">
        <BandWidthUsageBarChartWidget data={dataUsed} />
      </div>
    </div>
    <RctCollapsibleCard
      heading={<IntlMessages id="widgets.totalEarns" />}
      collapsible
      reloadable
      closeable
    >
      <TotalEarnsWithAreaChartWidget chartData={totalEarns} />
    </RctCollapsibleCard>
    <div className="row">
      <RctCollapsibleCard
        colClasses="col-md-7 col-xl-8 w-xs-full"
        heading={<IntlMessages id="widgets.productStats" />}
        collapsible
        reloadable
        closeable
      >
        <ProductStatsWidget data={productStats} />
      </RctCollapsibleCard>
      <RctCollapsibleCard
        customClasses="gradient-primary"
        colClasses="col-md-5 col-xl-4 w-xs-full"
        heading={<IntlMessages id="widgets.emailsStatistics" />}
        collapsible
        reloadable
        closeable
        fullBlock
      >
        <EmailStaticsWidget
          openChartData={emailStatisticsV2Data.chartData.open}
          bounceChartData={emailStatisticsV2Data.chartData.bounce}
          unsubscribeData={emailStatisticsV2Data.chartData.unsubscribe}
        />
      </RctCollapsibleCard>
    </div>
    <div className="dash-cards-lg">
      <div className="row">
        <div className="col-sm-6 col-md-3 col-xl-3 b-3 d-xs-half-block">
          <RevenueWidget data={totalRevenue} />
        </div>
        <div className="col-sm-6 col-md-3 col-xl-3 b-3 d-xs-half-block">
          <OnlineVisitorsWidget data={onlineVisitorsData} />
        </div>
        <div className="col-sm-6 col-md-3 col-xl-3 b-3 d-xs-half-block">
          <TrafficSourcesWidget data={trafficSources} />
        </div>
        <div className="col-sm-6 col-md-3 col-xl-3 b-3 d-xs-half-block">
          <BandwidthUsageWidget />
        </div>
      </div>
    </div>
  </div>
);

export default Widgets;
