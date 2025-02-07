import VerifyBasicAuth from "../Authentications/BasicAuthentication";

export default function VerifyBasicAuthHelper(basicHeader?: string): number {
    if (!basicHeader) {
        return 400;
    }

    const basic = basicHeader.split(' ');
    const auth = VerifyBasicAuth(basic);

    if (auth.status !== 200) {
        return auth.status;
    }

    return 200;
}