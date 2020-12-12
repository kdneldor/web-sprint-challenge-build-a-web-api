const express = require("express");
const actions = require("../data/helpers/actionModel");
const router = express.Router();

router.get("/projects/:id/actions/:id", (req, res) => {
  actions
    .get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The actions information could not be retrieved.",
      });
    });
});

router.post("/projects/:id/actions", (req, res) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    return res.status(400).json({
      errorMessage: "Please provide id, description, and notes for the action.",
    });
  }

  actions
    .insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the action to the database.",
      });
    });
});

router.put("/projects/:id/actions/:id", (req, res) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    return res.status(400).json({
      errorMessage: "Please provide id, description, and notes for the action.",
    });
  }

  actions
    .update(req.params.id, req.body)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({
          message: "The action with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The action information could not be modified.",
      });
    });
});

router.delete("/projects/:id/actions/:id", (req, res) => {
  actions
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "Action was deleted.",
        });
      } else {
        res.status(404).json({
          message: "The action with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The action could not be removed.",
      });
    });
});

module.exports = router;