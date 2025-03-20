import normalizeText from "../../Helpers/NormalizeText";

describe.only('NormalizeText test', () => {
    test('deve retornar o texto normalizado sem acento e minúsculo', () => {
        const result = normalizeText('Célia');
        expect(result).toBe<string>('celia');
    });
});