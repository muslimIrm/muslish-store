import { FC } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { format } from "date-fns";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "./ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { MY_ORDERS_QUERY_RESULT } from "@/sanity.types";
import PriceFormatter from "./PriceFormatter";
interface Props {
  order: MY_ORDERS_QUERY_RESULT[number] | null;
  isOpen: boolean;
  onClose: () => void;
}
const OrderDetailsDialog: FC<Props> = ({ order, isOpen, onClose }) => {
  if (!isOpen) return null;
  //   order?.products.map((p)=> console.log("p:",p))
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={"max-w-4xl! max-h-[90vh]! overflow-y-scroll"}>
        <DialogHeader>Order Details - {order?.orderNumber}</DialogHeader>
        <div className="mt-4 space-y-1">
          <p>
            <strong>Customer: </strong> {order?.customerName}
          </p>
          <p>
            <strong>Email: </strong> {order?.email}
          </p>
          <p>
            <strong>Date: </strong>{" "}
            {order?.orderDate
              ? format(new Date(order.orderDate), "dd/MM/yyyy")
              : ""}
          </p>
          <p>
            <strong>Status: </strong>{" "}
            <span
              className={`px-2 py-1 text-xs rounded-full font-semibold capitalize ${
                order?.status === "paid"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : order?.status === "canceled"
                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
              }`}
            >
              {order?.status}
            </span>
          </p>
          <p>
            <strong>Invoice Number: </strong> {order?.invoice?.number}
          </p>
          {order?.invoice && (
            <Button variant={"outline"} className={"mt-2"}>
              {order?.invoice?.hosted_invoice_url && (
                <Link href={order?.invoice.hosted_invoice_url} target="blank">
                  Download Invoice
                </Link>
              )}
            </Button>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.products?.map((product, index) => (
              <TableRow key={index}>
                {product?.product?.Images && (
                  <TableCell className="flex items-center gap-2">
                    <Image
                      src={urlFor(product?.product?.Images[0]).url()}
                      alt="productImage"
                      width={50}
                      height={50}
                      className="rounded-sm border w-14 h-14 object-contain"
                    />
                    {product?.product?.name && <p>{product?.product?.name}</p>}
                  </TableCell>
                )}
                <TableCell>{product?.quantity}</TableCell>

                {product?.product?.price && product?.quantity && (
                  <TableCell>
                    <PriceFormatter
                      className="text-black font-medium"
                      amount={product?.product?.price * product?.quantity}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex text-right items-center justify-end mt-2">
          <div className="w-44 flex flex-col gap-1">
            {order?.amountDiscount !== 0 && (
              <div className="flex w-full items-center space-x-1 justify-between">
                <strong>Discount: </strong>
                <PriceFormatter
                  amount={order?.amountDiscount}
                  className="text-black font-medium"
                />
              </div>
            )}
            {order?.amountDiscount !== 0 && (
              <div className="flex w-full items-center space-x-1 justify-between">
                <strong>Subtotal: </strong>
                <PriceFormatter
                  amount={
                    (order?.totalPrice as number) +
                    (order?.amountDiscount as number)
                  }
                  className="text-black font-medium"
                />
              </div>
            )}
            <div className="flex w-full items-center space-x-1 justify-between">
              <strong>Total: </strong>
              <PriceFormatter
                amount={order?.totalPrice}
                className="text-black font-medium"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
