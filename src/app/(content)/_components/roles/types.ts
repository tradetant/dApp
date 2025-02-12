export interface Role {
    id: string
    name: string
    description: string
    narrative: string
    gradient: {
        from: string
        to: string
    }
    clan: string
    cta: string
}
