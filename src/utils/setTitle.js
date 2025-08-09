const routeTitleMap = {
  '/': 'Home | Marathon Manager',
  '/login': 'Login',
  '/register': 'Register',
  '/marathons': 'All Marathons',
  '/add-marathon': 'Add Marathon',
  '/dashboard/my-marathons': 'My Marathons',
  '/dashboard/my-applies': 'My Applies',
};

export const setDynamicTitle = (path) => {
  document.title = routeTitleMap[path] || 'Marathon Manager';
};