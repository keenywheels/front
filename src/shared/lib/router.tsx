'use client';

import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Spinner } from '@shared/ui/spinner';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

interface RouterProps {
  routes: RouteConfig[];
}

export const Router = ({ routes }: RouterProps) => {
  return <Routes>{renderRoutes(routes)}</Routes>;
};

const renderRoutes = (routeConfigs: RouteConfig[]) => {
  return routeConfigs.map((route, index) => (
    <Route
      key={route.path + index}
      path={route.path}
      element={
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <Spinner className="w-6 h-6 text-primary" />
            </div>
          }
        >
          {route.element}
        </Suspense>
      }
    >
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};
