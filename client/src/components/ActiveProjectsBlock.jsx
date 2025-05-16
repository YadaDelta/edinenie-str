import React from "react";

const projects = [
  {
    id: 1,
    name: 'Жилой комплекс "Люксор"',
    image: "main/active1.jpeg",
    available: 5,
    link: "/houses/1",
  },
  {
    id: 2,
    name: 'Жилой комплекс "Автограф"',
    image: "main/active2.jpeg",
    available: 3,
    link: "/houses/2",
  },
  {
    id: 3,
    name: 'Коттеджи "UNION-VILLAGE"',
    image: "main/active3.png",
    available: 3,
    link: "/houses/3",
  },
];

const ActiveProjectsBlock = () => {
  return (
    <div className="active-projects-container">
      <div className="active-projects-content">
        <div className="left-section">
          <h2>Объекты в продаже на данный момент:</h2>
        </div>
        <div className="right-section">
          {projects.map((project) => (
            <a key={project.id} href={project.link} className="project-card">
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.name} />
                <div className="project-info-overlay">
                  <h4>{project.name}</h4>
                  <p>В продаже: {project.available}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveProjectsBlock;
