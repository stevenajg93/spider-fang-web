"use client"

import { create } from "zustand"

interface BookingDialogStore {
  isOpen: boolean
  openDialog: () => void
  closeDialog: () => void
}

export const useBookingDialog = create<BookingDialogStore>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}))
