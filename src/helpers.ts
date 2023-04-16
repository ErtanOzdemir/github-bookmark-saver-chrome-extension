import { type FormObjectInterface } from './interfaces';

export const html = (strings: any, ...values: any[]): string =>
  String.raw({ raw: strings }, ...values);

export const getFormData = (form: HTMLFormElement): FormObjectInterface => {
  const formData = new FormData(form);
  return Object.fromEntries(formData);
};
