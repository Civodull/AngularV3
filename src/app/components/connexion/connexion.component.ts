import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsersService } from 'src/app/services/users.service';
import { UserInterface } from '../create-users/create-users-interface';
import { from } from 'rxjs';
import * as firebase from 'firebase';
import auth from 'firebase/app';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  creatUser:FormGroup;
  submitted=false;
  Loading=false;
  id:string | null;
  statut:boolean = false;//utilisateur n'est pas supprimer
  isLoggedIn = false;
  isSignedIn: any;
  
  titre='Ajouter un utilisateur';
    //Definir un tableau pour le role
  public roles:Array<UserInterface> = [{id:1, role:"Admin"},{id:2, role:"Etudiant"},{id:3, role:"Formateur"},{id:4, role:"Finance"}];
  public idRole:number = 0;  
  constructor(private fb:FormBuilder, 
      private _userService: UsersService,
      private router:Router,
      private toastr: ToastrService,
      private aRouter:ActivatedRoute,
      public firebaseService:FirebaseService, 
      public firebaseAuth: AngularFireAuth,
      public afAuth: AngularFireAuth) {
  
      this.creatUser = this.fb.group({
        nom:['', [Validators.required,Validators.minLength(2)]],
        prenom:['', [Validators.required,Validators.minLength(2)]],
        pseudo:['', [Validators.required,Validators.minLength(2)]],
        adresse:['', [Validators.required,Validators.maxLength(40)]],
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required]],
        telephone:['', [Validators.required,Validators.maxLength(15)]],
        role:['', Validators.required]
        
    //    role:['', Validators.required]
      });
  //Recuperation de l'utilisateur à modifier
  this.id = this.aRouter.snapshot.paramMap.get('id');
     }
  
    ngOnInit(): void {

      //on initialise le composant pour la methode 
      this.editUser();

      // This
      if(localStorage.getItem('user') !== null){
        this.isSignedIn =true;
      }else{
        this.isSignedIn = false;
      }
    }
    //Creation d'un utilisateur
    signUpUser(){ 
  
  //insersion de l'utilisateur dans la base de donnee firebase
  
  }
  //Action pour enregistrer l'edition de l'utilisateur 
  estEditer(id:string){
  }
    //Methode editer un utilisateur sur firebase a partir de son id
    editUser(){
      this.titre='CONNEXION';
      if(this.id!==null){
        this.Loading = true;
        this._userService.getUserFirebase(this.id).subscribe(data =>{
          //console.log(data.payload.data()['nom']);
          this.Loading = false;
          this.creatUser.setValue({
            nom: data.payload.data()['nom'],
            prenom: data.payload.data()['prenom'],
            pseudo: data.payload.data()['pseudo'],
            adresse: data.payload.data()['adresse'],
            email: data.payload.data()['email'],
            telephone: data.payload.data()['telephone'],
            password: data.payload.data()['password'],
            role: data.payload.data()['role']
          })
  
        })
      }
    }
 
//methode sigup 
async onSignup(email:string,password:string){
  await this.firebaseService.signIn(email,password)
  if(this.firebaseService.isLoggedIn)
  this.isSignedIn = true;
}
//Debut de la base de
async signIn(email: string, password: string){
  await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
    this.isLoggedIn =true;
    localStorage.setItem('user',JSON.stringify(res.user));
    this.router.navigate(['/admin']);
    alert('Vous etes connectez avec succès')
})

}
//methode d'inscription
async signUp(email: string, password: string){
await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res => {
  this.isLoggedIn =true;
  localStorage.setItem('user',JSON.stringify(res.user));
})
}
//Deconnexion eliminer la session de connexion 
loggout(){
this.firebaseAuth.signOut()
localStorage.removeItem('user');
this.router.navigate(['/connexion']);
}

// async onSignup(email:string, password: string){
// await this.firebaseService.signUp(email, password) 
// if(this.firebaseService.isLoggedIn)
// this.isSignedIn = true;
// }
async onSignin(email:string, password: string){
await this.firebaseService.signIn(email, password) 
if(this.firebaseService.isLoggedIn)
this.isSignedIn = true;
this.router.navigate(['/admin']);
}
handleLogout(){
  this.isLoggedIn = false;
}
sigGoogle() {
  const googleAuthProvider = new auth.auth.GoogleAuthProvider();
  this.afAuth.signInWithPopup(googleAuthProvider);
}

signOutGoogle() {
  this.afAuth.signOut();
}
  
}
