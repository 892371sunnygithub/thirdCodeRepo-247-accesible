import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import AdminRoute from 'layout/Admin';
import UserManagement from 'pages/Admin/UserManagement';
import CreateUsers from 'pages/Admin/CreateUsers';
import { ROUTES, TITLE } from 'routes/constant';
import OrderManagement from 'pages/Admin/OrderManagement';
import OrderDetails from 'pages/Admin/OrderDetails';
import Update from 'pages/Admin/Update/Update';
const Routes = createBrowserRouter([
  {
    path: ROUTES.MANAGE_USERS,
    element: (
      <AdminRoute title={TITLE.MANAGE_USERS_TITLE}>
        <UserManagement />
      </AdminRoute>
    ),
  },
  {
    path: ROUTES.ADD_NEW_USER,
    element: (
      <AdminRoute title={TITLE.ADD_NEW_USER_TITLE}>
        <CreateUsers />
      </AdminRoute>
    ),
  },
  {
    path: ROUTES.UPDATE_USER,
    element: (
      <AdminRoute title={TITLE.UPDATE_USER_TITLE}>
        <CreateUsers />
      </AdminRoute>
    ),
  },
  {
    path: ROUTES.ORDER_MANAGEMENT,
    element: (
      <AdminRoute title={TITLE.ORDER_MANAGEMENT_TITLE}>
        <OrderManagement />
      </AdminRoute>
    ),
  },
  {
    path: ROUTES.ORDER_DETAILS_BY_ID,
    element: (
      <AdminRoute title={TITLE.ORDER_DETAILS_TITLE}>
        <OrderDetails />
      </AdminRoute>
    ),
  },
  {
    path: ROUTES.UPDATE,
    element: (
      <AdminRoute title={TITLE.UPDATE_TITLE}>
        <Update />
      </AdminRoute>
    )
  }
]);

export default Routes