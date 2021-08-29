import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipe() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put(
            'https://ng-complete-guide-154b0-default-rtdb.firebaseio.com/recipes.json',
            recipes
        )
            .subscribe(recipes => {
                console.log(recipes);
            });
    }

    fetchRecipe() {
        return this.http.get<Recipe[]>(
            'https://ng-complete-guide-154b0-default-rtdb.firebaseio.com/recipes.json'
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );       
    }
}