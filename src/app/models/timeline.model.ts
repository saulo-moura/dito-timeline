export interface ITimeline {
    timeline: IShoppingBuy[]
}

export interface IShoppingBuy {
    timestamp: string,
    revenue: number,
    transaction_id: string,
    store_name: string,
    products: IProduct[]
}

export interface IProduct {
    name: string,
    price: number
}