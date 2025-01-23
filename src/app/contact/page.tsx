'use client'
// import Form from "next/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
// import { FaWhatsapp } from 'react-icons/fa6'

const info = [
    {
        //   icon: <FaWhatsapp />,
        icon: FaPhoneAlt,
        title: 'Phone',
        // description: ['(+216) 56 062 266', '(+216) 56 521 184'],
        subitems: [
            {
                href: `https://wa.me/+21656062266?text="this is my phone number only available for business or job, thank you for understanding"`,
                value: '(+216) 56 062 266'
            },
            {
                href: `https://wa.me/+21656521184?text="this is my phone number only available for business or job, thank you for understanding"`,
                value: '(+216) 56 521 184'
            }
        ]
        // description: "(+216) 56 062 266 | (+216) 56 521 184",
        // href: `https://wa.me/+21656062266?text=this is my phone number only available for business or job, thank you for understanding`
    },
    {
        icon: FaEnvelope,
        title: 'Email',
        // description: ['hamza.missaoui47@gmail.com', 'hamza.missaoui@b2b-alive.com'],
        // href: 'mailto:hamza.missaoui@b2b-alive.com?subject=Job&body=Your Message'
        subitems: [
            {
                value: 'hamza.missaoui47@gmail.com',
                href: 'mailto:hamza.missaoui47@gmail.com?subject=Job&body=Your Message'
            },
            {
                value: 'hamza.missaoui@b2b-alive.com',
                href: 'mailto:hamza.missaoui@b2b-alive.com?subject=Job&body=Your Message'
            }
        ]

        // "personal: hamza.missaoui47@gmail.com pro: hamza.missaoui@b2b-alive.com",
    },
    {
        icon: FaMapMarkerAlt,
        title: 'Address',
        subitems: [
            {
                value: 'Tunisia, Tunis',
                href: 'https://www.google.com/maps/search/?query=El_Mourouj'
            }
        ]
    }
]

const contactFormSchema = z.object({
    firstname: z.string().min(2, {
        message: 'Firstname must be at least 2 characters.'
    }),
    lastname: z.string().min(2, {
        message: 'Firstname must be at least 2 characters.'
    }),
    message: z.string().nonempty().trim().min(5, {
        message: 'Message must be at least of 5 characters.'
    }),
    email: z.string().email({
        message: 'Email must be a valid email !'
    }),
    service: z.string().min(3).optional(),
    phone: z
        .string()
        // .optional()
        // .replace(/\s/g, "")
        .regex(
            // /^\+\d{1,3}[ ]?\d{2}[ ]?\d{3}[ ]?\d{3}$/,
            // /^\+\d{1,3}\d{7,15}$/,
            // /d{6,}$/,
            /^(\+\d{1,3}\d{7,13}|\d{7,13})$/, //  A + followed by 1 to 3 digits and then 6 or more digits.
            {
                message:
                    'Phone number must be of minimum 6 digits or with the format +countryCode phoneNumber (e.g: +21656521184)'
            }
        )

})


