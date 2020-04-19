export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },{
      title: true,
      name: 'Menu',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },{
      name: 'Category',
      url: '/dashboard/category/show',
      icon: 'icon-note',
      children: [
        {
          name: 'All Categories',
          url: '/dashboard/category',
          icon: 'icon-note',
        },{
          name: 'Create Category',
          url: '/dashboard/category/create',
          icon: 'icon-note',
        },
      ]
    },{
      name: 'Menus',
      url: '/dashboard/menu',
      icon: 'icon-note',
      children: [
        {
          name: 'All Menu Items',
          url: '/dashboard/menu',
          icon: 'icon-note'
        },{
          name: 'Create Item',
          url: '/dashboard/menuItem/create',
          icon: 'icon-note',
        }
      ]
    },{
      name: 'Orders',
      url: '/dashboard/order',
      icon: 'icon-note',
      children: [
        {
          name: 'New Orders',
          url: '/dashboard/order',
          icon: 'icon-note',
          badge: {
            variant: 'success',
            text: 'NEW'
          }
        },{
          name: 'Current Orders',
          url: '/dashboard/order/current',
          icon: 'icon-note',
        },{
          name: 'Past Orders',
          url: '/dashboard/order/past',
          icon: 'icon-note',
        }
      ]
    },{
      name: 'Calendar',
      url: '/dashboard/order/calendar',
      icon: 'icon-calendar',
      badge: {
        variant: 'danger',
        text: 'PRO'
      }
    },{
      name: 'Settings',
      url: '/dashboard/settings',
      icon: 'icon-settings',
    },
  //   {
  //     title: true,
  //     name: 'Theme',
  //     wrapper: {            // optional wrapper object
  //       element: '',        // required valid HTML5 element tag
  //       attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
  //     },
  //     class: ''             // optional class names space delimited list for title item ex: "text-center"
  //   },
  //   {
  //     name: 'Colors',
  //     url: '/dashboard/theme/colors',
  //     icon: 'icon-drop',
  //   },
  //   {
  //     name: 'Typography',
  //     url: '/dashboard/theme/typography',
  //     icon: 'icon-pencil',
  //   },
  //   {
  //     title: true,
  //     name: 'Components',
  //     wrapper: {
  //       element: '',
  //       attributes: {},
  //     },
  //   },
  //   {
  //     name: 'Base',
  //     url: '/dashboard/base',
  //     icon: 'icon-puzzle',
  //     children: [
  //       {
  //         name: 'Breadcrumbs',
  //         url: '/dashboard/base/breadcrumbs',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Cards',
  //         url: '/dashboard/base/cards',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Carousel',
  //         url: '/dashboard/base/carousels',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Collapse',
  //         url: '/dashboard/base/collapses',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Dropdowns',
  //         url: '/dashboard/base/dropdowns',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Jumbotrons',
  //         url: '/dashboard/base/jumbotrons',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'List group',
  //         url: '/dashboard/base/list-groups',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Navs',
  //         url: '/dashboard/base/navs',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Paginations',
  //         url: '/dashboard/base/paginations',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Popovers',
  //         url: '/dashboard/base/popovers',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Progress Bar',
  //         url: '/dashboard/base/progress-bar',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Switches',
  //         url: '/dashboard/base/switches',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Spinners',
  //         url: '/dashboard/base/spinners',
  //         icon: 'fa fa-circle-o-notch',
  //         badge: {
  //           variant: 'info',
  //           text: 'NEW',
  //         },
  //       },
  //       {
  //         name: 'Tabs',
  //         url: '/dashboard/base/tabs',
  //         icon: 'icon-puzzle',
  //       },
  //       {
  //         name: 'Tooltips',
  //         url: '/dashboard/base/tooltips',
  //         icon: 'icon-puzzle',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Buttons',
  //     url: '/dashboard/buttons',
  //     icon: 'icon-cursor',
  //     children: [
  //       {
  //         name: 'Buttons',
  //         url: '/dashboard/buttons/buttons',
  //         icon: 'icon-cursor',
  //       },
  //       {
  //         name: 'Brand Buttons',
  //         url: '/dashboard/buttons/brand-buttons',
  //         icon: 'icon-cursor',
  //       },
  //       {
  //         name: 'Button groups',
  //         url: '/dashboard/buttons/button-groups',
  //         icon: 'icon-cursor',
  //       },
  //       {
  //         name: 'Dropdowns',
  //         url: '/dashboard/buttons/button-dropdowns',
  //         icon: 'icon-cursor',
  //       },
  //       {
  //         name: 'Loading Buttons',
  //         url: '/dashboard/buttons/loading-buttons',
  //         icon: 'icon-cursor',
  //         badge: {
  //           variant: 'danger',
  //           text: 'PRO',
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Charts',
  //     url: '/dashboard/charts',
  //     icon: 'icon-pie-chart'
  //   },
  //   {
  //     name: 'Editors',
  //     url: '/dashboard/editors',
  //     icon: 'fa fa-code',
  //     children: [
  //       {
  //         name: 'Code Editors',
  //         url: '/dashboard/editors/code-editors',
  //         icon: 'fa fa-code',
  //         badge: {
  //           variant: 'danger',
  //           text: 'PRO',
  //         },
  //       },
  //       {
  //         name: 'Text Editors',
  //         url: '/dashboard/editors/text-editors',
  //         icon: 'icon-note',
  //         badge: {
  //           variant: 'danger',
  //           text: 'PRO',
  //         },
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Forms',
  //     url: '/dashboard/forms',
  //     icon: 'icon-note',
  //     children: [
  //       {
  //         name: 'Basic Forms',
  //         url: '/dashboard/forms/basic-forms',
  //         icon: 'icon-note'
  //       },
  //       {
  //         name: 'Advanced Forms',
  //         url: '/dashboard/forms/advanced-forms',
  //         icon: 'icon-note',
  //         badge: {
  //           variant: 'danger',
  //           text: 'PRO'
  //         }
  //       },
  //       {
  //         name: 'Validation',
  //         url: '/dashboard/forms/validation-forms',
  //         icon: 'icon-note',
  //         badge: {
  //           variant: 'danger',
  //           text: 'PRO'
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Google Maps',
  //     url: '/dashboard/google-maps',
  //     icon: 'icon-map',
  //     badge: {
  //       variant: 'danger',
  //       text: 'PRO'
  //     }
  //   },
  //   {
  //     name: 'Icons',
  //     url: '/dashboard/icons',
  //     icon: 'icon-star',
  //     children: [
  //       {
  //         name: 'CoreUI Icons',
  //         url: '/dashboard/icons/coreui-icons',
  //         icon: 'icon-star',
  //         badge: {
  //           variant: 'info',
  //           text: 'NEW',
  //         },
  //       },
  //       {
  //         name: 'Flags',
  //         url: '/dashboard/icons/flags',
  //         icon: 'icon-star',
  //       },
  //       {
  //         name: 'Font Awesome',
  //         url: '/dashboard/icons/font-awesome',
  //         icon: 'icon-star',
  //         badge: {
  //           variant: 'secondary',
  //           text: '4.7',
  //         },
  //       },
  //       {
  //         name: 'Simple Line Icons',
  //         url: '/dashboard/icons/simple-line-icons',
  //         icon: 'icon-star',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Notifications',
  //     url: '/dashboard/notifications',
  //     icon: 'icon-bell',
  //     children: [
  //       {
  //         name: 'Alerts',
  //         url: '/dashboard/notifications/alerts',
  //         icon: 'icon-bell',
  //       },
  //       {
  //         name: 'Badges',
  //         url: '/dashboard/notifications/badges',
  //         icon: 'icon-bell',
  //       },
  //       {
  //         name: 'Modals',
  //         url: '/dashboard/notifications/modals',
  //         icon: 'icon-bell'
  //       },
  //       {
  //         name: 'Toastr',
  //         url: '/dashboard/notifications/toastr',
  //         icon: 'icon-bell',
  //         badge: {
  //           variant: 'danger',
  //           text: 'PRO'
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Plugins',
  //     url: '/dashboard/plugins',
  //     icon: 'icon-energy',
  //     children: [
  //       {
  //         name: 'Calendar',
  //         url: '/dashboard/plugins/calendar',
  //         icon: 'icon-calendar',
  //         badge: {
  //           variant: 'danger',
  //           text: 'PRO'
  //         }
  //       },
  //       {
  //         name: 'Draggable',
  //         url: '/dashboard/plugins/draggable',
  //         icon: 'icon-cursor-move',
  //         badge: {
  //           variant: 'danger',
  //           text: 'PRO'
  //         }
  //       },
  //       {
  //         name: 'Spinners',
  //         url: '/dashboard/plugins/spinners',
  //         icon: 'fa fa-spinner',
  //         badge: {
  //           variant: 'danger',
  //           text: 'PRO'
  //         }
  //       }
  //     ]
  //       },
  //   {
  //     name: 'Tables',
  //     url: '/dashboard/tables',
  //     icon: 'icon-list',
  //     children: [
  //       {
  //         name: 'Data Table',
  //         url: '/dashboard/tables/data-table',
  //         icon: 'icon-list',
  //         badge: {
  //           variant: 'danger',
  //           text: 'PRO'
  //         }
  //       },
  //       {
  //         name: 'Tables',
  //         url: '/dashboard/tables/tables',
  //         icon: 'icon-list'
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Widgets',
  //     url: '/dashboard/widgets',
  //     icon: 'icon-calculator',
  //     badge: {
  //       variant: 'info',
  //       text: 'NEW',
  //     },
  //   },
  //   {
  //     divider: true,
  //   },
  //   {
  //     title: true,
  //     name: 'Extras',
  //   },
  //   {
  //     name: 'Pages',
  //     url: '/dashboard/pages',
  //     icon: 'icon-star',
  //     children: [
  //       {
  //         name: 'Login',
  //         url: '/dashboard/login',
  //         icon: 'icon-star',
  //       },
  //       {
  //         name: 'Register',
  //         url: '/dashboard/register',
  //         icon: 'icon-star',
  //       },
  //       {
  //         name: 'Error 404',
  //         url: '/dashboard/404',
  //         icon: 'icon-star',
  //       },
  //       {
  //         name: 'Error 500',
  //         url: '/dashboard/500',
  //         icon: 'icon-star',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Disabled',
  //     url: '/dashboard/dashboard',
  //     icon: 'icon-ban',
  //     badge: {
  //       variant: 'secondary',
  //       text: 'NEW',
  //     },
  //     attributes: { disabled: true },
  //   },
  //   {
  //     name: 'Apps',
  //     url: '/dashboard/apps',
  //     icon: 'icon-layers',
  //     children: [
  //       {
  //         name: 'Invoicing',
  //         url: '/dashboard/apps/invoicing',
  //         icon: 'icon-speech',
  //         children: [
  //           {
  //             name: 'Invoice',
  //             url: '/dashboard/apps/invoicing/invoice',
  //             icon: 'icon-speech',
  //             badge: {
  //               variant: 'danger',
  //               text: 'PRO'
  //             }
  //           }
  //         ]
  //       },
  //       {
  //         name: 'Email',
  //         url: '/dashboard/apps/email',
  //         icon: 'icon-speech',
  //         children: [
  //           {
  //             name: 'Inbox',
  //             url: '/dashboard/apps/email/inbox',
  //             icon: 'icon-speech',
  //             badge: {
  //               variant: 'danger',
  //               text: 'PRO',
  //             },
  //           },
  //           {
  //             name: 'Message',
  //             url: '/dashboard/apps/email/message',
  //             icon: 'icon-speech',
  //             badge: {
  //               variant: 'danger',
  //               text: 'PRO',
  //             },
  //           },
  //           {
  //             name: 'Compose',
  //             url: '/dashboard/apps/email/compose',
  //             icon: 'icon-speech',
  //             badge: {
  //               variant: 'danger',
  //               text: 'PRO',
  //             },
  //           },
  //         ],
  //       },
  //     ]
  //   },
  //   {
  //     divider: true,
  //     class: 'm-2'
  //   },
  //   {
  //     title: true,
  //     name: 'Labels'
  //   },
  //   {
  //     name: 'Label danger',
  //     url: '',
  //     icon: 'fa fa-circle',
  //     label: {
  //       variant: 'danger'
  //     },
  //   },
  //   {
  //     name: 'Label info',
  //     url: '',
  //     icon: 'fa fa-circle',
  //     label: {
  //       variant: 'info'
  //     }
  //   },
  //   {
  //     name: 'Label warning',
  //     url: '',
  //     icon: 'fa fa-circle',
  //     label: {
  //       variant: 'warning'
  //     }
  //   },
  ]
};
