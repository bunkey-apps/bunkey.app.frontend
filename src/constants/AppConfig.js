/**
 * App Config File
 */
const AppConfig = {
    appLogo: require('../assets/img/logo_bunkey-w.svg'),          // App Logo
    appUrl: 'http://reactify.theironnetwork.org',             // App Url
    baseURL: 'http://bunkey-api-dev.aureolab.cl/',
    timeout: 10000,
    brandName: 'Reactify',                                    // Brand Name
    navCollapsed: true,                                      // Sidebar collapse
    darkMode: false,                                          // Dark Mode
    boxLayout: false,                                         // Box Layout
    rtlLayout: false,                                         // RTL Layout
    miniSidebar: false,                                       // Mini Sidebar
    sidebarActiveFilter: 'dark',                              // Select Sidebar Color You can Choose following color 'primary', 'blue', 'warning', 'info', 'danger','success','purple'
    enableSidebarBackgroundImage: true,                       // Enable Sidebar Background Image
    sidebarImage: require('../assets/img/sidebar-1.jpg'),     // Select sidebar image
    locale: {
        languageId: 'spanish',
        locale: 'es',
        name: 'spanish',
        icon: 'es',
    },
    enableUserTour: true,                                      // Enable / Disable User Tour
    copyRightText: 'Reactify © 2018 All Rights Reserved.',      // Copy Right Text
    // light theme colors
    themeColors: {
        'primary': '#5C6AC4',
        'warning': '#EEC200',
        'danger': '#DE3618',
        'success': '#50B83C',
        'info': '#47C1BF',
        'default': '#657786',
        'purple': '#007ACE',
        'sky': '#007ACE',
        'yellow': '#F49342',
        'white': '#FFFFFF',
        'dark': '#000000',
        'greyLighten': '#DFE3E8',
        'grey': '#9FA5AB'
    },
    // dark theme colors
    darkThemeColors: {
        darkBgColor: '#424242'
    }
}

export default AppConfig;
