"use client";

import BookingWidget from "@/components/BookingWidget";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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
  // State for booking widget modal
  const [showBooking, setShowBooking] = useState(false);

  // Actions
  const openBookingModal = useCallback(() => {
    setShowBooking(true);
    // Add book=true to URL without refreshing the page
    const newUrl = `${window.location.pathname}${window.location.hash}?book=true`;
    window.history.pushState({}, "", newUrl);
  }, []);
  const closeBookingModal = useCallback(() => {
    setShowBooking(false);
    // Remove book parameter from URL without refreshing the page
    const newUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, "", newUrl);
  }, []);

  // Check for booking URL parameter on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("book") === "true") {
      openBookingModal();
      // Clean up the URL without refreshing the page
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, "", newUrl);
    }
  }, [openBookingModal]);

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
