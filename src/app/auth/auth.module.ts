import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [AuthComponent],
    imports: [
        RouterModule.forChild([
            { path: '', component: AuthComponent },
        ]),
        FormsModule,
        CommonModule,
        SharedModule
    ]
})
export class AuthModule { }