import { StatusFullError } from '../../class/statusFullError';
import { AdminModel } from './admin.model';
import { TAdmin } from './admin.types';

export class AdminServices {
  static async registerAdmin(payload: TAdmin) {
      const adminCount = await AdminModel.countDocuments();
      if (adminCount) {
          throw new StatusFullError('AuthenticationError',"admin already registered",false,403);
      }
    const result = await AdminModel.create(payload);
    return result;
  }
}
