export const ROLES = {
  EMPLOYEE: "444",
  INSPECTOR: "666",
  ADMIN: "777",
};

export const BasePathByRole = {
  '444': { from: { pathname: '/home' } },
  '666': { from: { pathname: '/history' } },
  "777": { from: { pathname: '/admin' } }
};