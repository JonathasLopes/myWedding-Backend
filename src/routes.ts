import { Router } from 'express';
import multer from 'multer';
import { storage } from './Configurations/Multer';
import InvitesController from './Controllers/InvitesController';
import fs from 'fs';
import path from 'path';

const router = Router();

const uploadDir = path.join(__dirname, 'Uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const upload = multer({ storage });

router.get("/", (req, res) => { res.send("Estou on!") });

router.post('/uploadInvites', upload.single('file'), InvitesController.UploadExcel);
router.post('/SearchInvite', InvitesController.SearchInvite);

export default router;