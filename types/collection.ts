export interface Post {
    id: string;
    title: string;
    description: string;
    category: Category;
    author: Author;
    slug: string;
    image: string;
    body: string;
    date_created: string;
    date_updated: string;
}

//dikasih ? itu artinya not require, atau gimana menyebutnya
export interface Category {
    id: string;
    title: string;
    slug?: string;
    description?: string;
}

export interface Author {
    id: string;
    first_name: string;
    last_name: string;
}