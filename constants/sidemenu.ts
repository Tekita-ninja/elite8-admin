type TMenuL3 = {
  label:string
  path: string
  icon?: string
  level?: number
}
type TMenuL2 = {
  label: string
  path: string
  icon?: string
  level?: number
  children?: TMenuL3[]
}
type TMenuL1 = {
  label: string
  path: string
  icon?: string
  level?: number
  children?: TMenuL2[]
}
type TMenu = {
  header: string
  children: TMenuL1[]
}

export const menus: TMenu[] = [
  {
    header: "home",
    children: [
      {
        label:"Dashboard",
        path: "/",
        icon: 'ph:speedometer',
        level: 1
      }
    ]
  },
  {
    header: "super",
    children: [
      {
        label: "Roles",
        path: "/roles",
        icon: 'carbon:rule-locked',
        level: 1,
      },
      {
        label: "Permissions",
        path: "/permissions",
        icon: 'lets-icons:key-alt-light',
        level: 1,
      },
    ]
  },
  {
    header: "master",
    children: [
      {
        label:"Masters",
        path: "master",
        icon: 'f7:square-grid-2x2',
        level: 1,
        children: [
          {
            label: "Categories",
            path: '/master/category',
            level: 2,
          },
          {
            label: "Utils",
            path: '/master/utils',
            level: 2,
            children: [
              {
                label: "Sizes",
                path: '/master/utils/sizes',
                level: 3,
              },
              {
                label: "Colors",
                path: '/master/utils/colors',
                level: 3,
              },
            ]
          },
        ]
      },
      {
        label: "Products",
        path: "/products",
        icon: 'solar:archive-broken',
        level: 1,
      }
    ]
  },
  {
    header: "management",
    children: [
      {
        label: "Orders",
        path: "/orders",
        icon: 'solar:clipboard-list-broken',
        level: 1,
      },
      {
        label: "Incomes",
        path: "/incomes",
        icon: 'solar:document-add-outline',
        level: 1,
      },
    ]
  },
  {
    header: "setting",
    children: [
      {
        label: "Users",
        path: "users",
        icon: 'mynaui:users-group',
        level: 1,
        children: [
          {
            label: "Users",
            path: "/users",
            level: 2,
          },
          {
            label: "Customers",
            path: "/users/customers",
            level: 2,
          }
        ]
      },
      {
        label: "Payments",
        path: "/payments",
        icon: 'solar:card-broken',
        level: 1,
      },
      {
        label: "Couriers",
        path: "/couriers",
        icon: 'hugeicons:truck',
        level: 1,
      },
      {
        label: "Accounts",
        path: "/accounts",
        icon: 'hugeicons:account-setting-01',
        level: 1,
      },
    ]
  }
];