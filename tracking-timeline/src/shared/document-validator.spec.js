const sinon = require('sinon');

const DocumentValidator = require('./document-validator');

describe('#validate()', () => {
    test('should return formated CPF', async () => {
        expect(DocumentValidator.validate('83441751000').document).toBe('834.417.510-00');
        expect(DocumentValidator.validate('652.131.530-70').document).toBe('652.131.530-70');
    });

    test('should return formated CNPJ', async () => {
        expect(DocumentValidator.validate('93102604000120').document).toBe('93.102.604/0001-20');
        expect(DocumentValidator.validate('93.102.604/0001-20').document).toBe('93.102.604/0001-20');
    });

    test('should return document not valid', async () => {
        expect(DocumentValidator.validate('9310260400012012').isValid).toBeFalsy();
        expect(DocumentValidator.validate('8344175100').isValid).toBeFalsy();
        expect(DocumentValidator.validate('test').isValid).toBeFalsy();
        expect(DocumentValidator.validate('').isValid).toBeFalsy();
    });
});