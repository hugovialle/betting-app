export class EventCard {
  _id?: number | string;
  date!: Date;
  title!: string;
  sport!: string;
  peopleCount!: number;
  arrondissement!: string;
  place_id!: string;
  creator_id!: string;
  participants_id!: string[];
}
