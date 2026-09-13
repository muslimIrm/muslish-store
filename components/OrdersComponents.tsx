"use client";

import { MY_ORDERS_QUERY_RESULT } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { format } from "date-fns";
import PriceFormatter from "./PriceFormatter";
import OrderDetailsDialog from "./OrderDetailsDialog";

interface OrdersComponentsProps {
  orders: MY_ORDERS_QUERY_RESULT;
}

const OrdersComponents = ({ orders }: OrdersComponentsProps) => {
  const [selectedOrder, setSelectedOrder] = useState<MY_ORDERS_QUERY_RESULT[number] | null>(null);
  useEffect(()=> console.log(selectedOrder), [selectedOrder])
  return (
    <>
      <TooltipProvider>
        <TableBody>
          {orders?.map((order) => (
            <Tooltip key={order._id}>
              {/* دمج التنسيقات داخل عنصر TableRow الممرر للـ render مباشرة ومنع تكرار المكون */}
              <TooltipTrigger
                render={
                  <TableRow className="cursor-pointer hover:bg-muted/50 h-12 transition-colors" />
                }
                onClick={()=> setSelectedOrder(order)}
              >
                <TableCell className="font-medium">
                  {order.orderNumber?.slice(-10) ?? "N/A"}
                </TableCell>

                <TableCell className={"hidden md:table-cell"}>
                  {order.orderDate
                    ? format(new Date(order.orderDate), "dd/MM/yyyy")
                    : "N/A"}
                </TableCell>

                <TableCell>{order.customerName ?? "Guest"}</TableCell>

                <TableCell className="hidden md:table-cell">
                  {order.email ?? "N/A"}
                </TableCell>

                <TableCell>
                  <PriceFormatter
                    amount={order.totalPrice}
                    className="text-black font-medium"
                  />
                </TableCell>

                <TableCell>
                  {order.status && (
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold capitalize ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : order.status === "canceled"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  )}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  <p>{order.invoice?.number ?? "---"}</p>
                </TableCell>
              </TooltipTrigger>

              <TooltipContent>
                <p>Click to see order details.</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TableBody>
      </TooltipProvider>
      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponents;
