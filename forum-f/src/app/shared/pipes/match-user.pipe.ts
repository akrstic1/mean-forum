import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../../data/model/post.model';
import { User } from '../../data/model/user.model';

@Pipe({
  name: 'matchUser',
})
export class MatchUserPipe implements PipeTransform {
  transform(ids: any, users: User[]): any {
    if (Array.isArray(ids)) {
      ids.forEach((p) => {
        p.username = users.find((e) => e._id == p.user_id).username;
      });

      return ids;
    } else {
      return users.find((u) => u._id == ids).username;
    }
  }
}
