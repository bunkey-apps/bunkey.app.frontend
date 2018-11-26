/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from '../RctPageLoader/RctPageLoader';

// dashboard
const AsyncDashboardComponent = Loadable({
    loader: () => import("../../routes/dashboard/dashboard-v1"),
    loading: () => <RctPageLoader />,
});

// tags
const AsyncTagsComponent = Loadable({
    loader: () => import("../../routes/tags/index.js"),
    loading: () =>   <RctPageLoader />,
});
// usuarios
const AsyncUsuariosComponent = Loadable({
    loader: () => import("../../routes/usuarios/index.js"),
    loading: () =>   <RctPageLoader />,
});
const AsyncConfiguracionComponent = Loadable({
    loader: () => import("../../routes/configuracion/index.js"),
    loading: () =>   <RctPageLoader />,
});
const AsyncResultadosComponent = Loadable({
    loader: () => import("../../routes/resultados/dashboard-v1"),
    loading: () =>   <RctPageLoader />,
});

const AsyncImagenesComponent = Loadable({
    loader: () => import("../../routes/imagenes/dashboard-v1"),
    loading: () =>   <RctPageLoader />,
});

const AsyncExplorarComponent = Loadable({
    loader: () => import("../../routes/explorar/dashboard-v1"),
    loading: () =>   <RctPageLoader />,
});
const AsyncBusquedaComponent = Loadable({
    loader: () => import("../../routes/busqueda/dashboard-v1"),
    loading: () =>   <RctPageLoader />,
});
// Clientes
const AsyncClientesComponent = Loadable({
    loader: () => import("../../routes/clientes/index.js"),
    loading: () =>   <RctPageLoader />,
});
// Contratos
const AsyncContratosComponent = Loadable({
    loader: () => import("../../routes/contratos/index.js"),
    loading: () =>   <RctPageLoader />,
});

const AsyncPagosComponent = Loadable({
    loader: () => import("../../routes/pagos/index.js"),
    loading: () =>   <RctPageLoader />,
});
// widgets
const AsyncWidgetsComponent = Loadable({
    loader: () => import("../../routes/widgets"),
    loading: () => <RctPageLoader />,
});

// about us
const AsyncAboutUsComponent = Loadable({
    loader: () => import("../../routes/about-us"),
    loading: () => <RctPageLoader />,
});

// chat app
const AsyncChatComponent = Loadable({
    loader: () => import("../../routes/chat"),
    loading: () => <RctPageLoader />,
});

// mail app
const AsyncMailComponent = Loadable({
    loader: () => import("../../routes/mail"),
    loading: () => <RctPageLoader />,
});

// todo app
const AsyncTodoComponent = Loadable({
    loader: () => import("../../routes/todo"),
    loading: () => <RctPageLoader />,
});

// gallery
const AsyncGalleryComponent = Loadable({
    loader: () => import("../../routes/pages/gallery"),
    loading: () => <RctPageLoader />,
});

// feedback
const AsyncFeedbackComponent = Loadable({
    loader: () => import("../../routes/pages/feedback"),
    loading: () => <RctPageLoader />,
});

// report
const AsyncReportComponent = Loadable({
    loader: () => import("../../routes/pages/report"),
    loading: () => <RctPageLoader />,
});

// faq
const AsyncFaqComponent = Loadable({
    loader: () => import("../../routes/pages/faq"),
    loading: () => <RctPageLoader />,
});

// pricing
const AsyncPricingComponent = Loadable({
    loader: () => import("../../routes/pages/pricing"),
    loading: () => <RctPageLoader />,
});

// blank
const AsyncBlankComponent = Loadable({
    loader: () => import("../../routes/pages/blank"),
    loading: () => <RctPageLoader />,
});

// google maps
const AsyncGooleMapsComponent = Loadable({
    loader: () => import("../../routes/maps/google-map"),
    loading: () => <RctPageLoader />,
});

// google maps
const AsyncLeafletMapComponent = Loadable({
    loader: () => import("../../routes/maps/leaflet-map"),
    loading: () => <RctPageLoader />,
});

// shop list
const AsyncShoplistComponent = Loadable({
    loader: () => import("../../routes/ecommerce/shop-list"),
    loading: () => <RctPageLoader />,
});

// shop grid
const AsyncShopGridComponent = Loadable({
    loader: () => import("../../routes/ecommerce/shop-grid"),
    loading: () => <RctPageLoader />,
});

// invoice
const AsyncInvoiceComponent = Loadable({
    loader: () => import("../../routes/ecommerce/invoice"),
    loading: () => <RctPageLoader />,
});

// react dragula
const AsyncReactDragulaComponent = Loadable({
    loader: () => import("../../routes/drag-drop/react-dragula"),
    loading: () => <RctPageLoader />,
});

