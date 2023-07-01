import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentDate: string | null = '';
  private timerSubscription!: Subscription;

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.currentDate = this.datePipe.transform(
        new Date(),
        'EEEE, MMMM dd, yyyy HH:mm:ss'
      );
    });
  }

  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }
}
