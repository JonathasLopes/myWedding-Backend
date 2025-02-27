import { Router } from 'express';
import multer from 'multer';
import { storage } from './Configurations/Multer';
import InvitesController from './Controllers/InvitesController';
import fs from 'fs';
import path from 'path';
import MessageController from './Controllers/MessageController';

const router = Router();

// const uploadDir = path.join(__dirname, 'Uploads');

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

//const upload = multer({ storage });

router.get("/", (req, res) => { res.send("Estou on!") });

router.get("/GetAllInvites", InvitesController.GetAllInvites);
router.get("/GetAllMessages", MessageController.GetAll);

router.put("/ConfirmPresence", InvitesController.ConfirmPresence);
router.put("/RemovePresence", InvitesController.RemovePresence);

//router.post('/uploadInvites', upload.single('file'), InvitesController.UploadExcel);
router.post('/SearchInvite', InvitesController.SearchInvite);
router.post('/SendMessage', MessageController.SendMessage);

router.delete('/DeleteAllInvites', InvitesController.DeleteAllInvites);
router.delete('/DeleteMessage', MessageController.DeleteMessage);

export default router;