import { whatsappUrl } from '../config/site'
import Icon from './Icon'
export default function WhatsAppCTA({ className = 'btn-outline', children = 'WhatsApp' }) {
  return <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={className}><Icon name="chat" /><span>{children}</span></a>
}
