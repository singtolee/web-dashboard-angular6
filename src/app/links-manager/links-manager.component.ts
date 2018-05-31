import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

interface TopLevelLink {
  title: string;
  url: string;
}
@Component({
  selector: 'app-links-manager',
  templateUrl: './links-manager.component.html',
  styleUrls: ['./links-manager.component.css']
})
export class LinksManagerComponent implements OnInit {

  topLevelLinks: Observable<TopLevelLink[]>;
  private topLevelLinksCol: AngularFirestoreCollection<TopLevelLink>;
  private topLevelLinksTitle: string = "";
  private topLevelLinksUrl: string = "";

  constructor(private db: AngularFirestore) {
    this.topLevelLinksCol = db.collection<TopLevelLink>('TOP-LINKS');
    this.topLevelLinks = this.topLevelLinksCol.valueChanges();
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    if (formData.valid) {
      const data: TopLevelLink = {
        title: formData.value.topLevelLinksTitle,
        url: formData.value.topLevelLinksUrl
      }
      this.db.collection('TOP-LINKS').add(data).then((success) => {
        this.topLevelLinksTitle = '';
        this.topLevelLinksUrl = '';
      })
    }
  }

}
