import IResponse from "./IResponse";

export default interface FootballMatchResponse extends IResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: FootbalMatchDataResponse[];
}

export interface FootbalMatchDataResponse {
    name: string;
    country: string;
    year: number;
    winner: string;
    runnerup: string
}