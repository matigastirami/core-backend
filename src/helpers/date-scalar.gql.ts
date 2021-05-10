import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

import * as dayjs from 'dayjs';

@Scalar('Date')
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: string): Date {
    return dayjs(value).toDate(); // value from the client
  }

  serialize(value: Date): string {
    return dayjs(value).toISOString(); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      return dayjs(ast.value).toDate();
    }
    return null;
  }
}