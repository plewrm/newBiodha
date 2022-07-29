export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/default',
        icon: 'dashboard',
    },
    // {
    //     name: 'Dashboard BM',
    //     path: '/dashboard/BM',
    //     icon: 'dashboard',
    // },
    /*{
        name: 'Dashboard Credit',
        path: '/dashboard/credit',
        icon: 'dashboard',
    },*/
    {
        label: 'PAGES',
        type: 'label',
    },
    // {
    //     name: 'Session/Auth',
    //     icon: 'security',
    //     children: [
    //         {
    //             name: 'Sign in',
    //             iconText: 'SI',
    //             path: '/session/signin',
    //         },
    //         {
    //             name: 'Sign up',
    //             iconText: 'SU',
    //             path: '/session/signup',
    //         },
    //         {
    //             name: 'Forgot Password',
    //             iconText: 'FP',
    //             path: '/session/forgot-password',
    //         },
    //         {
    //             name: 'Change Password',
    //             iconText: 'FP',
    //             path: '/session/change-password',
    //         },
    //         {
    //             name: 'Error',
    //             iconText: '404',
    //             path: '/session/404',
    //         },
    //     ],
    // },
    {
        name: 'Master',
        icon: 'track_changes',
        children: [
            {
                name: 'State',
                icon: 'location_on',
                path: '/states',

            },
            {
                name: 'City',
                icon: 'location_city',
                path: '/cities',

            },
            {
                name: 'Role Master',
                icon: 'group_add',
                path: '/rolemaster',

            },
            {
                name: 'Yard',
                icon: 'airplay',
                path: '/yard',

            },
            {
                name: 'Menu Master',
                icon: 'create_new_folder',
                path: '/menumaster',

            },
            {
                name: 'User Access Menu',
                icon: 'folder_shared',
                path: '/AccessManagement',

            },
            {
                name: 'UOM Master',
                icon: 'business_center',
                path: '/uommaster',

            },
            {
                name: 'Product Group',
                icon: 'iso',
                path: '/skutypenew',

            },
            
            // {
            //     name: 'SKU Type',
            //     icon: 'iso',
            //     path: '/skutype',

            // },
            {
                name: 'SKU Properties',
                icon: 'layers',
                path: '/skuproperties',

            },
            {
                name: 'SKU Properties Dropdown',
                icon: 'layers',
                path: '/skupropertiesdropdown',

            },
            {
                name: 'SKU Mapping',
                icon: 'beenhere',
                path: '/skumapping',

            },
            {
                name: 'SKU Master',
                icon: 'layers',
                path: '/SkuMasters',

            },
            

            // {
            //     name: 'Truck Type Master',
            //     icon: 'local_shipping',
            //     path: '/trucktypemaster',

            // },
            // {
            //     name: 'Vehicle Master',
            //     icon: 'airport_shuttle',
            //     path: '/vehiclemaster',

            // },
            // {
            //     name: 'Formula Master',
            //     icon: 'local_library',
            //     path: '/formulamaster',

            // },
            {
                name: 'Payment Terms',
                icon: 'payment',
                path: '/paymentterms',

            },
            {
                name: 'Trigger Master',
                icon: 'flash_on',
                path: '/triggermaster',

            },
            {
                name: 'Zone Master',
                icon: 'travel_explore',
                path: '/Zonemaster',

            },
            {
                name: 'Country Master',
                icon: 'FlagCircle',
                path: '/Countrymaster',

            },
            {
                name: 'District Master',
                icon: 'FlagCircle',
                path: '/Districtmaster',

            },
            // {
            //     name: 'Time Configurator',
            //     icon: 'access_time',
            //     path: '/timeconfigurator',

            // },

        ],
    },
    {
        name: 'Employee',
        icon: 'people',
        path: '/employee',

    },
    {
        name: 'Customer',
        icon: 'person',
        path: '/customer',

    },
    {
        name: 'Order',
        icon: 'access_time',
        path: '/order',

    },
    {
        name: 'Stock Inward',
        icon: 'access_time',
        path: '/stockinward',

    },
    {
        name: 'View Stock',
        icon: 'timeline',
        path: '/ViewStock',
        
    },
    
    {
        name: 'Dump Stock',
        icon: 'timeline',
        path: '/dump-stock',
        
    },
    {
        name: 'Batch Closing',
        icon: 'timeline',
        path: '/batch-closing',
        
    },
    {
        name: 'Logistcs',
        icon: 'timeline',
        path: '/logistics',
        
    },
    // {
    //     name: 'Invoice',
    //     icon: 'timeline',
    //     path: '/invoice/add/1',
        
    // },
    {
        name: 'Invoice',
        icon: 'timeline',
        path: 'CreateInvoice',
        
    },
    {
        name: 'Intergodown Transfer',
        icon: 'create',
        path: '/IntergodownTransfer',
        
    },


    // {
    //     name: 'Stock Audit',
    //     icon: 'assignment',
    //     path: '/stockaudit',

    // },
    // {
    //     name: 'Stock Hold',
    //     icon: 'timeline',
    //     path: '/stockhold',

    // },
    // {
    //     label: 'Components',
    //     type: 'label',
    // },
    // {
    //     name: 'Components',
    //     icon: 'favorite',
    //     badge: { value: '30+', color: 'secondary' },
    //     children: [
    //         {
    //             name: 'Auto Complete',
    //             path: '/material/autocomplete',
    //             iconText: 'A',
    //         },
    //         {
    //             name: 'Buttons',
    //             path: '/material/buttons',
    //             iconText: 'B',
    //         },
    //         {
    //             name: 'Checkbox',
    //             path: '/material/checkbox',
    //             iconText: 'C',
    //         },
    //         {
    //             name: 'Dialog',
    //             path: '/material/dialog',
    //             iconText: 'D',
    //         },
    //         {
    //             name: 'Expansion Panel',
    //             path: '/material/expansion-panel',
    //             iconText: 'E',
    //         },
    //         {
    //             name: 'Form',
    //             path: '/material/form',
    //             iconText: 'F',
    //         },
    //         {
    //             name: 'Icons',
    //             path: '/material/icons',
    //             iconText: 'I',
    //         },
    //         {
    //             name: 'Menu',
    //             path: '/material/menu',
    //             iconText: 'M',
    //         },
    //         {
    //             name: 'Progress',
    //             path: '/material/progress',
    //             iconText: 'P',
    //         },
    //         {
    //             name: 'Radio',
    //             path: '/material/radio',
    //             iconText: 'R',
    //         },
    //         {
    //             name: 'Switch',
    //             path: '/material/switch',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Slider',
    //             path: '/material/slider',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Snackbar',
    //             path: '/material/snackbar',
    //             iconText: 'S',
    //         },
    //         {
    //             name: 'Table',
    //             path: '/material/table',
    //             iconText: 'T',
    //         },
    //     ],
    // },
    // {
    //     name: 'Charts',
    //     icon: 'trending_up',

    //     children: [
    //         {
    //             name: 'Echarts',
    //             path: '/charts/echarts',
    //             iconText: 'E',
    //         },
    //     ],
    // },
    // {
    //     name: 'Documentation',
    //     icon: 'launch',
    //     type: 'extLink',
    //     path: 'http://demos.ui-lib.com/matx-react-doc/',
    // },
]
