import { FaFacebookF, FaInstagram, FaTelegram, FaTiktok } from 'react-icons/fa6'
import { SOCIAL_URLS } from '../lib/site'

const ITEMS = [
  { href: SOCIAL_URLS.facebook, label: 'Facebook', Icon: FaFacebookF },
  { href: SOCIAL_URLS.instagram, label: 'Instagram', Icon: FaInstagram },
  { href: SOCIAL_URLS.tiktok, label: 'TikTok', Icon: FaTiktok },
  { href: SOCIAL_URLS.telegram, label: 'Telegram', Icon: FaTelegram },
]

export default function Socials({ className = '' }: { className?: string }) {
  return (
    <div className={`socials ${className}`}>
      {ITEMS.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
          <Icon />
        </a>
      ))}
    </div>
  )
}
