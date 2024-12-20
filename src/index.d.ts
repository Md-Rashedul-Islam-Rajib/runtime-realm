import { JwtPayload } from 'jsonwebtoken';
interface CustomPayload extends JwtPayload { 
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomPayload;
    }
  }
}
export {};