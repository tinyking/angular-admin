import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'comment',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [require('./comment.scss')],
  template: require('./comment.html'),
})
export class Comment implements OnInit {

  iframeSrc:any = '';
  iframeBaseSrc:any = 'https://surmon.duoshuo.com/admin/';
  constructor(private router: ActivatedRoute, private domSanitizer : DomSanitizer) {}

  ngOnInit() {
    this.router.data.subscribe(({ name: path }) => {
      if(path == 'manage') {
        this.iframeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(this.iframeBaseSrc);
      } else if(path == 'user') {
        this.iframeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl('https://duoshuo.com/settings/');
      } else {
        this.iframeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.iframeBaseSrc}${(path == 'preferences' ? 'settings' : path)}/`);
      }
    });
    
  }
}
