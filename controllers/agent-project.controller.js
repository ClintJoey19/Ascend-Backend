import prisma from "../lib/prisma.js";

export const getAgentProjects = (req, res) => {
  const { id } = req.cookies["auth-token"];

  try {
    console.log(id);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "There was an error in fetching the projects" });
  }
};

export const getAgentProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        agent: true,
      },
    });

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json(project);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "There was an error in fetching the project" });
  }
};

export const createProject = async (req, res) => {
  const { name, agentId } = req.body;

  try {
    const project = await prisma.project.create({
      data: {
        name,
        agentId,
      },
    });

    if (!project) throw new Error("There was an error creating the project");

    res.send({ id: project.id });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("There was an error creating the project");
  }
};

export const updateProject = async (req, res) => {
  const values = req.body;
  const { id, agent, ...data } = values;

  try {
    const project = await prisma.project.update({
      where: {
        id,
      },
      data,
      include: {
        agent: false,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "There was an error updating the project" });
  }
};

export const deleteProject = (req, res) => {
  const { id } = req.params;

  try {
    console.log(id);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "There was an error deleting the project" });
  }
  console.log("delete Project");
};
