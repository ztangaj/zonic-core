import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { ApiResponse } from '../../../models/ApiResponse';
import { getFileName, update } from './update';

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}
type ResponseData = ApiResponse<string[], string>;

const apiRoute = nextConnect({
  onError(error, req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post((req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
  // split out password from user details
  console.log(req.body);
  const { name } = req.body;

  console.log(name);

  update(name);

  res.status(200).json({ data: name });
});

apiRoute.get((req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
  // split out password from user details
  const name = getFileName.getName();

  res.status(200).json({ data: name });
});

export const config = {
  api: {
    bodyParser: true,
  },
};
export default apiRoute;
