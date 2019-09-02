import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {finalize} from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{

  authForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private  _loadingCtrl: LoadingController,
    private _toastCtrl: ToastController,
    private fb:FormBuilder
  ) {

  }

  ngOnInit():void{
    this.createForm();
  }

  private createForm():void{
    this.authForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get email():FormControl{
    return <FormControl>this.authForm.get('email');
  }

  get password():FormControl{
    return <FormControl>this.authForm.get('password');
  }

  login(value: any) {
    let loading = this._loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Validando...'
    });

    loading.present();
    let email = this.authForm.value.email;
    let senha = this.authForm.value.password;

    // usuario.senha = value.password;
    // this._authProvider
    //   .login(usuario)
    //   .pipe(finalize(() => loading.dismiss()))
    //   .subscribe(
    //     () => {
          
    //     },
    //     err => this.handleError(err));
  }

  handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = 'Login failed';
    }
    else {
      message = `Unexpected error: ${error.statusText}`;
    }

    const toast = this._toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}
