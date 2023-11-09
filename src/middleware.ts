// Without a defined matcher, this one line applies next-auth to all routes in the app.
// Comment out the following line to disable login for all routes

export { default } from 'next-auth/middleware'

// Applies next-auth only to matching routes
export const config = { matcher: ["/api/auth", "/dashboard"] }