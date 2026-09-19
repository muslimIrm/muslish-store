"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

const OrderRole = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentRole = searchParams.get("role") || "user";

  const handleParamsChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("role", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 items-center">
      <h2 className="text-sm font-semibold">Role:</h2>
      <div className="flex gap-1">
        <Button
          variant={"outline"}
          onClick={() => handleParamsChange("user")}
          className={`${currentRole === "user" && "bg-gray-100"}`}
        >
          User
        </Button>
        <Button
          variant={"outline"}
          onClick={() => handleParamsChange("admin")}
          
          className={`${currentRole === "admin" && "bg-gray-100"}`}
        >
          Admin
        </Button>
      </div>
    </div>
  );
};

export default OrderRole;