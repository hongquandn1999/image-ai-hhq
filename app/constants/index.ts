export const navLinks = [
  { route: '/', label: 'Home', icon: '/assets/icons/home.svg' },
  {
    route: '/transformations/add/restore',
    label: 'Image Restore',
    icon: '/assets/icons/image.svg',
  },
  {
    route: '/transformations/add/fill',
    label: 'Generative Fill',
    icon: '/assets/icons/stars.svg',
  },
  {
    route: '/transformations/add/remove',
    label: 'Object Remove',
    icon: '/assets/icons/scan.svg',
  },
  {
    route: '/transformations/add/recolor',
    label: 'Object Recolor',
    icon: '/assets/icons/filter.svg',
  },
  {
    route: '/transformations/add/removeBackground',
    label: 'Remove Background',
    icon: '/assets/icons/camera.svg',
  },
  { route: '/profile', label: 'Profile', icon: '/assets/icons/profile.svg' },
  { route: '/credits', label: 'Buy Credits', icon: '/assets/icons/bag.svg' },
];

export const eventTypes = {
  created: 'user_created',
  updated: 'user_updated',
  deleted: 'user_deleted',
};
