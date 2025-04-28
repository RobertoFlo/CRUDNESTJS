import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements HttpAdapter {
   private axios: AxiosInstance = axios;
   
   async get<T>(url: string, config?: any): Promise<T> {
      try {
         const response = await this.axios.get(url, config);
         return response.data;
      } catch (error) {
         this.handleError(error);
      }
   }
   
   async post<T>(url: string, data?: any, config?: any): Promise<T> {
      try {
         const response = await this.axios.post(url, data, config);
         return response.data;
      } catch (error) {
         this.handleError(error);
      }
   }
   async put<T>(url: string, data?: any, config?: any): Promise<T> {
      try {
         const response = await this.axios.put(url, data, config);
         return response.data;
      } catch (error) {
         this.handleError(error);
      }
   }
   async patch<T>(url: string, data?: any, config?: any): Promise<T> {
      try {
         const response = await this.axios.patch(url, data, config);
         return response.data;
      } catch (error) {
         this.handleError(error);
      }
   }
   async delete<T>(url: string, config?: any): Promise<T> {    
      try {
         const response = await this.axios.delete(url, config);
         return response.data;
      } catch (error) {
         this.handleError(error);
      }
   }  
   async request<T>(method: string, url: string, data?: any, config?: any): Promise<T> {
      try {
         const response = await this.axios.request({
            method,
            url,
            data,
            ...config,
         });
         return response.data;
      } catch (error) {
         this.handleError(error);
      }
   }

   private handleError(error: any): never {
      // Aquí puedes manejar el error de la manera que desees
      // Por ejemplo, lanzar una excepción personalizada o registrar el error
      throw new Error(`Error en la solicitud HTTP: ${error.message}`);
   }

}