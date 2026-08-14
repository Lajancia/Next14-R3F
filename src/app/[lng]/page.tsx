import ClientPage from './ClientPage'

export default function Page({ params: { lng } }: { params: { lng: string } }) {
  return <ClientPage lng={lng} />
}