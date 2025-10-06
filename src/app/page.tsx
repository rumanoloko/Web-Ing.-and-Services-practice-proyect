import Link from 'next/link'

export default function Index() {
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='flex min-h-full flex-1 flex-col justify-center text-center'>
        <h1 className='text-4xl font-bold'>Hello world!</h1>
        <p className='font-light'>This is the welcome page of your project</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Ir a la ruta base
        </Link>
        <Link href="/home" className="text-blue-500 hover:underline">
          Ir a Home
        </Link>
        <Link href="/hello" className="text-blue-500 hover:underline">
          Ir a Hello
        </Link>
        <Link href="/user" className="text-blue-500 hover:underline">
          Ir a User
        </Link>
      </div>
    </div>
  )
}
