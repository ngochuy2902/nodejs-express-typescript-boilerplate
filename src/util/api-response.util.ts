import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const ok = (res: Response, data: object) => {
  res.status(StatusCodes.OK);
  res.json({
    data,
  });
};

const created = (res: Response, data: object) => {
  res.status(StatusCodes.CREATED);
  res.json({
    data,
  });
};

const noContent = (res: Response) => {
  res.status(StatusCodes.NO_CONTENT);
  res.json({});
};

export default {
  ok,
  created,
  noContent,
};
