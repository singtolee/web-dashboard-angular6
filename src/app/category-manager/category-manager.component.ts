import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

interface Category {
  title: string;
  keyWord:string;
  imgUrl:string;
}

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  downloadURL: Observable<string>;
  isHovering: boolean;

  dir = "CATEGORIES";

  categories: Observable<Category[]>;
  private categoriesCol: AngularFirestoreCollection<Category>;
  private categoryTitle: string = "";
  private keyWord:string = "";
  private imgUrl: string = "";

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.categoriesCol = db.collection<Category>(this.dir);
    this.categories = this.categoriesCol.valueChanges();
  }

  toggleHover(event:boolean){
    this.isHovering = event;
  }

  startUpload(event:FileList){
    const file = event.item(0)
    if(file.type.split('/')[0] !== 'image'){
      return
    }

    const path = `CATEGORY-IMG/${new Date().getTime()}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path,file);
    this.percentage = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(()=>this.downloadURL = ref.getDownloadURL())
    ).subscribe();
  }

  isActive(snapshot){
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  onSubmit(formData) {
    if (formData.valid) {
      const data: Category = {
        title: formData.value.categoryTitle,
        keyWord: formData.value.keyWord,
        imgUrl: this.imgUrl,
      }
      this.db.collection(this.dir).add(data).then((success) => {
        this.categoryTitle = '';
        this.keyWord = '';
        this.imgUrl = '';
      })
    }
  }

  ngOnInit() {
  }

}
