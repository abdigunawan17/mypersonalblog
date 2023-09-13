
import directus from '@/lib/directus';
import { revalidateTag } from 'next/cache';
import Image from 'next/image'
import { getDictionary } from "@/lib/getDictionary"

const CTACard = async ({ locale }: { locale: string }) => {
    const dictionary = await getDictionary(locale);

    const formAction = async (formData: FormData) => {
        "use server";

        try {
            const email = formData.get("email");
            await directus.items("subcribers").createOne({
                email,
            });
            revalidateTag("subcribers-count");
        } catch (error) {
            console.log(error);
        }
    };

    const subcribersCount = await fetch(`${process.env.NEXT_PUBLIC_API_MAS}items/subcribers?meta=total_count&&access_token=${process.env.ADMIN_TOKEN}`,{
        next: {
            tags: ["subcibers-count"],
        },
    })
    .then((res) => res.json())
    .then((res) => res.meta.total_count)
    .catch((error) => console.log(error));

   return (
    <div className='relative px-6 py-10 overflow-hidden rounded-md bg-slate-100'>
        {/* overlay */}
        <div className='absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/20' />
        {/* the images */}
        <Image 
        fill 
        alt='CTA card image' 
        className='object-cover object-center'
        src="https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80" />
        {/* content container */}
        <div className='relative z-20'>
            <div className='text-lg font-medium'>#exploretheworld</div>
            <h3 className='mt-3 text-4xl font-semibold'>{dictionary.ctaCard.title}</h3>
            <p className='max-w-lg mt-2 text-lg'> 
                {dictionary.ctaCard.description}
            </p>
            <form 
            key={subcribersCount + "subcribers-form"} 
            className='flex items-center w-full gap-2 mt-6' 
            action={formAction}>
                <input 
                    type='email'
                    name='email'
                    placeholder={dictionary.ctaCard.placeholder}
                    className='md:w-auto w-full px-3 py-2 text-base bg-white/80 placeholder:text-sm rounded-md outline-none focus:ring-2 ring-neutral-600' 
                />
                <button className="px-3 py-2 rounded-md whitespace-nowrap bg-neutral-900 text-neutral-200">
                    {dictionary.ctaCard.button}
                </button>
            </form>

            {/* Subcribers */}
            <div className='mt-5 text-neutral-700'>{dictionary.ctaCard.subcriberText1} {" "}
            <span className='bg-neutral-700 rounded-md text-neutral-100 px-2 py-1 text-sm'>{subcribersCount}</span> {dictionary.ctaCard.subcriberText2}
            </div>
        </div>
    </div>
  )
}

export default CTACard;