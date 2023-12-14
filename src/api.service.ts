// Use the correct import for HttpClient and necessary modules
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Page } from './page';
import { RecipeInfo } from './recipe-info';

@Injectable()
export class APIService {
  constructor(private http: HttpClient) {}

  getRecipes(apiUrl: string, index: number): Promise<Page<RecipeInfo>> {
    console.log('API Request:', apiUrl);

    return new Promise((resolve) => {
      const recipes: Array<RecipeInfo> = [
        {
          id: 1,
          name: 'Pepperoni Pizza',
          creator: 'user@recipes.com',
        },
        {
          id: 2,
          name: 'Pasta Bolognese',
          creator: 'user@recipes.com',
        },
        {
          id: 3,
          name: 'Strawberry Cheesecake',
          creator: 'user@recipes.com',
        },
        {
          id: 4,
          name: 'Chocolate Chip Cookies',
          creator: 'user@recipes.com',
        },
      ];

      resolve({
        index: index,
        total: 50,
        items: recipes,
      });
    });
  }

  createRecipe(apiUrl: string, recipe: { name: string }): Observable<void> {
    // Use the correct URL for your API endpoint
    const url = `${apiUrl}/recipes/new`;

    return this.http.post<void>(url, recipe).pipe(
      catchError((error) => {
        console.log('Some error occurred', error);
        throw error;
      })
    );
  }

  renameRecipe(
    apiUrl: string,
    recipeId: number,
    newName: string
  ): Observable<void> {
    // Use the correct URL for your API endpoint
    const url = `${apiUrl}/recipes/${recipeId}/rename`;

    return this.http.put<void>(url, { newName }).pipe(
      catchError((error) => {
        console.log('Some error occurred', error);
        throw error;
      })
    );
  }
}
