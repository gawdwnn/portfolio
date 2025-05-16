"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { toast } from "sonner";

interface BookingWidgetProps {
  onClose: () => void;
  eventSlug: string;
  username: string;
}

export default function BookingWidget({
  onClose,
  eventSlug,
  username,
}: BookingWidgetProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal?.("on", {
        action: "bookingSuccessful",
        callback: () => {
          toast.success("Booking successful! We'll be in touch soon.");
          onClose();
        },
      });
    })();
  }, [onClose]);

  return (
    <Sheet
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="w-full sm:max-w-[95%] md:max-w-[80%] lg:max-w-[1200px] p-0 border-l bg-background"
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-xl font-semibold">
            Schedule a Call
          </SheetTitle>
          <SheetDescription>
            Choose a time that works best for you
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 h-[calc(100vh-8rem)] overflow-y-auto">
          <Cal
            calLink={`${username}/${eventSlug}`}
            config={{
              hideEventTypeDetails: "false",
              layout: "month_view",
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
