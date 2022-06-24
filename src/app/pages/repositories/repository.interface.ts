export interface IRepository {
    id: number;
    name: string;
    description: string,
    url: string;
    created_at: Date;
    updated_at: Date;
    html_url: string;
    private: boolean;
    archived: boolean;
    fork: boolean;
}