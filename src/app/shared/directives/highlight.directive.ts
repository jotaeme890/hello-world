import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighlightDirective {
  constructor(private el:ElementRef) {
    this.unsetHighlight();
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.setHighlight();
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.unsetHighlight();
  }

  private setHighlight(){
    this.el.nativeElement.classList.add('highlight');
  }
  private unsetHighlight(){
    this.el.nativeElement.classList.remove('highlight');
  }
}