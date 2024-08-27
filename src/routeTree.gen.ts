/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AppImport } from './routes/app'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as AppTasksImport } from './routes/app/tasks'
import { Route as AppEditTaskidImport } from './routes/app/edit.$taskid'

// Create/Update Routes

const AppRoute = AppImport.update({
  path: '/app',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AppTasksRoute = AppTasksImport.update({
  path: '/tasks',
  getParentRoute: () => AppRoute,
} as any)

const AppEditTaskidRoute = AppEditTaskidImport.update({
  path: '/edit/$taskid',
  getParentRoute: () => AppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/app': {
      id: '/app'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/app/tasks': {
      id: '/app/tasks'
      path: '/tasks'
      fullPath: '/app/tasks'
      preLoaderRoute: typeof AppTasksImport
      parentRoute: typeof AppImport
    }
    '/app/edit/$taskid': {
      id: '/app/edit/$taskid'
      path: '/edit/$taskid'
      fullPath: '/app/edit/$taskid'
      preLoaderRoute: typeof AppEditTaskidImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AboutRoute,
  AppRoute: AppRoute.addChildren({ AppTasksRoute, AppEditTaskidRoute }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/app"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/app": {
      "filePath": "app.tsx",
      "children": [
        "/app/tasks",
        "/app/edit/$taskid"
      ]
    },
    "/app/tasks": {
      "filePath": "app/tasks.tsx",
      "parent": "/app"
    },
    "/app/edit/$taskid": {
      "filePath": "app/edit.$taskid.tsx",
      "parent": "/app"
    }
  }
}
ROUTE_MANIFEST_END */
