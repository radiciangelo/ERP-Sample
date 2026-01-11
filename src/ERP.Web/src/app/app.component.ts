import { Component, OnInit } from '@angular/core';
import { TranslateDirective, TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ERP';
  isLoaderVisible = false;

  constructor(
    private loaderService: LoaderService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      this.translate.use(storedLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      const defaultLang = browserLang?.match(/en|it/) ? browserLang : 'it';
      this.translate.use(defaultLang);
      localStorage.setItem('language', defaultLang);
    }
    this.loaderService.loader.subscribe({
      next: (value) => {
        this.isLoaderVisible = value
      }
    });
  }

}
