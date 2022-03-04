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
    "React",
    "NextJs",
    "Angular",
    "Chakra-Ui",
    "PrimeReact",
    "Angular Material",
    "Bootstrap",
    "Tailwind",
    "Styled Components",
    "Redux Toolkit",
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
    "Socket.io",
  ];

  design: string[] = [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe Indesign",
    "Canva",
  ];

  constructor() {}

  ngOnInit() {}
}
