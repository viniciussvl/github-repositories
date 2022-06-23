export interface IRepositoryModel {
    id: number;
    name: string;
    description: string,
    private: boolean;
    url: string;
    created_at: Date;
    updated_at: Date;
    language: string;
}