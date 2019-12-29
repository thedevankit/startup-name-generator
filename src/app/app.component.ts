import { Component } from '@angular/core'; 
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
}
