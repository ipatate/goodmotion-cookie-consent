import { genesisIcons } from '@formkit/icons'
import { fr, en } from '@formkit/i18n'

const config = {
  locales: { en, fr },
  locale: 'en',
//   theme: 'genesis',
  icons: {
    ...genesisIcons
  }
}

export default config