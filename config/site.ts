export interface SiteConfig {
    siteName: string;
    description: string;
    curentlyAt: string;
    socialLink: {
        facebook: string;
        twitter: string;
        youtube: string;
        github: string;
        linkedin: string;
    };
}

const siteConfig: SiteConfig = {
    siteName: "Explorer",
    description: "Animal yang suka animal in Indonesia itu sangat beragam bentuk dan wujudnya",
    curentlyAt: "Indonesia",
    socialLink: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com/@bliputuabdi",
        youtube: "https://youtube.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
    },
};

export default siteConfig;