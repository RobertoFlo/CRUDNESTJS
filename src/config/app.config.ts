
/**
 * configuration for the application 
 * @returns { environment: string; mongodb: string; port: number }
 */
export const EnvConfiguration = () => ({
   environment: process.env.NODE_ENV || 'dev',
   mongodb: process.env.MONGODB,
   port: process.env.PORT || 3009,
   defaultLimit: +process.env.DEFAULT_LIMIT || 10,
})