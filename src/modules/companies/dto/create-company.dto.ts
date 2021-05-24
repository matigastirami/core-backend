export interface CreateCompanyDto {
    name: string,
    description: string,
    page_url?: string,
    logo_url?: string,
    location?: string
}