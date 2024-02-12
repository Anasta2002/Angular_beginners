import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {CartService} from "../services/cart.service";
import {MatBadge} from "@angular/material/badge";

@NgModule({
    declarations: [MenuComponent],
  imports: [MatSlideToggleModule, MatIcon, RouterLink, CommonModule, MatBadge],
    providers: [CartService],
    exports: [
        MenuComponent
    ],
})

export class MenuModule {}
