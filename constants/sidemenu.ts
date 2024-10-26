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
    header: "master",
    children: [
      {
        label: "Users",
        path: "/users",
        icon: 'ph:users',
        level: 1,
      },
      {
        label:"Customers",
        path: "customers",
        icon: 'solar:user-id-bold',
        level: 1,
      }
    ]
  },
  {
    header: "waitlist",
    children: [
      {
        label: "Waitlist",
        path: "/waitlist",
        icon: 'solar:clipboard-list-broken',
        level: 1,
      },
      {
        label: "Removed",
        path: "/removed",
        icon: 'hugeicons:note-remove',
        level: 1,
      },
      {
        label: "Done",
        path: "/complete",
        icon: 'lucide:check-check',
        level: 1,
      },
    ]
  },
  {
    header: "setting",
    children: [
      {
        label: "Utility",
        path: "/utility",
        icon: 'mingcute:settings-2-line',
        level: 1,
      }
    ]
  }
];