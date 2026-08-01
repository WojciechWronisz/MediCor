import { useIsMobile } from './hooks/useIsMobile'
import DesktopApp from './desktop/DesktopApp'
import MobileApp from './mobile/MobileApp'

export default function App() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileApp /> : <DesktopApp />
}
