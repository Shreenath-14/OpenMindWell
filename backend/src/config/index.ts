import dotenv from 'dotenv';

dotenv.config();

interface Config {
  supabase: {
    url: string;
    anonKey: string;
    serviceRoleKey: string;
  };
  huggingface: {
    apiToken?: string;
  };
  server: {
    port: number;
    frontendUrl: string;
  };
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
}


// 1. Define what needs to be validated
export const validateConfig = () => {
  const errors: string[] = [];

  // Check for missing variables
  const required = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'FRONTEND_URL'
  ];

  required.forEach(varName => {
    if (!process.env[varName]) {
      errors.push(`${varName} is missing`); // Clear error message
    }
  });

  // 2. Validate URL formats
  const validateUrl = (url: string | undefined, name: string) => {
    if (url) {
      try {
        new URL(url);
      } catch {
        errors.push(`${name} is not a valid URL format`); // URL validation
      }
    }
  };

  validateUrl(process.env.SUPABASE_URL, 'SUPABASE_URL');
  validateUrl(process.env.FRONTEND_URL, 'FRONTEND_URL');

  // 3. Validate PORT is actually a number
  if (process.env.PORT && isNaN(Number(process.env.PORT))) {
    errors.push('PORT must be a valid number'); // Number validation
  }

  // If there are any errors, throw a combined helpful message
  if (errors.length > 0) {
    throw new Error(
      `\n❌ Configuration Error:\n${errors.map(err => `  - ${err}`).join('\n')}\n` +
      `Please fix these in your .env file before restarting the server.\n`
    );
  }
};

const config: Config = {
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  huggingface: {
    apiToken: process.env.HUGGINGFACE_API_TOKEN,
  },
  server: {
    port: parseInt(process.env.PORT || '3001', 10),
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
};


export default config;