// react dnd
const AsyncReactDndComponent = Loadable({
    loader: () => import("../../routes/drag-drop/react-dnd"),
    loading: () => <RctPageLoader />,
});

// themify icons
const AsyncThemifyIconsComponent = Loadable({
    loader: () => import("../../routes/icons/themify-icons"),
    loading: () => <RctPageLoader />,
});

// Simple Line Icons
const AsyncSimpleLineIconsComponent = Loadable({
    loader: () => import("../../routes/icons/simple-line-icons"),
    loading: () => <RctPageLoader />,
});

// Font Awesome
const AsyncFontAwesomeComponent = Loadable({
    loader: () => import("../../routes/icons/font-awesome"),
    loading: () => <RctPageLoader />,
});

// Material Icons
const AsyncMaterialIconsComponent = Loadable({
    loader: () => import("../../routes/icons/material-icons"),
    loading: () => <RctPageLoader />,
});

// Basic Table
const AsyncBasicTableComponent = Loadable({
    loader: () => import("../../routes/tables/basic"),
    loading: () => <RctPageLoader />,
});

// Basic Table
const AsyncDataTableComponent = Loadable({
    loader: () => import("../../routes/tables/data-table"),
    loading: () => <RctPageLoader />,
});

// React Table
const AsyncReactTableComponent = Loadable({
    loader: () => import("../../routes/tables/react-table"),
    loading: () => <RctPageLoader />,
});

// Responsive Table
const AsyncResponsiveTableComponent = Loadable({
    loader: () => import("../../routes/tables/responsive"),
    loading: () => <RctPageLoader />,
});

// Users List
const AsyncUsersListComponent = Loadable({
    loader: () => import("../../routes/users/user-list"),
    loading: () => <RctPageLoader />,
});

// Users Profile
const AsyncUserProfileComponent = Loadable({
    loader: () => import("../../routes/users/user-profile"),
    loading: () => <RctPageLoader />,
});

// Users Profile 1
const AsyncUserProfile1Component = Loadable({
    loader: () => import("../../routes/users/user-profile-1"),
    loading: () => <RctPageLoader />,
});

// Users Management
const AsyncUserManagementComponent = Loadable({
    loader: () => import("../../routes/users/user-management"),
    loading: () => <RctPageLoader />,
});

/*--------------- Charts ----------------*/

// Re charts
const AsyncRechartsComponent = Loadable({
    loader: () => import("../../routes/charts/recharts"),
    loading: () => <RctPageLoader />,
});

// ReactChartsjs2
const AsyncReactChartsjs2Component = Loadable({
    loader: () => import("../../routes/charts/react-chartjs2"),
    loading: () => <RctPageLoader />,
});

/*---------------------- Calendar -----------*/

// Basic Calendar
const AsyncBasicCalendarComponent = Loadable({
    loader: () => import("../../routes/calendar/BasicCalendar"),
    loading: () => <RctPageLoader />,
});

// Cultures Calendar
const AsyncCulturesComponent = Loadable({
    loader: () => import("../../routes/calendar/Cultures"),
    loading: () => <RctPageLoader />,
});

// Dnd Calendar
const AsyncDndComponent = Loadable({
    loader: () => import("../../routes/calendar/Dnd"),
    loading: () => <RctPageLoader />,
});

// Selectable Calendar
const AsyncSelectableComponent = Loadable({
    loader: () => import("../../routes/calendar/Selectable"),
    loading: () => <RctPageLoader />,
});

// Custom Calendar
const AsyncCustomComponent = Loadable({
    loader: () => import("../../routes/calendar/Custom"),
    loading: () => <RctPageLoader />,
});

/*---------------- Session ------------------*/

// Session Login
const AsyncSessionLoginComponent = Loadable({
    loader: () => import("../../routes/session/login"),
    loading: () => <RctPageLoader />,
});

// Session Register
const AsyncSessionRegisterComponent = Loadable({
    loader: () => import("../../routes/session/register"),
    loading: () => <RctPageLoader />,
});

// Session Lock Screen
const AsyncSessionLockScreenComponent = Loadable({
    loader: () => import("../../routes/session/lock-screen"),
    loading: () => <RctPageLoader />,
});

// Session Forgot Password
const AsyncSessionForgotPasswordComponent = Loadable({
    loader: () => import("../../routes/session/forgot-password"),
    loading: () => <RctPageLoader />,
});

// Session Page 404
const AsyncSessionPage404Component = Loadable({
    loader: () => import("../../routes/session/404"),
    loading: () => <RctPageLoader />,
});

// Session Page 404
const AsyncSessionPage500Component = Loadable({
    loader: () => import("../../routes/session/500"),
    loading: () => <RctPageLoader />,
});