function ContactPage() {
    const router = useRouter()
    const [loadingSend, setLoadingSend] = useState(false)
    // const {
    //   register,
    //   handleSubmit,
    //   reset,
    //   formState: { errors, isSubmitting },
    // } = useForm<Inputs>({
    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            email: '',
            message: '',
            phone: '',
            firstname: '',
            lastname: ''
        }
    })

    // Promise<SubmitHandler<Inputs>>
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof contactFormSchema>) {
        // ✅ This will be type-safe and validated.
        setLoadingSend(true)
        try {
            const result = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: values.email,
                    message: values.message,
                    phone: values.phone,
                    service: values.service,
                    firstname: values.firstname,
                    lastname: values.lastname
                })
            })

            console.log('result api', result)
            // if (!result.ok) {
            //   toast.error('Failed to send the email, please try again later !', {
            //     className: 'bg-gray-100 text-[#00gg99]',
            //     position: 'bottom-right'
            //   })
            //   return null
            // }

            // { accepted, responseStr, envelope, success }
            const response = await result.json()
            // console.log('response ', response)
            // if (accepted.length > 0) {}
            if (response.success) {
                // toast(<div className="bg-blue-500 text-white p-4">Email sent successfully</div>);
                toast.success(`Email sent successfully with email ${values.email} !`, {
                    className: 'text-[#00ff99]',
                    position: 'bottom-right'
                    // style: { color: '#00ff99' }
                })
                router.push('/')
            }
            // reset();
        } catch (error: any) {
            toast.error(`Error sending email, Error: ${error.message}`)
            return
        } finally {
            setLoadingSend(false)
        }
    }

    return (
        <motion.section
            // initial={{ opacity: 0 }}
            // animate={{
            //     opacity: 1,
            //     transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' }
            // }}
            className={'pb-6 text-white mt-20 h-full'}
        >
            <div className={'mx-auto space-y-5'}>
                <div className={'flex flex-col gap-[30px] xl:flex-row'}>
                    {/*<div className={"flex flex-col w-full xl:w-[54%]"}>*/}
                    <div className={'order-2 xl:order-none xl:w-[60%]'}>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className={'flex flex-col gap-3 rounded-xl bg-[#27272c] p-10'}
                            >
                                {/*<h3 className={'text-4xl text-accent_green'}>*/}
                                <h3 className={'gradient-green-text text-4xl font-bold'}>
                                    Let&apos;s Talk
                                    {/*Let's work together*/}
                                </h3>


                                <p className='text-lg font-light text-white/80 hover:text-white'>
                                    I got what you need. Contact me for top-notch development
                                    services
                                </p>
                                <div className={'grid grid-cols-1 gap-6 md:grid-cols-2'}>
                                    <FormField
                                        control={form.control}
                                        name='firstname'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Firstname</FormLabel>
                                                <Input
                                                    type={'text'}
                                                    placeholder={'Firstname'}
                                                    className={'w-full'}
                                                    {...field}
                                                />
                                                <FormMessage
                                                    className={'font-semibold tracking-wide text-red-700'}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='lastname'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Lastname</FormLabel>
                                                <Input
                                                    type={'text'}
                                                    placeholder={'Lastname'}
                                                    className={'w-full'}
                                                    {...field}
                                                />
                                                <FormMessage
                                                    className={'font-semibold tracking-wide text-red-700'}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email address</FormLabel>
                                                <Input
                                                    type={'text'}
                                                    placeholder={'Email address'}
                                                    className={'w-full'}
                                                    {...field}
                                                />
                                                <FormMessage
                                                    className={'font-semibold tracking-wide text-red-700'}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='phone'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone number</FormLabel>
                                                <Input
                                                    type={'text'}
                                                    placeholder={'Phone number'}
                                                    className={'w-full'}
                                                    {...field}
                                                />
                                                <FormMessage
                                                    className={'font-semibold tracking-wide text-red-700'}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                </div>


                                <FormField
                                    control={form.control}
                                    name='service'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Select a service</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className={'w-full'}>
                                                        <SelectValue placeholder='Select a service' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Select a service</SelectLabel>
                                                            <SelectItem value={'Fullstack_web_development'}>
                                                                Fullstack Web Development
                                                            </SelectItem>
                                                            <SelectItem value={'Frontend_development'}>
                                                                Frontend Development
                                                            </SelectItem>
                                                            <SelectItem value={'UI_UX_Design'}>
                                                                UI / UX Design
                                                            </SelectItem>
                                                            <SelectItem value={'Logo_design'}>
                                                                Logo Design
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage
                                                className={'font-semibold tracking-wide text-red-700'}
                                            />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='message'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className={'h-[200px]'}
                                                    placeholder={'Type your message here.'}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage
                                                className={'font-semibold tracking-wide text-red-700'}
                                            />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type={'submit'}
                                    size={'default'}
                                    className={
                                        'w-fit self-center border bg-accent_green text-black hover:bg-accent_green-hover'
                                    }
                                >
                                    Send
                                    {loadingSend && (
                                        <span className='gradient-green-text text-lg font-bold'>
                      &nbsp;&nbsp; Loading...
                    </span>

                                    )}
                                </Button>
                            </form>
                        </Form>
                    </div>
                    {/* Info */}
                    <div className='order-1 mb-8 flex items-center xl:order-none xl:mx-2 xl:mb-0 xl:justify-end'>
                        <ul className={'grid w-full grid-cols-1 gap-3 md:grid-cols-2'}>
                            {info.map((item, index) => (
                                <li
                                    key={index}
                                    // className={'flex w-full flex-1 items-center gap-6 border'}
                                    className={'flex-1'}
                                >
                                    {/*<p className={'text-white/80 hover:text-white'}>*/}
                                    <p className={'text-white'}>{item.title}:</p>
                                    {/*col-span-1*/}
                                    <div className={'flex items-center space-x-3'}>
                                        <div
                                            className={
                                                'flex items-center justify-center rounded-md bg-[#27272c] p-2 text-accent_green'
                                                // 'flex h-[52px] w-[52px] items-center justify-center rounded-md bg-[#27272c] text-2xl text-accent_green xl:h-[56px] xl:w-[56px]'
                                            }
                                        >
                                            <item.icon className={'h-7 w-7'} />
                                        </div>
                                        <ScrollArea className={'w-[300px]'}>
                                            {/*{Array.isArray(item.description) ? (*/}
                                            {item.subitems.map((subitem, index) => (
                                                <Link
                                                    key={index}
                                                    // onDoubleClick={() => item.href}
                                                    href={subitem.href}
                                                    target={
                                                        '_blank'
                                                        // item.href !== '' ? '_blank' : undefined
                                                    }
                                                >
                                                    <p
                                                        className={
                                                            'text-nowrap text-lg hover:text-blue-500 hover:underline'
                                                            // hover:underline-offset-1
                                                        }
                                                    >
                                                        {subitem.value}
                                                    </p>
                                                </Link>
                                            ))}

                                            <ScrollBar orientation='horizontal' />
                                        </ScrollArea>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
export default ContactPage
