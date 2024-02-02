import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@NgModule({
    declarations: [MenuComponent],
    imports: [MatSlideToggleModule, MatIcon, RouterLink],
    providers: [],
    exports: [
        MenuComponent
    ],
})

export class MenuModule {}
