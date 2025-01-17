export const fallbackLng = 'en'
export const languages = [fallbackLng, 'ko']
export const defaultNS = 'translation'
export const cookieName = 'NEXT_LOCALE'

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
