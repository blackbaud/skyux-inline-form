import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkyInlineFormDemoComponent } from './visual/inline-form/inline-form-demo.component';
import { VisualComponent } from './visual/visual.component';

const routes: Routes = [
  {
    path: '',
    component: VisualComponent,
  },
  {
    path: 'visual/inline-form',
    component: SkyInlineFormDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
