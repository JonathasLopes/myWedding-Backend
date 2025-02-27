import { Request, Response } from 'express';
import VerifyBasicAuthHelper from '../Helpers/VerifyBasicAuthHelper';
import { ValidateString } from '../Helpers/ValidateTypes';
import Messages from '../Models/MessagesModel';
import { DeleteById, GetAll, SendMessage } from '../Repositories/MessagesRepository';

class MessageController {
    async SendMessage(request: Request, response: Response): Promise<any> {
        const { name, message } = request.body;

        try {
            var headerResponse = VerifyBasicAuthHelper(request.headers['authorization']);

            if (headerResponse === 400) {
                return response.status(400).json({ message: "Usuário não autenticado!" })
            } else if (headerResponse === 401) {
                return response.status(401).json({ message: "Usuário não autorizado!" });
            }

            if (!ValidateString(name)) {
                return response.status(400).json({ message: "Não há um nome de quem está enviando a mensagem!" });
            }
            else if(!ValidateString(message)) {
                return response.status(400).json({ message: "Não há mensagem a ser enviada!" });
            }

            var messageToSend = new Messages(name, message);

            await SendMessage(messageToSend);

            return response.json({ message: 'Mensagem enviada com sucesso!' });
        }
        catch (error) {
            return response.status(500).json({ message: "Não foi possível enviar a mensagem, tente novamente mais tarde!" });
        }
    }

    async GetAll(request: Request, response: Response): Promise<any> {
        try {
            var headerResponse = VerifyBasicAuthHelper(request.headers['authorization']);

            if (headerResponse === 400) {
                return response.status(400).json({ message: "Usuário não autenticado!" })
            } else if (headerResponse === 401) {
                return response.status(401).json({ message: "Usuário não autorizado!" });
            }

            var all = await GetAll();

            return response.json(all);
        }
        catch (error) {
            return response.status(500).json({ message: "Não foi possível enviar a mensagem, tente novamente mais tarde!" });
        }
    }

    async DeleteMessage(request: Request, response: Response): Promise<any> {
        const { id } = request.body;

        try {
            var headerResponse = VerifyBasicAuthHelper(request.headers['authorization']);

            if (headerResponse === 400) {
                return response.status(400).json({ message: "Usuário não autenticado!" })
            } else if (headerResponse === 401) {
                return response.status(401).json({ message: "Usuário não autorizado!" });
            }

            await DeleteById(id);

            return response.json({ message: 'Mensagem deletada com sucesso!' });
        }
        catch(error) {
            return response.status(500).json({ message: "Não foi possível deletar a mensagem, tente novamente mais tarde!" });
        }
    }
}

export default new MessageController()