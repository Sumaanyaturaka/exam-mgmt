import './globals.css'

export const metadata = {
  title: 'Academix',
  description: 'Room allocation, attendance and absentee reports',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