// terms and condition
const AsyncTermsConditionComponent = Loadable({
    loader: () => import("../../routes/pages/terms-condition"),
    loading: () => <RctPageLoader />,
});

/*---------------- Editor -------------------*/

// editor quill
const AsyncQuillEditorComponent = Loadable({
    loader: () => import("../../routes/editor/quill-editor"),
    loading: () => <RctPageLoader />,
});

// editor Wysiwyg
const AsyncWysiwygEditorComponent = Loadable({
    loader: () => import("../../routes/editor/wysiwyg-editor"),
    loading: () => <RctPageLoader />,
});

/*------------- Form Elemets -------------*/

// forms elements
const AsyncFormElementsComponent = Loadable({
    loader: () => import("../../routes/forms/form-elements"),
    loading: () => <RctPageLoader />,
});

// forms TextField
const AsyncTextFieldComponent = Loadable({
    loader: () => import("../../routes/forms/material-text-field"),
    loading: () => <RctPageLoader />,
});

// forms TextField
const AsyncSelectListComponent = Loadable({
    loader: () => import("../../routes/forms/select-list"),
    loading: () => <RctPageLoader />,
});

/*------------------ UI Components ---------------*/

// components Alerts
const AsyncUIAlertsComponent = Loadable({
    loader: () => import("../../routes/components/alert"),
    loading: () => <RctPageLoader />,
});




// components Appbar
const AsyncUIAppbarComponent = Loadable({
    loader: () => import("../../routes/components/app-bar"),
    loading: () => <RctPageLoader />,
});

// components BottomNavigation
const AsyncUIBottomNavigationComponent = Loadable({
    loader: () => import("../../routes/components/bottom-navigation"),
    loading: () => <RctPageLoader />,
});

// components BottomNavigation
const AsyncUIAvatarsComponent = Loadable({
    loader: () => import("../../routes/components/avatar"),
    loading: () => <RctPageLoader />,
});

// components Buttons
const AsyncUIButtonsComponent = Loadable({
    loader: () => import("../../routes/components/buttons"),
    loading: () => <RctPageLoader />,
});

// components Badges
const AsyncUIBadgesComponent = Loadable({
    loader: () => import("../../routes/components/badges"),
    loading: () => <RctPageLoader />,
});

// components CardMasonary
const AsyncUICardMasonaryComponent = Loadable({
    loader: () => import("../../routes/components/card-masonry"),
    loading: () => <RctPageLoader />,
});

// components Cards
const AsyncUICardsComponent = Loadable({
    loader: () => import("../../routes/components/cards"),
    loading: () => <RctPageLoader />,
});

// components Chips
const AsyncUIChipsComponent = Loadable({
    loader: () => import("../../routes/components/chip"),
    loading: () => <RctPageLoader />,
});

// components Dialog
const AsyncUIDialogComponent = Loadable({
    loader: () => import("../../routes/components/dialog"),
    loading: () => <RctPageLoader />,
});

// components Dividers
const AsyncUIDividersComponent = Loadable({
    loader: () => import("../../routes/components/dividers"),
    loading: () => <RctPageLoader />,
});

// components Drawers
const AsyncUIDrawersComponent = Loadable({
    loader: () => import("../../routes/components/drawers"),
    loading: () => <RctPageLoader />,
});

// components ExpansionPanel
const AsyncUIExpansionPanelComponent = Loadable({
    loader: () => import("../../routes/components/expansion-panel"),
    loading: () => <RctPageLoader />,
});

// components Grid List
const AsyncUIGridListComponent = Loadable({
    loader: () => import("../../routes/components/grid-list"),
    loading: () => <RctPageLoader />,
});

// components List
const AsyncUIListComponent = Loadable({
    loader: () => import("../../routes/components/list"),
    loading: () => <RctPageLoader />,
});

// components Menu
const AsyncUIMenuComponent = Loadable({
    loader: () => import("../../routes/components/menu"),
    loading: () => <RctPageLoader />,
});

// components Popover
const AsyncUIPopoverComponent = Loadable({
    loader: () => import("../../routes/components/popover"),
    loading: () => <RctPageLoader />,
});

// components Progress
const AsyncUIProgressComponent = Loadable({
    loader: () => import("../../routes/components/progress"),
    loading: () => <RctPageLoader />,
});

// components Snackbar
const AsyncUISnackbarComponent = Loadable({
    loader: () => import("../../routes/components/snackbar"),
    loading: () => <RctPageLoader />,
});

// components SelectionControls
const AsyncUISelectionControlsComponent = Loadable({
    loader: () => import("../../routes/components/selection-controls"),
    loading: () => <RctPageLoader />,
});

