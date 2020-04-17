import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public imagePath;
  showSpinner=false
  title = 'frontend';
  value=''
  url:any
  is_disabled=true
  selectedFile: File = null;
  tag_results=null;
  pbts=[];
  show=false
  display_image='some_trinf'

  classes=['Atelectasis',
  'Cardiomegaly',
  'Pulmonary consolidation',
  'COVID-19',
  'Edema',
  'Effusion',
  'Emphysema',
  'Fibrosis',
  'Hernia',
  'Infiltration',
  'Mass',
  'No finding',
  'Nodule',
  'Pleural thickening',
  'Pneumonia',
  'Pneumothorax']
  constructor(private httpClient: HttpClient) {
    
  }
  clear(){
    this.show=false
    
  }
  on_file_select(event){
    
    this.show=false
    this.pbts=null
    this.tag_results=null
    this.selectedFile=<File>event.target.files[0]
    console.log(event.target.value)
    console.log(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.url = reader.result;

      reader.readAsDataURL(file);
      this.is_disabled=false
      
  }
  
}
 
 
upload(){
  this.show=false
  this.showSpinner=true
  const fd=new FormData()
  fd.append('file',this.selectedFile,this.selectedFile.name)
  console.log(fd)
  this.httpClient.post('http://127.0.0.1:5000/', fd)
      .subscribe(res => {
        // res1.tag = 'modified'
        this.showSpinner=false
        this.tag_results=res
        this.display_image=res["gradcam_result"]
        this.pbts=res['probs']
        this.show=true
        console.log(this.display_image)
        // alert('SUCCESS !!');
      })

   

}

}
