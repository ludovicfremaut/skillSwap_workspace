// Type utilisé pour structurer les données du formulaire d’inscription côté front

export interface SignupFormData  {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  skills: string[];
  availability: string;
  about: string;
  address: string;
  city: string;
  zip: string;
  category: string;
  photo: File | null;
  avatarUrl?: string; // URL de l'avatar, optionnel
};