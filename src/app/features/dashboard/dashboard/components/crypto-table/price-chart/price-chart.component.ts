import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { CategoryScale, Chart, ChartConfiguration, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js';


Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-price-chart',
  imports: [
    CommonModule,
    
  ],
  templateUrl: './price-chart.component.html',
  styleUrl: './price-chart.component.css'
})
export class PriceChartComponent implements AfterViewInit, OnChanges {
   @Input() data: number[] = [];
  @Input() color: string = 'rgba(34,197,94,0.8)';

  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | null = null;

 ngAfterViewInit(): void {
  if (this.data && this.data.length > 0) {
    setTimeout(() => this.createChart(), 0); // ensures canvas is ready
  }
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['data'] && this.data && this.data.length > 0) {
    if (this.chart) {
      this.updateChart();
    } else if (this.canvas?.nativeElement) {
      // Delay chart creation until view is ready
      this.createChart();
    }
  }
}

  private createChart(): void {
    if (!this.canvas) return;

  this.chart = new Chart(this.canvas.nativeElement, {
    type: 'line',
    data: {
      labels: this.data.map((_, i) => i.toString()),
      datasets: [
        {
          data: this.data,
          borderColor: this.color,
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { display: false },
      },
    },
  });
}

  private updateChart(): void {
    if (this.chart) {
      this.chart.data.labels = this.data.map((_, i) => i.toString());
      this.chart.data.datasets[0].data = this.data;
      (this.chart.data.datasets[0] as any).borderColor = this.color;
      this.chart.update();
    }
  }
}