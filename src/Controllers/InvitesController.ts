import { Request, Response } from 'express';
import VerifyBasicAuthHelper from '../Helpers/VerifyBasicAuthHelper';
import { ValidateString } from '../Helpers/ValidateTypes';
import { GetAllByFamilyId, GetByName, UpdateConfirmed } from '../Repositories/InvitesRepository';
import ReadExcel from '../Helpers/ReadExcel';
import fs from 'fs';
import IResponseFamily from '../Interfaces/ResponseFamilyInterface';
import Invites from '../Models/InvitesModel';

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

            for (var i = 0; i < arrayIds.length; i++) {
                await UpdateConfirmed(arrayIds[i], true);
            }

            return response.json({ message: `${arrayIds.length > 1 ? "Convidados confirmados" : "Convidado confirmado"} com sucesso!` });
        }
        catch (error) {
            return response.status(500).json({ message: "Não foi possível confirmar a presença, tente novamente mais tarde!" });
        }
    }

    async SearchInvite(request: Request, response: Response): Promise<any> {
        const { firstName, lastName } = request.body;

        try {
            var headerResponse = VerifyBasicAuthHelper(request.headers['authorization']);

            if (headerResponse === 400) {
                return response.status(400).json({ message: "Usuário não autenticado!" })
            } else if (headerResponse === 401) {
                return response.status(401).json({ message: "Usuário não autorizado!" });
            }

            if (!ValidateString(firstName) && !ValidateString(lastName)) {
                return response.status(400).json({ message: "Não há nenhum nome para buscar no momento!" });
            }

            var invites = await GetByName(firstName, lastName);
            var list: IResponseFamily[] = [];

            for (let i = 0; i < invites.length; i++) {
                let invite = invites[i];
                let familyId = invite.FamilyId;
                let members = await GetAllByFamilyId(familyId);

                var family: IResponseFamily = {
                    FamilyId: familyId,
                    Members: members
                };

                list.push(family);
            }

            return response.json({ families: list });
        } catch (error) {
            return response.status(500).json({ message: "Não foi possível buscar o convidado, tente novamente mais tarde!" });
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

            for (var i = 0; i < arrayIds.length(); i++) {
                await UpdateConfirmed(arrayIds[i], false);
            }

            return response.json({ message: `${arrayIds.length() > 1 ? "Confirmações removidas" : "Confirmação removida"} com sucesso!` });
        }
        catch (error) {
            return response.status(500).json({ message: "Não foi possível remover a confirmação de presença, tente novamente mais tarde!" });
        }
    }

    async UploadExcel(request: Request, response: Response): Promise<any> {
        try {
            const file = request.file;

            var excelJson = ReadExcel(file.path);

            var result = excelJson.reduce(
                (result: any, currentValue: any) => {
                    (result[currentValue['Grupo']] = result[currentValue['Grupo']] || []).push(currentValue);
                    return result;
                }, {});

            var list:Invites[] = [];

            for (const group in result) {
                // Acessa os elementos do grupo
                const family = result[group];

                family.forEach((member) => {
                    var name = member.Nome.split(" ");

                    var invite:Invites = new Invites(name[0], name.length > 1 ? name[1] : "", false, member.Grupo);

                    list.push(invite);
                });
            }

            await 

            fs.unlinkSync(file.path);

            return response.json({ data: result, message: "Upload concluído com sucesso!" });
        }
        catch (error) {
            return response.status(500).json({ message: "Não foi possível realizar o upload, tente novamente mais tarde!" });
        }
    }
}

export default new InvitesController()