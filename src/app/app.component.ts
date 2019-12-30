import { Component, HostListener } from '@angular/core'; 
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
declare function StartupNameGenerator(name):  any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public regForm: FormGroup;
  public keyWords: FormControl;
  public result = [];
  public Key;
  public errormsg = false;
  public count;
  public deferredPrompt: any;
  public showButton = false;

  constructor(private formBuilder:FormBuilder) {
  }

  ngOnInit(): void{
    this.keyWords=new FormControl('',[Validators.required]);

    this.regForm=this.formBuilder.group({
      keyWords:this.keyWords
    });
  }

  OnKey(event){
    this.errormsg = false;
  }

  onSubmit(){
    this.Key = this.regForm.get('keyWords').value;
    console.log(this.Key);

    if (this.Key === "") {
      this.errormsg = true;
    }
    else{
      this.result = StartupNameGenerator(this.Key);
      this.count = this.result.length;
    }
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    console.log(' function prompt');

    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  addToHomeScreen() {
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }
}
