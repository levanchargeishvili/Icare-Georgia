import { useEffect, useState } from 'react'

export const PHONE = '+995568000000'
export const PHONE_LABEL = '+995 568 00 00 00'
export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Gldani+Mall+Tbilisi'
export const MAP_EMBED = 'https://www.google.com/maps?q=Gldani%20Mall%2C%20Tbilisi&z=15&output=embed'

export const NAV = [
  { id: 'home', label: 'მთავარი' },
  { id: 'services', label: 'სერვისები' },
  { id: 'about', label: 'ჩვენ შესახებ' },
  { id: 'contact', label: 'კონტაქტი' },
]

export const SOCIAL_URLS = {
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  tiktok: 'https://tiktok.com',
  telegram: 'https://telegram.org',
}

export const HOURS = { open: 10, close: 22, label: '10:00 – 22:00' }

function tbilisiHour() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Tbilisi',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  return get('hour') + get('minute') / 60
}

function isOpenNow() {
  const h = tbilisiHour()
  return h >= HOURS.open && h < HOURS.close
}

/** Live open/closed state for the store, in Tbilisi time. */
export function useOpenStatus() {
  const [open, setOpen] = useState(isOpenNow)
  useEffect(() => {
    const id = setInterval(() => setOpen(isOpenNow()), 60_000)
    return () => clearInterval(id)
  }, [])
  return open
}
