import express from "express";
export const homeGetController = (
  req: express.Request,
  res: express.Response
) => {
  res.send(req.body);
};
