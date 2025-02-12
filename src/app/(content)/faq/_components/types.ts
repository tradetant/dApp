export interface FAQItem {
    question: string
    answer: string
    relevancy: string[]
    cta?: string
}

interface Role {
    name: string
    cta: string
    link?: {
        text: string
        url: string
    }
}

export interface FAQData {
    initialMessage: {
        text: string
        ctaButton: {
            text: string
            url: string
        }
    }
    roles: Record<string, Role>
    faq: FAQItem[]
}