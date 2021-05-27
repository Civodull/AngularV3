export interface Roles { 
    Etudiant?: boolean;
    Formateur?: boolean;
    admin?: boolean;
    Finance?: boolean;
 }
  
export interface User {
    uid: string;
    email: string;
    roles: Roles;
}