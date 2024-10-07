import React from 'react';
import { useRoutes } from 'react-router-dom';
import CheckOut from '../pages/CheckOut';

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <CheckOut />
        }
    ]);
}
