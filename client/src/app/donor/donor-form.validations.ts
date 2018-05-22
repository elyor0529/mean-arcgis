export function validateEmail(formControl) {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return EMAIL_REGEXP.test(formControl.value) ? null : {
        validateEmail: {valid: false}
    };
}

export function validateContactNumber(formControl) {
    const CONTACT_NUM_REGEXP = /^(?:00|\+)\d{12}$/;

    return CONTACT_NUM_REGEXP.test(formControl.value) ? null : {
        validateContactNumber: {valid: false}
    };
}
