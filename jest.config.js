export default {
    testEnvironment: 'node',   // Usa o ambiente de testes do Node.js
    testMatch: ['**/Tests/**/*.test.ts'],  // Define o diretório dos testes
    collectCoverage: true,   // Gera relatório de cobertura de código
    coverageDirectory: 'coverage',  // Pasta onde os relatórios de cobertura serão salvos
    verbose: true,  // Exibe mais detalhes nos logs do Jest
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    }
};