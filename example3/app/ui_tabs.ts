import {Component, Directive, Input, QueryList,
        ViewContainerRef, TemplateRef, ContentChildren} from 'angular2/core';
//aun se ignora que hace esta linea
@Directive({
  selector: '[ui-pane]'
})
export class UiPane
{
  //el que importe este objeto podra setear la propiedad title de tipo string
  @Input() title: string;
  private _active:boolean = false;

  //constructor con parametros tipeados viewContainer y templateRef
  //al llamar al constructor , se inyectan las propiedades en el objeto actual
  constructor(public viewContainer: ViewContainerRef,
              public templateRef: TemplateRef) { }

  // servicio para que el que importe, pueda cambiar el estatus de este objeto
  @Input() set active(active: boolean)
  {
    if (active == this._active)
      return;
    this._active = active;

    //aqui se crea y se muestra una vista, con el templateRef
    if (active)
      this.viewContainer.createEmbeddedView(this.templateRef);
    else //aqui removemos la vista creada
      this.viewContainer.remove(0);

  }
  // servicio para que el que importe, pueda obtener el estatus de este objeto
  get active(): boolean
  {
    return this._active;
  }
}
@Component(
{
  //<ng-content></ng-content> que pinche poderoso esta esto, es una inyecion de html, entre
  //el html contenido cuando se utilice el selector de un componente, y la seccion ng-content en el
  //template del componente
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