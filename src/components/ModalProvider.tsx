"use client";

import BookingWidget from "@/components/BookingWidget";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface ModalContextType {
  openBookingModal: () => void;
  closeBookingModal: () => void;
}
const ModalContext = createContext<ModalContextType>({
  openBookingModal: () => {},
  closeBookingModal: () => {},
});

export const useModal = () => useContext(ModalContext);

interface ModalProviderProps {
  children: React.ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [showBooking, setShowBooking] = useState(false);

  const openBookingModal = useCallback(() => {
    setShowBooking(true);
    const newUrl = `${window.location.pathname}${window.location.hash}?book=true`;
    window.history.pushState({}, "", newUrl);
  }, []);
  const closeBookingModal = useCallback(() => {
    setShowBooking(false);
    const newUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, "", newUrl);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("book") === "true") {
      openBookingModal();
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
