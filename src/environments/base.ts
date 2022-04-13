/**
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 * https://blog.usejournal.com/my-awesome-custom-react-environment-variables-setup-8ebb0797d8ac
 *
 * ts-prune-ignore-next
 */
export default function baseEnv() {
  return {
    isServer: typeof window === 'undefined',
    isClient: typeof window !== 'undefined',
    isDevelopment: process.env.NODE_ENV !== 'production',
    isProduction: process.env.NODE_ENV === 'production',
  };
}

export type Environment = ReturnType<typeof baseEnv>;
