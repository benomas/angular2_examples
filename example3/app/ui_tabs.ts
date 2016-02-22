import {Component, Directive, Input, QueryList,
        ViewContainerRef, TemplateRef, ContentChildren} from 'angular2/core';
@Directive({
  selector: '[ui-pane]'
})
export class UiPane
{
  //el objeto que me importe podra setear la propiedad title de tipo string
  @Input() title: string;
  private _active:boolean = false;

  //por analizar
  constructor(public viewContainer: ViewContainerRef,
              public templateRef: TemplateRef) { }
  // servicio para que el objeto que me importe, pueda cambiar mi estatus
  @Input() set active(active: boolean)
  {
    if (active == this._active)
      return;
    this._active = active;

    if (active)
      this.viewContainer.createEmbeddedView(this.templateRef);
    else
      this.viewContainer.remove(0);

  }
  //servicio para que el objeto que me importe pueda obtener mi estatus
  get active(): boolean
  {
    return this._active;
  }
}
@Component(
{
  selector: 'ui-tabs',
  template: `
    <ul class="nav nav-tabs">
      <li *ngFor="var pane of panes"
          (click)="select(pane)"
          role="presentation" [class.active]="pane.active">
        <a>{{pane.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
    `,
    styles:['a { cursor: pointer; cursor: hand; }']
})
export class UiTabs
{
  //por analizar
  @ContentChildren(UiPane) panes: QueryList<UiPane>;
  select(pane: UiPane) {
    this.panes.toArray().forEach((p: UiPane) => p.active = p == pane);
  }
}