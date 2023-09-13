
import CTACard from "@/components/elements/cta-card";
import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostList from "@/components/post/post-lists";
import directus from "@/lib/directus";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  //console.log(params);

  const locale = params.lang;

  const getAllPosts = async () => {
    try {
      const posts = await directus.items("Post").readByQuery({
        fields: [
          "*",
          "author.id",
          "author.first_name",
          "author.last_name",
          "category.id",
          "category.title",
          "category.translations.*",
          "translations.*",
        ],
      });
      //chek dulu translation nya ada apa tidak
      //console.log(posts.data?.[0]);

      //return posts.data;
      if (locale === "en") {
        return posts.data;
      } else {
        const localisedPosts = posts.data?.map((post) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              ...post.category,
              title: post.category.translations[0].title,
            },
          };
        });
        return localisedPosts;
      }
    } 
    catch (error) {
      console.log(error);
      throw new Error("Error fetching posts");
    }
  };

  const posts = await getAllPosts();

  //console.log(posts);

  if( !posts ) {
    notFound();
  }

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
       <PostCard locale={locale} post={posts[0]} />
       {/* <PostCard layout="vertical" post={DUMMY_POSTS[5]} /> */}
       {/* so we can add _post since we don't need post */}
       <PostList 
        locale={locale}
        posts={posts.filter((_post, index) => index > 0 && index < 3)}
      />
      
      <CTACard locale={locale} />
      <PostCard locale={locale} reverse post={posts[3]} />
       <PostList 
        locale={locale}
        posts={posts.filter((_post, index) => index > 3 && index < 6)}
      />
      </main>
    </PaddingContainer>
  )
}
