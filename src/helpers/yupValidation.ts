import * as yup from 'yup';

export class yupValidation {
  async validateDoctor() {
    const doctor = yup.object().shape({
      name: yup.string().max(120).required().min(1),
      crm: yup
        .number()
        .max(9999999, 'Crm must be less or equal 7 characters')
        .integer()
        .positive()
        .required(),
      phone: yup.number().integer().positive().optional(),
      cell: yup.number().integer().positive().required(),
      cep: yup.number().integer().positive().required(),
      // specialty: yup.string().required(),
      specialty: yup
        .array()
        .of(yup.object().shape({ id: yup.number() }))
        .min(2),
    });
    return doctor;
  }
}

{
  id: yup.number();
}
