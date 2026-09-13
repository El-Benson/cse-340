import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const title = "Home";

  res.render("index", {
    title,
  });
});

app.get("/organizations", async (req, res) => {
  const title = "Organizations";

  const organizations = [
    {
      name: "Community Hope Center",
      description:
        "A community organization focused on supporting families, education, and local development.",
      image: "/images/community.svg",
    },
    {
      name: "Bright Future Initiative",
      description:
        "An organization that supports educational opportunities and youth development.",
      image: "/images/education.svg",
    },
    {
      name: "Green Earth Project",
      description:
        "A community initiative dedicated to environmental awareness and sustainable practices.",
      image: "/images/environment.svg",
    },
  ];

  res.render("organizations", {
    title,
    organizations,
  });
});

app.get("/projects", async (req, res) => {
  const title = "Service Projects";

  const projects = [
    {
      name: "Community Clean-Up",
      category: "Environmental",
      description:
        "A volunteer project focused on cleaning public spaces and improving the local environment.",
    },
    {
      name: "Youth Learning Program",
      category: "Educational",
      description:
        "A service project that provides learning support and educational resources for young people.",
    },
    {
      name: "Community Food Support",
      category: "Community Service",
      description:
        "A project designed to provide practical assistance and resources to community members.",
    },
    {
      name: "Healthy Community Outreach",
      category: "Health and Wellness",
      description:
        "A project promoting healthy lifestyles and community wellness awareness.",
    },
  ];

  res.render("projects", {
    title,
    projects,
  });
});

app.get("/categories", async (req, res) => {
  const title = "Categories";

  const categories = [
    "Environmental",
    "Educational",
    "Community Service",
    "Health and Wellness",
  ];

  res.render("categories", {
    title,
    categories,
  });
});

app.use(async (req, res) => {
  const title = "Page Not Found";

  res.status(404).render("index", {
    title,
    notFound: true,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log("CSE 340 server file has started.");
