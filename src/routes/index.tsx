import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { CreatePaymentPage } from "@/pages/CreatePaymentPage";
import { PaymentResultPage } from "@/pages/PaymentResultsPage";
import { NotFound } from "@/features/not-found";

export const routes:RouteObject[] = [
    {
        path: "/",
        element:  <CreatePaymentPage />,
        errorElement: <NotFound />
    },
    {
        path: "/payment-results",
        element: <PaymentResultPage />,
        errorElement: <NotFound />
    }, 
    {
        path: "*",
        element: <NotFound />
    }
]
export const router = createBrowserRouter(routes)
