const express = require("express");
const projects = require("../data/helpers/projectModel");
const router = express.Router();

router.get("/projects/:id", (req, res) => {
  projects
    .get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({
        error: "The project information could not be retrieved.",
      });
    });
});

router.post("/projects", (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      errorMessage: "Please provide name and description for project.",
    });
  }
  projects
    .insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the user to the database.",
      });
    });
});

router.put("/projects/:id", (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      errorMessage: "Please provide name and description for the project.",
    });
  }
  projects
    .update(req.params.id, req.body)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The project information could not be modified.",
      });
    });
});

router.delete("/projects/:id", (req, res) => {
  projects
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "Project was deleted.",
        });
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The user could not be removed.",
      });
    });
});

router.get("/projects/:id/actions", (req, res) => {
  projects
    .getProjectActions(req.params.id)
    .then((actions) => {
      if (actions) {
        res.json(actions);
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The actions information could not be retrieved.",
      });
    });
});

module.exports = router;