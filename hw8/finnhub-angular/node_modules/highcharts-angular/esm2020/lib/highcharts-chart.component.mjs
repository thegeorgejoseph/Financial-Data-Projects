import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
export class HighchartsChartComponent {
    constructor(el, _zone // #75
    ) {
        this.el = el;
        this._zone = _zone;
        this.updateChange = new EventEmitter(true);
        this.chartInstance = new EventEmitter(); // #26
    }
    ngOnChanges(changes) {
        const update = changes.update && changes.update.currentValue;
        if (changes.options || update) {
            this.wrappedUpdateOrCreateChart();
            if (update) {
                this.updateChange.emit(false); // clear the flag after update
            }
        }
    }
    wrappedUpdateOrCreateChart() {
        if (this.runOutsideAngular) {
            this._zone.runOutsideAngular(() => {
                this.updateOrCreateChart();
            });
        }
        else {
            this.updateOrCreateChart();
        }
    }
    updateOrCreateChart() {
        if (this.chart && this.chart.update) {
            this.chart.update(this.options, true, this.oneToOne || false);
        }
        else {
            this.chart = this.Highcharts[this.constructorType || 'chart'](this.el.nativeElement, this.options, this.callbackFunction || null);
            // emit chart instance on init
            this.chartInstance.emit(this.chart);
        }
    }
    ngOnDestroy() {
        if (this.chart) { // #56
            this.chart.destroy();
            this.chart = null;
        }
    }
}
HighchartsChartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: HighchartsChartComponent, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
HighchartsChartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.2", type: HighchartsChartComponent, selector: "highcharts-chart", inputs: { Highcharts: "Highcharts", constructorType: "constructorType", callbackFunction: "callbackFunction", oneToOne: "oneToOne", runOutsideAngular: "runOutsideAngular", options: "options", update: "update" }, outputs: { updateChange: "updateChange", chartInstance: "chartInstance" }, usesOnChanges: true, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: HighchartsChartComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'highcharts-chart',
                    template: ''
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { Highcharts: [{
                type: Input
            }], constructorType: [{
                type: Input
            }], callbackFunction: [{
                type: Input
            }], oneToOne: [{
                type: Input
            }], runOutsideAngular: [{
                type: Input
            }], options: [{
                type: Input
            }], update: [{
                type: Input
            }], updateChange: [{
                type: Output
            }], chartInstance: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGNoYXJ0cy1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9oaWdoY2hhcnRzLWFuZ3VsYXIvc3JjL2xpYi9oaWdoY2hhcnRzLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFvQyxNQUFNLGVBQWUsQ0FBQzs7QUFPaEksTUFBTSxPQUFPLHdCQUF3QjtJQWNuQyxZQUNVLEVBQWMsRUFDZCxLQUFhLENBQUMsTUFBTTs7UUFEcEIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQVE7UUFQYixpQkFBWSxHQUFHLElBQUksWUFBWSxDQUFVLElBQUksQ0FBQyxDQUFDO1FBQy9DLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUMsQ0FBQyxNQUFNO0lBT25FLENBQUM7SUFFSixXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUM3RCxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksTUFBTSxFQUFFO1lBQzdCLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1lBQ2xDLElBQUksTUFBTSxFQUFFO2dCQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsOEJBQThCO2FBQzlEO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsMEJBQTBCO1FBQ3hCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtZQUM1QixDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLENBQUM7U0FDL0Q7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLEdBQUksSUFBSSxDQUFDLFVBQWtCLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxPQUFPLENBQUMsQ0FDcEUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQ3JCLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FDOUIsQ0FBQztZQUVGLDhCQUE4QjtZQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFHLE1BQU07WUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNuQjtJQUNILENBQUM7O3FIQTNEVSx3QkFBd0I7eUdBQXhCLHdCQUF3Qiw0V0FGekIsRUFBRTsyRkFFRCx3QkFBd0I7a0JBSnBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7c0hBRVUsVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUVJLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIE5nWm9uZSwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSAqIGFzIEhpZ2hjaGFydHMgZnJvbSAnaGlnaGNoYXJ0cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hpZ2hjaGFydHMtY2hhcnQnLFxuICB0ZW1wbGF0ZTogJydcbn0pXG5leHBvcnQgY2xhc3MgSGlnaGNoYXJ0c0NoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBIaWdoY2hhcnRzOiB0eXBlb2YgSGlnaGNoYXJ0cztcbiAgQElucHV0KCkgY29uc3RydWN0b3JUeXBlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNhbGxiYWNrRnVuY3Rpb246IEhpZ2hjaGFydHMuQ2hhcnRDYWxsYmFja0Z1bmN0aW9uO1xuICBASW5wdXQoKSBvbmVUb09uZTogYm9vbGVhbjsgLy8gIzIwXG4gIEBJbnB1dCgpIHJ1bk91dHNpZGVBbmd1bGFyOiBib29sZWFuOyAvLyAjNzVcbiAgQElucHV0KCkgb3B0aW9uczogSGlnaGNoYXJ0cy5PcHRpb25zO1xuICBASW5wdXQoKSB1cGRhdGU6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIHVwZGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4odHJ1ZSk7XG4gIEBPdXRwdXQoKSBjaGFydEluc3RhbmNlID0gbmV3IEV2ZW50RW1pdHRlcjxIaWdoY2hhcnRzLkNoYXJ0PigpOyAvLyAjMjZcblxuICBwcml2YXRlIGNoYXJ0OiBIaWdoY2hhcnRzLkNoYXJ0O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfem9uZTogTmdab25lIC8vICM3NVxuICApIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHVwZGF0ZSA9IGNoYW5nZXMudXBkYXRlICYmIGNoYW5nZXMudXBkYXRlLmN1cnJlbnRWYWx1ZTtcbiAgICBpZiAoY2hhbmdlcy5vcHRpb25zIHx8IHVwZGF0ZSkge1xuICAgICAgdGhpcy53cmFwcGVkVXBkYXRlT3JDcmVhdGVDaGFydCgpO1xuICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNoYW5nZS5lbWl0KGZhbHNlKTsgLy8gY2xlYXIgdGhlIGZsYWcgYWZ0ZXIgdXBkYXRlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd3JhcHBlZFVwZGF0ZU9yQ3JlYXRlQ2hhcnQoKSB7IC8vICM3NVxuICAgIGlmICh0aGlzLnJ1bk91dHNpZGVBbmd1bGFyKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVPckNyZWF0ZUNoYXJ0KClcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZU9yQ3JlYXRlQ2hhcnQoKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVPckNyZWF0ZUNoYXJ0KCkge1xuICAgIGlmICh0aGlzLmNoYXJ0ICYmIHRoaXMuY2hhcnQudXBkYXRlKSB7XG4gICAgICB0aGlzLmNoYXJ0LnVwZGF0ZSh0aGlzLm9wdGlvbnMsIHRydWUsIHRoaXMub25lVG9PbmUgfHwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoYXJ0ID0gKHRoaXMuSGlnaGNoYXJ0cyBhcyBhbnkpW3RoaXMuY29uc3RydWN0b3JUeXBlIHx8ICdjaGFydCddKFxuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIHRoaXMub3B0aW9ucyxcbiAgICAgICAgdGhpcy5jYWxsYmFja0Z1bmN0aW9uIHx8IG51bGxcbiAgICAgICk7XG5cbiAgICAgIC8vIGVtaXQgY2hhcnQgaW5zdGFuY2Ugb24gaW5pdFxuICAgICAgdGhpcy5jaGFydEluc3RhbmNlLmVtaXQodGhpcy5jaGFydCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7IC8vICM0NFxuICAgIGlmICh0aGlzLmNoYXJ0KSB7ICAvLyAjNTZcbiAgICAgIHRoaXMuY2hhcnQuZGVzdHJveSgpO1xuICAgICAgdGhpcy5jaGFydCA9IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=