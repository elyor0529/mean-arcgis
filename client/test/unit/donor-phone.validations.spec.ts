import * as validations from '../../src/app/donor/donor-form.validations';

describe('phone number', () => {
    const sut = validations.validateContactNumber;

    it('should show no errors for a correct phone no locale', () => {
        expect(sut({value: '+998977895642'})).toBeNull();
    });

    it('should show no errors for a correct phone no USA', () => {
        expect(sut({value: '00123455663987'})).toBeNull();
    });

});