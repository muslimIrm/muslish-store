import { requiredUser } from "@/hooks/RequiredUser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getAllOrders, getMyOrders } from "@/sanity/helpers/queries";
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
import { MY_ORDERS_QUERY_RESULT } from "@/sanity.types";
import OrderRole from "@/components/OrderRole";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const OrdersPage = async ({ searchParams }: PageProps) => {
  await requiredUser();
  const user = await currentUser();
  const userRole = (user?.publicMetadata?.role as string) || "user";
  const filters = await searchParams;
  const roleQuery = filters.role || "user";
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const isAdminMode = userRole == "admin" && roleQuery == "admin";
  console.log("Hii, ", isAdminMode)
  const orders = isAdminMode ? await getAllOrders() : await getMyOrders(userId);
  return (
    <Container className="py-10">
      {orders?.length ? (
        <Card className="w-full">
          <CardHeader className="flex w-full justify-between">
            <CardTitle className="text-2xl md:text-3xl">Orders</CardTitle>
            {userRole == "admin" && <OrderRole />}
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
                    <TableHead>
                      Address
                    </TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Invoice Number
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <OrdersComponents orders={orders as MY_ORDERS_QUERY_RESULT} isAdminMode={isAdminMode}/>
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
