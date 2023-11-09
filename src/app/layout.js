import { Inter, Quicksand } from 'next/font/google'
// import localFont from 'next/font/local'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: "--font-quicksand",
})

export const metadata = {
  title: 'Academia TETI',
  description: 'ACADEMIA TETI adalah sebuah Aplikasi Web yang dirancang khusus untuk menyediakan berbagai sumber daya seperti dokumen, tugas, kuis, dan berkas terkait mata kuliah di DTETI UGM.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quicksand.variable}>{children}</body>
    </html>
  )
}
