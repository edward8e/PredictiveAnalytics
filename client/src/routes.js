import React from 'react';

const CodeEditors = React.lazy(() => import('./views/Editors/CodeEditors'));
const TextEditors = React.lazy(() => import('./views/Editors/TextEditors'));

//Menu Related
const CreateMenuItem = React.lazy(() => import('./views/Menu/CreateMenuItem'));
const ShowMenuItem = React.lazy(() => import('./views/Menu/ShowMenuItem'));
const CreateCategory = React.lazy(() => import('./views/Menu/CreateCategory'));
const ShowCategory = React.lazy(() => import('./views/Menu/ShowCategory'));

//Order Related
const NewOrders = React.lazy(() => import('./views/Menu/NewOrders'));
const CurrentOrders = React.lazy(() => import('./views/Menu/CurrentOrders'));
const PastOrders = React.lazy(() => import('./views/Menu/PastOrders'));
const OrderCalendar = React.lazy(() => import('./views/Menu/OrderCalendar'));

//Business Related
const SettingsPage = React.lazy(() => import('./views/Settings/SettingsPage'));
const CreateBusiness = React.lazy(() => import('./views/Backend/CreateBusiness'));

const Compose = React.lazy(() => import('./views/Apps/Email/Compose'));
const Inbox = React.lazy(() => import('./views/Apps/Email/Inbox'));
const Message = React.lazy(() => import('./views/Apps/Email/Message'));
const Invoice = React.lazy(() => import('./views/Apps/Invoicing/Invoice'));

const AdvancedForms = React.lazy(() => import('./views/Forms/AdvancedForms'));
const BasicForms = React.lazy(() => import('./views/Forms/BasicForms'));
const ValidationForms = React.lazy(() => import('./views/Forms/ValidationForms'));
const GoogleMaps = React.lazy(() => import('./views/GoogleMaps'));
const Toastr = React.lazy(() => import('./views/Notifications/Toastr'));
const Calendar = React.lazy(() => import('./views/Plugins/Calendar'));
const Draggable = React.lazy(() => import('./views/Plugins/Draggable'));
const Spinners = React.lazy(() => import('./views/Plugins/Spinners'));
const DataTable = React.lazy(() => import('./views/Tables/DataTable'));
const Tables = React.lazy(() => import('./views/Tables/Tables'));
const LoadingButtons = React.lazy(() => import('./views/Buttons/LoadingButtons'));

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));

const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const SpinnersB4 = React.lazy(() => import('./views/Base/Spinners'));
const Switches = React.lazy(() => import('./views/Base/Switches'));

const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/dashboard/', exact: true, component: Dashboard, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard , exact: true },

  //Menu Routes
  { path: '/dashboard/menu', name: 'Menu', component: ShowMenuItem, exact: true },
  { path: '/dashboard/menuItem/create', name: 'Create Menu', component: CreateMenuItem, exact: true },
  { path: '/dashboard/category', name: 'Categories', component: ShowCategory, exact: true },
  { path: '/dashboard/category/create', name: 'Create Category', component: CreateCategory, exact: true },
  
  //Order Routes
  { path: '/dashboard/order', name: 'New', component: NewOrders, exact: true },
  { path: '/dashboard/order/current', name: 'Current', component: CurrentOrders, exact: true },
  { path: '/dashboard/order/past', name: 'Past', component: PastOrders, exact: true },
  { path: '/dashboard/order/calendar', name: 'Orders', component: OrderCalendar, exact: true },

  //Business Routes
  { path: '/dashboard/settings', name: 'Settings', component: SettingsPage, exact: true },
  { path: '/dashboard/business', name: 'Business', component: CreateBusiness, exact: true },

  { path: '/dashboard/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/dashboard/theme/colors', name: 'Colors', component: Colors },
  { path: '/dashboard/theme/typography', name: 'Typography', component: Typography },
  { path: '/dashboard/base', name: 'Base', component: Cards, exact: true },
  { path: '/dashboard/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/dashboard/base/cards', name: 'Cards', component: Cards },
  { path: '/dashboard/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/dashboard/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/dashboard/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/dashboard/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/dashboard/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/dashboard/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/dashboard/base/navs', name: 'Navs', component: Navs },
  { path: '/dashboard/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/dashboard/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/dashboard/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/dashboard/base/spinners', name: 'Spinners', component: SpinnersB4 },
  { path: '/dashboard/base/switches', name: 'Switches', component: Switches },
  { path: '/dashboard/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/dashboard/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/dashboard/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/dashboard/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/dashboard/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/dashboard/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/dashboard/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/dashboard/buttons/loading-buttons', name: 'Loading Buttons', component: LoadingButtons },
  { path: '/dashboard/charts', name: 'Charts', component: Charts },
  { path: '/dashboard/editors', name: 'Editors', component: CodeEditors, exact: true },
  { path: '/dashboard/editors/code-editors', name: 'Code Editors', component: CodeEditors },
  { path: '/dashboard/editors/text-editors', name: 'Text Editors', component: TextEditors },
  { path: '/dashboard/forms', name: 'Forms', component: BasicForms, exact: true },
  { path: '/dashboard/forms/advanced-forms', name: 'Advanced Forms', component: AdvancedForms },
  { path: '/dashboard/forms/basic-forms', name: 'Basic Forms', component: BasicForms },
  { path: '/dashboard/forms/validation-forms', name: 'Form Validation', component: ValidationForms },
  { path: '/dashboard/google-maps', name: 'Google Maps', component: GoogleMaps },
  { path: '/dashboard/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/dashboard/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/dashboard/icons/flags', name: 'Flags', component: Flags },
  { path: '/dashboard/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/dashboard/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/dashboard/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/dashboard/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/dashboard/notifications/badges', name: 'Badges', component: Badges },
  { path: '/dashboard/notifications/modals', name: 'Modals', component: Modals },
  { path: '/dashboard/notifications/toastr', name: 'Toastr', component: Toastr },
  { path: '/dashboard/plugins', name: 'Plugins', component: Calendar, exact: true },
  { path: '/dashboard/plugins/calendar', name: 'Calendar', component: Calendar },
  { path: '/dashboard/plugins/draggable', name: 'Draggable Cards', component: Draggable },
  { path: '/dashboard/plugins/spinners', name: 'Spinners', component: Spinners },
  { path: '/dashboard/tables', name: 'Tables', component: Tables, exact: true },
  { path: '/dashboard/tables/data-table', name: 'Data Table', component: DataTable },
  { path: '/dashboard/tables/tables', name: 'Tables', component: Tables },
  { path: '/dashboard/widgets', name: 'Widgets', component: Widgets },
  { path: '/dashboard/apps', name: 'Apps', component: Compose, exact: true },
  { path: '/dashboard/apps/email', name: 'Email', component: Compose, exact: true },
  { path: '/dashboard/apps/email/compose', name: 'Compose', component: Compose },
  { path: '/dashboard/apps/email/inbox', name: 'Inbox', component: Inbox },
  { path: '/dashboard/apps/email/message', name: 'Message', component: Message },
  { path: '/dashboard/apps/invoicing', name: 'Invoice', component: Invoice, exact: true },
  { path: '/dashboard/apps/invoicing/invoice', name: 'Invoice', component: Invoice },
  { path: '/dashboard/users', exact: true,  name: 'Users', component: Users },
  { path: '/dashboard/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
