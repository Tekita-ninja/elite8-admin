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
        icon: 'ic:outline-dashboard',
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
        icon: 'ri:user-star-fill',
        level: 1,
      },
      {
        label:"Customers",
        path: "customers",
        icon: 'fluent:people-team-20-filled',
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
        icon: 'ri:list-ordered',
        level: 1,
      },
      {
        label: "Removed",
        path: "/removed",
        icon: 'ic:outline-close',
        level: 1,
      },
      {
        label: "Done",
        path: "/complete",
        icon: 'tabler:checks',
        level: 1,
      },
    ]
  },
  {
    header: "settings",
    children: [
      {
        label: "Banners",
        path: "/banners",
        icon: 'bx:image-add',
        level: 1,
      }
    ]
  }
];