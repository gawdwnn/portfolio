'use client';

import { Booker } from '@calcom/atoms';
import { X } from 'lucide-react';

interface BookingWidgetProps {
  onClose: () => void;
  eventSlug: string;
  username: string;
}

export default function BookingWidget({ onClose, eventSlug, username }: BookingWidgetProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-end z-50">
      <div className="w-full sm:w-96 h-full bg-background p-4 flex flex-col">
        <button onClick={onClose} className="self-end text-foreground hover:text-primary mb-2">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 overflow-y-auto">
          <Booker
            eventSlug={eventSlug}
            username={username}
            onCreateBookingSuccess={() => {
              console.log('booking created successfully');
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
