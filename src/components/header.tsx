'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'


const links = [
    // {
    //     name: 'home',
    //     path: '/'
    // },
    {
        name: 'map',
        path: '/google/map'
        // path: '/weather/tunis'
    },
    {
        name: 'about',
        path: '/about'
    },

]
function  Navigation(){
    const pathname = usePathname()
    return (
        <div className='flex items-center gap-x-10 text-white'>
            {links.map((link, index) => (
                    <Link
                        href={link.path}
                        key={index}
                        className={`${
                            link.path === pathname && 'border-b-1 text-accent_green'
                        } text-xl font-medium capitalize transition-all`}
                    >
                        {link.name}
                    </Link>
                )
            )}

            <Link href='/contact'>
                <Button
                    variant={'default'}
                    size={'sm'}
                    className='ml-6 h-min bg-accent_green py-1.5 shadow-md hover:shadow-gray-400'
                >
                     Contact Me
                </Button>
            </Link>
        </div>
    )
}

function Header() {
    // const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header
            className={cn(
                'fixed left-0 top-0 z-50 w-full transition-all duration-300 text-white',
                !isScrolled ? 'bg-primary shadow-lg' : 'bg-gray-700/30'
            )}
        >
            <div className='relative flex w-full items-center justify-between px-2 py-1 md:px-3 xl:py-2'>
                <Link
                    href={'/'}
                >
                    <div
                        className={
                            'inset-shadow-gray-500 mx-auto ml-5 rounded-full bg-transparent px-3 py-0 text-white transition-colors duration-500 ease-out hover:bg-primary_blue hover:text-accent_green lg:m-0'
                        }
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='180'
                            height='50'
                            viewBox='0 0 400 100'
                            fill={'none'}
                        >
                            <rect width='100%' height='100%' fill='transparent' />
                            <text
                                x='50%'
                                y='50%'
                                dominantBaseline='middle'
                                textAnchor='middle'
                                fontFamily='Arial, sans-serif'
                                fontSize='40'
                                fill='currentColor'
                                fontWeight='bold'
                            >
                                Hamza Missaoui.
                            </text>
                        </svg>
                    </div>
                    {/*<h1 className='hover:text-accent_green text-xl font-bold lg:text-2xl xl:text-4xl'>*/}
                    {/*  Hamza Dev*/}
                    {/*  <span className='text-accent_green'>.</span>*/}
                    {/*</h1>*/}
                </Link>
                <div className='items-center gap-8 flex'>
                    <Navigation />
                </div>

            </div>
        </header>
    )
}

export default Header

