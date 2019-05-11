export interface IEvents{
    events: IEventBuy[]
}

export interface IEventBuy {
    event: string,
    timestamp: string,
    revenue?: number
    custom_data: IBuyInfo[]
}

export interface IBuyInfo {
    key: string,
    value: string
}