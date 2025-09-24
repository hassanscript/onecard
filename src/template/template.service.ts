import { Injectable } from '@nestjs/common';

import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplateService {
  constructor() {}

  async get(): Promise<string> {
    return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title> {{ name }} – Business Card</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f8f8f8;
            padding: 20px;
          }
          .card {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            max-width: 400px;
          }
          img {
            width: 80px;
            border-radius: 50%;
          }
        </style>
      </head>
      <body>
         <div class="card">
        <img src="{{ profilePicUrl }}" alt="{{ name }}" />
        <h1>{{ name }}</h1>
        <p>{{ title }}</p>
        <p>{{ phone }}</p>
        <p>{{ email }}</p>
       
      </div>
      </body>
      </html>`;
  }

  async update(id: string, dto: UpdateTemplateDto): Promise<any> {
    // return this.findOne(id);
  }
}
