export default function VerifyBasicAuth(authorization: string[]) {
    if (authorization[0] !== "Basic") {
        return ({ status: 401, message: "Missing Basic Authorization!" });
    }

    //const credentials = Buffer.from(authorization[1], 'base64').toString();

    if (authorization[1] !== process.env.TOKEN) {
        return ({ status: 401, message: "Invalid Authentication Credentials!" });
    }

    return ({ status: 200, message: "Authentication Successful!" });
};