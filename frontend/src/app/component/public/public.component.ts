import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-public',
  imports: [NgFor],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss'
})
export class PublicComponent {
  healthReports:any = [
    {
      id:1,
      illnessName: "Covid-19 update",
      description: "Stay inform about the latest covid 19 guidlines."
    },
    {
      id:2,
      illness: "Seasonal Flu Infection",
      description: "Learn about steps you can take to prevent flu."
    },
    {
      id:3,
      illness: "Mental health Awareness",
      description: "Explore resource and supports to maintain good mental health."
    },

  ]
}
