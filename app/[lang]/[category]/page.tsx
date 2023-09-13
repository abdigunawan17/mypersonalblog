import PaddingContainer from '@/components/layout/padding-container';
import PostList from '@/components/post/post-lists';
import directus from '@/lib/directus';
import { Post } from '@/types/collection';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
    /* return DUMMY_CATEGORIES.map((category) => {
        return {
            category: category.slug,
        }
    })
    */
   try {
    const categories = await directus.items("category").readByQuery({
        filter: {
            status: {
                _eq: "published",
            },
        },
        fields: ["slug"],
    });

    const params = categories?.data?.map((category) => {
        return {
            category: category.slug as string,
            lang: "en",
        };
    });

    const localisedParams =  categories?.data?.map((category) => {
        return {
            category: category.slug as string,
            lang: "de",
        };
    });

    const allParamas = params?.concat(localisedParams ?? []);
    
    return allParamas || [];
   } catch (error) {
        console.log(error);
        throw new Error("Eror fetching categories");
   }
};

const Page = async ({
    params,
}: {
    params: {
        category: string;
        lang: string;
    };
}) => {
    /*
    const category = DUMMY_CATEGORIES.find(
        (category) => category.slug === params.category
    );

    const posts = DUMMY_POSTS.filter(
        (post) => post.category.title.toLocaleLowerCase() == params.category
    );
    */

    const locale = params.lang;

    const getCategoryData = async () => {
        try {
            const category = await directus.items("category").readByQuery({
                filter: {
                    slug: {
                        _eq: params.category,
                    },
                },
                fields: [
                    "*",
                    "translations.*",
                    "Posts.*",
                    "Posts.author.id",
                    "Posts.author.first_name",
                    "Posts.author.last_name",
                    "Posts.category.id",
                    "Posts.category.title",
                    "Posts.translations.*",
                ],
            });

            if (locale === "en") {
                return category?.data?.[0];
            } else {
                const fetchCategory = category?.data?.[0];
                const localisedCategory = {
                    ...fetchCategory,
                    title: fetchCategory.translations[0].title,
                    description: fetchCategory.translations[0].description,
                    Posts: fetchCategory.Posts.map((post: any) => {
                        return {
                            ...post,
                            title: post.translations[0].title,
                            description: post.translations[0].description,
                            body: post.translations[0].body,
                            category: {
                                ...post.category,
                                title: fetchCategory.translations[0].title,
                            },
                        };
                    }),
                };
                return localisedCategory;
            }

        } catch (error) {
            console.log(error);
            throw new Error("Error fetching category");
        }
    };

    const category = await getCategoryData();

    if( !category ) {
        notFound();
    }

    const typeCorrectedCategory = category as unknown as {
        id: string;
        title: string;
        description: string;
        slug: string;
        Posts: Post[];
    };

   return (
    <PaddingContainer>
        <div className='mb-8'>
            <h1 className='text-4xl font-semibold'>{typeCorrectedCategory?.title}</h1>
            <p className='text-lg text-neutral-600'>{typeCorrectedCategory?.description}</p>
        </div>
        <PostList locale={locale} posts={typeCorrectedCategory.Posts} />
    </PaddingContainer>
    
  );
};

export default Page;