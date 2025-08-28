// Type exact attendu par le backend quand on s’inscrit
export interface RegisterDto {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  street: string;
  zipcode: string;
  city: string;
  profile_picture: string;
  description: string;
  availability: string;
}

import type { SignupFormData } from "./form.types";

// Fonction pour convertir les données du formulaire en données backend (DTO d’inscription)
export function mapFormDataToRegisterDto(form: SignupFormData & { avatarUrl?: string } ): RegisterDto {
  return {
    email: form.email,
    password: form.password,
    firstname: form.firstName,
    lastname: form.lastName,
    street: form.address,
    zipcode: form.zip,
    city: form.city,
    profile_picture: form.avatarUrl ?? "", // on envoie l'avatar s’il est défini, sinon une chaîne vide
    description: form.about,
    availability: form.availability,
  };
}
