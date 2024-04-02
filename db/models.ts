import { ObjectId } from 'mongodb';

export class Confession {
  constructor(
    public text: string,
    public _id?: ObjectId
  ){}
}
