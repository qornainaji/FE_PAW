import Image from 'next/image'
import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-orange-100 text-black font-sans">
      <div className="flex flex-col items-center justify-center max-w-2xl w-full">
        {/* Logo */}
        <Image
          src="/images/AcademiaDTETI.png"
          alt="Logo"
          width={500}
          height={80}
          className="mb-8"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold mb-12 text-center">
          COMING SOON
        </h1>

        {/* Sign Out Button */}
        <a
          href="/api/auth/signout"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Sign Out{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Sign out of the app.
          </p>
        </a>
      </div>
    </main>
  )
}
