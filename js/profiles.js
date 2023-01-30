const footerProfiles = [
  {
    linkedinProfile: "Daiana Mercado",
    githubProfile: "https://github.com/DaiM24",
    linkedinURL: "https://www.linkedin.com/in/daianamercado/",
  },
  {
    linkedinProfile: "Leandro Ramos",
    githubProfile: "https://github.com/Leandro97ramos",
    linkedinURL: "https://www.linkedin.com/in/leandro-ramos-lkd/",
  },
  {
    linkedinProfile: "Catalina Simonovich",
    githubProfile: "https://github.com/catasimonovich4",
    linkedinURL: "https://www.linkedin.com/in/catalina-simonovich/",
  },
  {
    linkedinProfile: "Ivan Rodriguez",
    githubProfile: "https://github.com/Axfroy",
    linkedinURL: "url",
  },
];

function footer(footerProfiles) {
  return `
    <div class="d-flex flex-column align-items-center container col-lg-3 col-6 my-2">
        <h4 class="fs-6 fw-bold text-white text-center">${footerProfiles.linkedinProfile}</h4>
        <div class="d-flex gap-3">
            <a  href="${footerProfiles.linkedinURL}" class="link-light">
                <i class="bi bi-linkedin fs-4"></i>
            </a>
            <a href="${footerProfiles.githubProfile}" class="link-light">
                <i class="bi bi-github fs-4 p-0"></i>
            </a>
        </div>
    </div>
`;
}

function createFooter() {
  let footerEl = ``;
  const footerCtn = document.getElementById("footerProfileCtn");

  for (let i = 0; i < footerProfiles.length; i++) {
    footerEl += footer(footerProfiles[i]);
  }
  footerCtn.insertAdjacentHTML("beforeend", footerEl);
}

createFooter();
