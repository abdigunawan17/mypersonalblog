import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/navigations/navigation'
import Footer from '@/components/navigations/footer'
import { getDictionary } from '@/lib/getDictionary'

const inter = Inter({ subsets: ['latin'] })

/*
export const metadata: Metadata = {
  title: 'Bli Putu Abdi Freelance',
  description: 'Bli Putu Abdi proudly present this app created with next app',
}
*/

export const generateMetaData = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  //get the dictionary base on lang
  const dictionary = await getDictionary(lang);

  return {
    title: "Bli Putu Abdi Freelance",
    description: dictionary.footer.description,
  };
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Navigation locale={lang} />
        <div className="pt-10 min-h-[calc(100vh-300px)]">
        {children}
        </div>
        <Footer locale={lang} />
        </body>
    </html>
  )
}
