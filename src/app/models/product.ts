export interface ProductResponse {
    start: number;
    per_page: number;
    total: number;
    data: Product[];
}

export interface Product {
    product_id: number;
    name: string;
    slug: string;
    price: string;
    discount: string;
    price_to_subtract: string;
    stock_count: number;
    is_promo_enabled: boolean;
    category: string;
    manufacturer: string;
    image: string;
    description: string;
    specifications: string;
    tags: string;
    created_on: Date;
    updated_on: Date;

    // Bellow are not parsed from api response
    isInFavourite: boolean;
}
