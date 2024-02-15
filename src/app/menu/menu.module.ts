import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [MenuComponent],
    imports: [MatSlideToggleModule, MatIcon, RouterLink, CommonModule],
    exports: [
        MenuComponent
    ],
})

export class MenuModule {}
