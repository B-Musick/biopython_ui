export interface NavLinkInfo {
    title: string,
    url: string,
    icon: any | undefined
}

export interface ListCardProps {
    title: string,
    item: Object,
    handleClick: (item:any) => {}
}