/*---------------- Advance UI Components -------------*/

// advance components DateAndTimePicker
const AsyncAdvanceUIDateAndTimePickerComponent = Loadable({
    loader: () => import("../../routes/advance-ui-components/dateTime-picker"),
    loading: () => <RctPageLoader />,
});

// advance components Tabs
const AsyncAdvanceUITabsComponent = Loadable({
    loader: () => import("../../routes/advance-ui-components/tabs"),
    loading: () => <RctPageLoader />,
});

// advance components Stepper
const AsyncAdvanceUIStepperComponent = Loadable({
    loader: () => import("../../routes/advance-ui-components/stepper"),
    loading: () => <RctPageLoader />,
});

// advance components NotificationComponent
const AsyncAdvanceUINotificationComponent = Loadable({
    loader: () => import("../../routes/advance-ui-components/notification"),
    loading: () => <RctPageLoader />,
});

// advance components SweetAlert
const AsyncAdvanceUISweetAlertComponent = Loadable({
    loader: () => import("../../routes/advance-ui-components/sweet-alert"),
    loading: () => <RctPageLoader />,
});

// advance components autoComplete
const AsyncAdvanceUIAutoCompleteComponent = Loadable({
    loader: () => import("../../routes/advance-ui-components/autoComplete"),
    loading: () => <RctPageLoader />,
});

export {
    AsyncDashboardComponent,
    AsyncWidgetsComponent,
    AsyncAboutUsComponent,
    AsyncChatComponent,
    AsyncMailComponent,
    AsyncTodoComponent,
    AsyncGalleryComponent,
    AsyncFeedbackComponent,
    AsyncReportComponent,
    AsyncFaqComponent,
    AsyncPricingComponent,
    AsyncBlankComponent,
    AsyncGooleMapsComponent,
    AsyncLeafletMapComponent,
    AsyncShoplistComponent,
    AsyncShopGridComponent,
    AsyncInvoiceComponent,
    AsyncReactDragulaComponent,
    AsyncReactDndComponent,
    AsyncThemifyIconsComponent,
    AsyncSimpleLineIconsComponent,
    AsyncFontAwesomeComponent,
    AsyncMaterialIconsComponent,
    AsyncBasicTableComponent,
    AsyncDataTableComponent,
    AsyncReactTableComponent,
    AsyncResponsiveTableComponent,
    AsyncUsersListComponent,
    AsyncUserProfileComponent,
    AsyncUserProfile1Component,
    AsyncUserManagementComponent,
    AsyncRechartsComponent,
    AsyncReactChartsjs2Component,
    AsyncBasicCalendarComponent,
    AsyncCulturesComponent,
    AsyncDndComponent,
    AsyncSelectableComponent,
    AsyncCustomComponent,
    AsyncSessionLoginComponent,
    AsyncSessionRegisterComponent,
    AsyncSessionLockScreenComponent,
    AsyncSessionForgotPasswordComponent,
    AsyncSessionPage404Component,
    AsyncSessionPage500Component,
    AsyncTermsConditionComponent,
    AsyncQuillEditorComponent,
    AsyncWysiwygEditorComponent,
    AsyncFormElementsComponent,
    AsyncTextFieldComponent,
    AsyncSelectListComponent,
    AsyncUIAlertsComponent,
    AsyncUIAppbarComponent,
    AsyncUIBottomNavigationComponent,
    AsyncUIAvatarsComponent,
    AsyncUIButtonsComponent,
    AsyncUIBadgesComponent,
    AsyncUICardMasonaryComponent,
    AsyncUICardsComponent,
    AsyncUIChipsComponent,
    AsyncUIDialogComponent,
    AsyncUIDividersComponent,
    AsyncUIDrawersComponent,
    AsyncUIExpansionPanelComponent,
    AsyncUIGridListComponent,
    AsyncUIListComponent,
    AsyncUIMenuComponent,
    AsyncUIPopoverComponent,
    AsyncUIProgressComponent,
    AsyncUISnackbarComponent,
    AsyncUISelectionControlsComponent,
    AsyncAdvanceUIDateAndTimePickerComponent,
    AsyncAdvanceUITabsComponent,
    AsyncAdvanceUIStepperComponent,
    AsyncAdvanceUINotificationComponent,
    AsyncAdvanceUISweetAlertComponent,
    AsyncAdvanceUIAutoCompleteComponent,
    AsyncTagsComponent,
    AsyncUsuariosComponent,
    AsyncContratosComponent,
    AsyncClientesComponent,
    AsyncPagosComponent,
    AsyncResultadosComponent,
    AsyncImagenesComponent,
    AsyncConfiguracionComponent,
    AsyncExplorarComponent,
    AsyncBusquedaComponent

};
