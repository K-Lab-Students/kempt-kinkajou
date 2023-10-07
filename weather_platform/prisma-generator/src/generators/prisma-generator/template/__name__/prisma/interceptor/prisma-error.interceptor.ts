import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException
} from "@nestjs/common";
import { catchError, Observable } from "rxjs";
import { RecordNotFoundError } from "../error/record-not-found.error";
import { UniqueConstraintFailedError } from "../error/unique-constraint-failed.error";

@Injectable()
export class PrismaErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => {
          if (err instanceof RecordNotFoundError) throw new NotFoundException(err.message);
          if (err instanceof UniqueConstraintFailedError) throw new ConflictException(err.message);
          throw err;
        })
      );
  }
}
