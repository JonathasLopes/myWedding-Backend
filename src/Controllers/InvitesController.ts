import { Request, Response } from 'express';
import VerifyBasicAuthHelper from '../Helpers/VerifyBasicAuthHelper';
import { ValidateString } from '../Helpers/ValidateTypes';
import { CreateInviteMassive, DeleteAll, GetAll, GetAllByFamilyId, GetAllNotConfirmed, GetByName, UpdateConfirmed } from '../Repositories/InvitesRepository';
import ReadExcel from '../Helpers/ReadExcel';
import fs from 'fs';
import Invites from '../Models/InvitesModel';
import { closeConnection } from '../Connections/MongoDb';
import normalizeText from '../Helpers/NormalizeText';
import SendNotConfirmed from '../Services/SendEmailService';

class InvitesController {
    async ConfirmPresence(request: Request, response: Response): Promise<any> {
        const { ids } = request.body;

        try {
            var headerResponse = VerifyBasicAuthHelper(request.headers['authorization']);

            if (headerResponse === 400) {
                return response.status(400).json({ message: "Usuário não autenticado!" })
            } else if (headerResponse === 401) {
                return response.status(401).json({ message: "Usuário não autorizado!" });
            }

            if (!ValidateString(ids)) {
                return response.status(400).json({ message: "Não há nenhum convidado selecionado no momento!" });
            }

            const arrayIds = ids.split(",");
            
            await Promise.all(arrayIds.map(async (item) => {
                await UpdateConfirmed(item, true);
            }));

            return response.json({ message: `${arrayIds.length > 1 ? "Convidados confirmados" : "Convidado confirmado"} com sucesso!` });
        }
        catch (error) {
            return response.status(500).json({ message: "Não foi possível confirmar a presença, tente novamente mais tarde!" });
        }
    }

    async GetAllInvites(request: Request, response: Response): Promise<any> {
        try {
            var headerResponse = VerifyBasicAuthHelper(request.headers['authorization']);

            if (headerResponse === 400) {
                return response.status(400).json({ message: "Usuário não autenticado!" })
            } else if (headerResponse === 401) {
                return response.status(401).json({ message: "Usuário não autorizado!" });
            }

            var result = await GetAll();

            return response.json(result);
        }
        catch (error) {
            return response.status(500).json({ message: "Não foi possível deletar todos os convites, tente novamente mais tarde!" });
        }
    }

    async DeleteAllInvites(request: Request, response: Response): Promise<any> {
        try {
            var headerResponse = VerifyBasicAuthHelper(request.headers['authorization']);

            if (headerResponse === 400) {
                return response.status(400).json({ message: "Usuário não autenticado!" })
            } else if (headerResponse === 401) {
                return response.status(401).json({ message: "Usuário não autorizado!" });
            }

            await DeleteAll();

            return response.json({ message: 'Convites deletados com sucesso!' });
        }
        catch (error) {
            return response.status(500).json({ message: "Não foi possível deletar todos os convites, tente novamente mais tarde!" });
        }
    }

    async SearchInvite(request: Request, response: Response): Promise<any> {
        const { name } = request.body;

        try {
            const headerResponse = VerifyBasicAuthHelper(request.headers['authorization']);

            switch (headerResponse) {
                case 400:
                    return response.status(400).json({ message: "Usuário não autenticado!" });
                case 401:
                    return response.status(401).json({ message: "Usuário não autorizado!" });
            }

            if (!ValidateString(name)) {
                return response.status(400).json({ message: "Não há nenhum nome para buscar no momento!" });
            }

            let invites = await GetByName(name);

            if (!invites.length) {
                return response.json({ families: [] });
            }

            const uniqueFamilyIds = Array.from(new Set(invites.map(invite => invite.FamilyId)));

            const familyData = await Promise.all(
                uniqueFamilyIds.map(async (familyId) => {
                    const members = await GetAllByFamilyId(familyId);
                    const nameSearch = invites.find(x => x.FamilyId == familyId).Name;

                    return {
                        FamilyId: familyId,
                        NameSearched: nameSearch,
                        Members: members
                    };
                })
            );

            return response.json({ families: familyData });

        } catch (error) {
            return response.status(500).json({ message: "Não foi possível buscar o convidado, tente novamente mais tarde!" });
        } finally {
            closeConnection();
        }
    }

    async RemovePresence(request: Request, response: Response): Promise<any> {
        const { ids } = request.body;

        try {
            var headerResponse = VerifyBasicAuthHelper(request.headers['authorization']);

            if (headerResponse === 400) {
                return response.status(400).json({ message: "Usuário não autenticado!" })
            } else if (headerResponse === 401) {
                return response.status(401).json({ message: "Usuário não autorizado!" });
            }

            if (!ValidateString(ids)) {
                return response.status(400).json({ message: "Não há nenhum convidado selecionado no momento!" });
            }

            const arrayIds = ids.split(",");

            await Promise.all(arrayIds.map(async (item) => {
                await UpdateConfirmed(item, false);
            }));

            return response.json({ message: `${arrayIds.length > 1 ? "Confirmações removidas" : "Confirmação removida"} com sucesso!` });
        }
        catch (error) {
            return response.status(500).json({ message: "Não foi possível remover a confirmação de presença, tente novamente mais tarde!" });
        }
    }

    async UploadExcel(request: Request, response: Response): Promise<any> {
        try {
            var headerResponse = VerifyBasicAuthHelper(request.headers['authorization']);

            if (headerResponse === 400) {
                return response.status(400).json({ message: "Usuário não autenticado!" })
            } else if (headerResponse === 401) {
                return response.status(401).json({ message: "Usuário não autorizado!" });
            }

            const file = request.file;

            var excelJson = ReadExcel(file.path);

            var result = excelJson.reduce(
                (result: any, currentValue: any) => {
                    (result[currentValue['Grupo']] = result[currentValue['Grupo']] || []).push(currentValue);
                    return result;
                }, {});

            var list: Invites[] = [];

            for (const group in result) {
                // Acessa os elementos do grupo
                const family = result[group];

                family.forEach((member) => {
                    var invite: Invites = new Invites(member.Nome, false, member.Grupo, normalizeText(member.Nome).toLowerCase());

                    list.push(invite);
                });
            }

            await CreateInviteMassive(list);

            fs.unlinkSync(file.path);

            return response.json({ data: result, message: "Upload concluído com sucesso!" });
        }
        catch (error) {
            return response.status(500).json({ message: "Não foi possível realizar o upload, tente novamente mais tarde!" });
        }
    }

    async SendAllNotConfirmedEmail(request: Request, response: Response): Promise<any> {
        try {
            var allNotConfirmed = await GetAllNotConfirmed();

            await SendNotConfirmed(allNotConfirmed.map(x => x.Name).join(","), allNotConfirmed.length);

            return response.json({ message: "Email enviado com sucesso!" });
        }
        catch(error) {
            return response.status(500).json({ message: "Não foi possível realizar o envio de email, tente novamente mais tarde!" });
        }
    }
}

export default new InvitesController()