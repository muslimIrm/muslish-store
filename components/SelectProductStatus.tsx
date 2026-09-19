"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderStatus } from "@/actions/updateOrderStatus";
import { Loader2 } from "lucide-react";

const items = [
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Canceled", value: "canceled" },
];

const SelectProductStatus = ({
  initialStatus,
  orderId,
}: {
  initialStatus: string;
  orderId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<string | null>(initialStatus);

  useEffect(() => {
    if (initialStatus) {
      setValue(initialStatus);
    }
  }, [initialStatus]);

  const handleStatusChange = (newStatus: string | null) => {
    if (!newStatus) return;
    setValue(newStatus);

    startTransition(async () => {
      try {
        await updateOrderStatus(orderId, newStatus);
      } catch (error) {
        console.error("Error Update Status", error);
      }
    });
  };

  return (
    <div
      className="relative flex items-center gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <Select
        value={value ?? undefined}
        onValueChange={handleStatusChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-[100px] h-8 text-xs relative">
          <SelectValue placeholder="Select status" />
          {isPending && (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground ml-auto" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectProductStatus;
