import { TodoDto } from "./dto/todo.dto";
import { TodoDocument } from "./schemas/todo.schema";


export function maptoDto(doc:TodoDocument): TodoDto {
    return {
        id: doc._id.toString(),
        title: doc.title,
        description: doc.description,
        status: doc.status,

    }
}