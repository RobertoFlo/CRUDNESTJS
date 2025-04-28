export interface HttpAdapter {
   get<T>(url: string, config?: any): Promise<any>;                
   post<T>(url: string, data?: any, config?: any): Promise<any>;          
   put<T>(url: string, data?: any, config?: any): Promise<any>;
   patch<T>(url: string, data?: any, config?: any): Promise<any>;
   delete<T>(url: string, config?: any): Promise<any>;      
   request<T>(method: string, url: string, data?: any, config?: any): Promise<any>; 
   }             