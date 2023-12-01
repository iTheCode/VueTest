import axios from "axios";

export class ApiService {
  private readonly api = axios.create({
    baseURL: import.meta.env.API_URL || "https://fakestoreapi.com",
  });

  async get<T>(url: string): Promise<T> {
    const response = await this.api.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await this.api.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const response = await this.api.put<T>(url, data);
    return response.data;
  }

  async delete(url: string): Promise<void> {
    await this.api.delete(url);
  }
}
