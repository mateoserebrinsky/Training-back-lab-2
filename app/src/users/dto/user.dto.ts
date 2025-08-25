export class UserDto {
  user_id: number
  username: string;
  email: string;
  password: string;
  emails_sent:  number
  role: string;
  last_reset_date: Date;
}