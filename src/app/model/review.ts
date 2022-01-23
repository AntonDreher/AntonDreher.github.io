import { Time } from "@angular/common";

export class Review {
    firstname: string = '';
    lastname: string = '';
    email: string = '';
    day_visited: Date;
    time_visited: Time;
    food_quality: number = 0;
    service_quality: number = 0;
    speed_quality: number = 0;
    price_quality: number = 0;
    overall_quality: number = 0;
    additional_comment: string = '';
}