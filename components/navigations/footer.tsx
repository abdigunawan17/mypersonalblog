import siteConfig from "@/config/site"
import PaddingContainer from "../layout/padding-container"
import Link from "next/link"
import SocialLink from "../elements/social-link"
import { getDictionary } from "@/lib/getDictionary"


const Footer = async ({ locale }: { locale: string }) => {
    const dictionary = await getDictionary(locale);

  return (
    <div className="py-8 mt-10 border-t">
        <PaddingContainer>
            <div>
                <h2 className="text-3xl font-bold">
                    { siteConfig.siteName }
                </h2>
                <p className="max-w-md mt-2 text-lg text-neutral-700">
                    { dictionary.footer.description }
                </p>
            </div>

            {/* Social and Currently At */}
            <div className="flex flex-wrap justify-between gap-4 mt-6">
                <div>
                    <div className="text-lg font-medium">#exploretheworld</div>
                    <div className="flex items-center gap-3 mt-2 text-neutral-600">
                        <SocialLink platform="facebook" link={ siteConfig.socialLink.facebook } />
                        <SocialLink platform="linkedin" link={ siteConfig.socialLink.linkedin } />
                        <SocialLink platform="twitter" link={ siteConfig.socialLink.twitter } />
                        <SocialLink platform="github" link={ siteConfig.socialLink.github } />
                    </div>
                </div>
                <div>
                    <div className="text-sm text-neutral-400">{dictionary.footer.currentlyAtText}</div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-md">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        { siteConfig.curentlyAt }
                    </div>
                </div>
            </div>
            {/* Bottom Section */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 mt-16 border-t">
                <div className="text-sm text-neutral-400">
                    {dictionary.footer.rightsText} { new Date().getFullYear() }
                </div>
                <div className="text-sm">
                    {dictionary.footer.creatorText}{" "} <Link href="https://twitter.com/bliputuabdi">@bliputuabdi</Link>
                </div>
            </div>
        </PaddingContainer>
    </div>
  )
}

export default Footer