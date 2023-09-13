
import { Post } from '@/types/collection';
import PostContent from './post-content'
import Image from 'next/image';


interface PostHeroIsinya {
    post: Post;
    locale: string;
}

const PostHero = ({ post, locale }: PostHeroIsinya) => {
  return (
    <div>
        <PostContent locale={locale} isPostPage post={post} />
        <Image 
        className='rounded-md object-cover object-center h-[300px] md:h-[500px] mt-6' 
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimised`}
        width={1280} 
        height={500} 
        alt={post.title} />
    </div>
  )
}

export default PostHero;