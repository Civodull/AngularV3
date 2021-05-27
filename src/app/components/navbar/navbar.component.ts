import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ConnexionComponent } from '../connexion/connexion.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
@Output() isLogout = new EventEmitter<void>();
  constructor(public firebaseService: FirebaseService, 
    public firebaseAuth: AngularFireAuth,
    public router: Router) { }

  ngOnInit(): void {
  }
  loggout(){

    // if(){
    //   alert('Voulez-vous vous déconnecter ?')
    // }
    this.firebaseAuth.signOut()
    localStorage.removeItem('user');
    this.router.navigate(['/connexion']);
    this.isLogout.emit()
    }
  }

