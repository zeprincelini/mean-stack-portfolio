import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.css"],
})
export class SkillsComponent implements OnInit {
  client: string[] = [
    "Html",
    "Css",
    "Javascript",
    "React Jsx/Tsx",
    "Angular",
    "Chakra-Ui",
    "PrimeReact",
    "Angular Material",
    "Bootstrap",
    "Tailwind",
    "Node Template Engines",
  ];

  server: string[] = [
    "Node Js",
    "Express JS",
    "MongoDB",
    "Mongoose",
    "Mysql",
    "Postgres",
    "Knex",
    "Sequelize",
  ];

  design: string[] = ["Adobe Photoshop", "Adobe Illustrator", "Canva"];

  constructor() {}

  ngOnInit() {}
}
