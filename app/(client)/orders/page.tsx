import React from "react";
import { requiredUser } from "@/hooks/RequiredUser";
import { auth } from "@clerk/nextjs/server";
import { getMyOrders } from "@/sanity/helpers/queries";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileX } from "lucide-react";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TableHead, TableHeader, TableRow, Table } from "@/components/ui/table";
import OrdersComponents from "@/components/OrdersComponents";
import { Order } from "@/sanity.types";
const OrdersPage = async () => {
  await requiredUser();
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const orders = await getMyOrders(userId);
  console.log(orders)
  return (
    <Container className="py-10">
      {orders?.length ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className={"w-full"}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-auto">Order Number</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Invoice Number
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <OrdersComponents orders={orders as Order[]} />
              </Table>
              <ScrollBar />
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            "flex items-center flex-col py-5 md:py-10 px-4 justify-center"
          }
        >
          <FileX className="w-20 h-20 text-gray-400 mb-4" />
          <Title>Not Orders Found.</Title>
          <p className="max-w-md text-center text-gray-400 text-sm mt-2">
            It looks like you haven&apos;t placed any orders yet. Start shopping
            to see your orders here!
          </p>
          <Button
            nativeButton={false}
            render={<Link href={"/"} />}
            className="mt-6"
          >
            Browse Products
          </Button>
        </div>
      )}
    </Container>
  );
};

export default OrdersPage;
