import * as validations from '../../src/app/donor/donor-form.validations';

describe('email', () => {

    const sut = validations.validateEmail;

    it('should show no errors for a correct email', () => {
        expect(sut({value: 'john.doe@acme.com'})).toBeNull();
    });

    it('should show errors for an incorrect email', () => {
        expect(sut({value: 'john.doecme.com'})).toEqual({
            validateEmail: {valid: false}
        });
    });
});
