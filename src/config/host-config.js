const clientHostName = window.location.hostname;

let backendName;

if (clientHostName === 'localhost') {
  backendName = 'http://localhost:8181';
} else if (clientHostName === 'spring.com') {
  backendName = 'http://api.spring.com';
}

export const API_BASE_URL = backendName;
export const HONBAM = '/api/honbam';
export const USER = '/api/auth';
