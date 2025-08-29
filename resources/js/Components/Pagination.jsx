import { Link } from '@inertiajs/react'

function Pagination({ links }) {
    return (
        <nav className="text-center mt-4">
            <ul className='flex justify-center items-center gap-2'>
                {
                    links.map((link) => (
                        <Link preserveScroll key={link.label} href={link.url || ''} className={`py-2 px-3 inline-block rounded-lg  text-xs ${link.active ? 'bg-blue-600 text-white' : 'text-black'} ${!link.url ? '!text-gray-500 cursor-not-allowed' : 'hover:bg-gray-950 hover:text-white'}`} dangerouslySetInnerHTML={{ __html: link.label }}></Link>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination