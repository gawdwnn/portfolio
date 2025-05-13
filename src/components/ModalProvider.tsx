"use client";

import { createContext, useCallback, useContext, useState } from "react";
import BookingWidget from "./BookingWidget";

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
  calUsername?: string;
  calEventSlug?: string;
}

export default function ModalProvider({
  children,
  calUsername = "YOUR_CAL_USERNAME",
  calEventSlug = "YOUR_EVENT_SLUG",
}: ModalProviderProps) {
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
          username={calUsername}
          eventSlug={calEventSlug}
        />
      )}
    </ModalContext.Provider>
  );
}
