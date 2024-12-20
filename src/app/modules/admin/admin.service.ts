import { AdminModel } from "./admin.model";
import { TAdmin } from "./admin.types";

export class AdminServices {
    static async registerAdmin( payload: TAdmin ) { 
            const result = await AdminModel.create(payload);
            return result;
        };
}