import { Subclass } from "../../db/models/Subclass";
import { HttpError } from "../../utils/response";

export class SubclassService {
  static list(classIndex?: string) {
    const filter = classIndex ? { classIndex } : {};
    return Subclass.find(filter).sort({ name: 1 });
  }

  static async show(index: string) {
    const subclass = await Subclass.findOne({ index });
    if (!subclass) throw new HttpError(404, "Especialidad no encontrada");
    return subclass;
  }
}
