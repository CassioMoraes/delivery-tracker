const { cpf, cnpj } = require('cpf-cnpj-validator');

class DocumentValidator {

    static validate(document) {
        if (cpf.isValid(document)) {
            return { isValid: true, document: cpf.format(document) };
        } else if (cnpj.isValid(document)) {
            return { isValid: true, document: cnpj.format(document) };
        }

        return { isValid: false, document: 'This document is not valid' };
    }
}

module.exports = DocumentValidator;