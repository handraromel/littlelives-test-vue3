export interface TimeSlot {
  start: string
  end: string
}

export interface Availability {
  [key: string]: TimeSlot[]
}

export interface Settings {
  visitDuration: number
  bookingsPerSlot: number
  allowVideoCall: boolean
  availability: Availability
}

export interface CalendarEvent {
  title: string
  start: string
  end: string
  extendedProps: {
    slotIndex: number
  }
}
