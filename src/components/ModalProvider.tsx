"use client";

import { createContext, useCallback, useContext, useState } from "react";
import BookingWidget from "@/components/BookingWidget";

// Modal context type
interface ModalContextType {
  openBookingModal: () => void;
  closeBookingModal: () => void;
}

// Default context values
const ModalContext = createContext<ModalContextType>({
  openBookingModal: () => {},
  closeBookingModal: () => {},
});

// Custom hook to access modal functions
export const useModal = () => useContext(ModalContext);

interface ModalProviderProps {
  children: React.ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  console.log({
    calUsername: process.env.NEXT_PUBLIC_CAL_USERNAME,
    calEventSlug: process.env.NEXT_PUBLIC_CAL_EVENT_SLUG,
  });
  // State for booking widget modal
  const [showBooking, setShowBooking] = useState(false);

  // Actions
  const openBookingModal = useCallback(() => setShowBooking(true), []);
  const closeBookingModal = useCallback(() => setShowBooking(false), []);

  return (
    <ModalContext.Provider
      value={{
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}

      {/* Render modals here instead of in page components */}
      {showBooking && (
        <BookingWidget
          onClose={closeBookingModal}
          username={process.env.NEXT_PUBLIC_CAL_USERNAME!}
          eventSlug={process.env.NEXT_PUBLIC_CAL_EVENT_SLUG!}
        />
      )}
    </ModalContext.Provider>
  );
}
