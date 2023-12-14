// Import necessary modules and components
import { Component, OnInit, OnDestroy } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { take } from 'rxjs';
import { APIService } from './api.service';
import { Page } from './page';
import { RecipeInfo } from './recipe-info';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [APIService],
  imports: [FormsModule, CommonModule, HttpClientModule],
  template: `
  <div id="container" style="padding: 20px; background-color: #f0f0f0;">
      <h1 style="color: #333;">Recipe Storage</h1>
      <div *ngIf="currentPage.items.length === 0; else recipeList" style="margin-top: 10px;">
        <p>No recipes available.</p>
      </div>
      <ng-template #recipeList>
        <div *ngFor="let recipe of currentPage.items" class="recipe-item" style="background-color: #fff; padding: 10px; margin: 10px 0;">
          <span>{{ recipe.name }}</span>
          <button (click)="renameRecipe(recipe.id, recipe.name)" style="margin-left: 10px; background-color: #4CAF50; color: white; border: none; padding: 5px 10px; cursor: pointer;">Rename</button>
        </div>
        <div *ngIf="currentPage.total > 1" style="margin-top: 10px;">
          <button (click)="loadPreviousPage()" [disabled]="currentPage.index === 0" style="background-color: #008CBA; color: white; border: none; padding: 5px 10px; cursor: pointer;">Previous</button>
          <span style="margin: 0 10px;">{{ currentPage.index + 1 }} / {{ currentPage.total }}</span>
          <button (click)="loadNextPage()" [disabled]="currentPage.index + 1 === currentPage.total" style="background-color: #008CBA; color: white; border: none; padding: 5px 10px; cursor: pointer;">Next</button>
        </div>
      </ng-template>
      <div class="recipe-form-container" style="margin-top: 20px;">
        <form (ngSubmit)="createRecipe()">
          <label for="recipe-name" style="margin-right: 10px;">Recipe Name:</label>
          <input type="text" id="recipe-name" required [(ngModel)]="newRecipeName" style="padding: 5px; border: 1px solid #ccc;">
          <button type="submit" style="background-color: #4CAF50; color: white; border: none; padding: 5px 10px; cursor: pointer;">Create Recipe</button>
        </form>
      </div>
    </div>
  `,
})
export class App implements OnInit, OnDestroy {
  currentPageIndex = 0;
  currentPage: Page<RecipeInfo> = { index: 0, total: 0, items: [] };
  newRecipeName: any;

  constructor(private apiService: APIService) {}

  ngOnInit(): void {
    this.getRecipePage();
  }

  ngOnDestroy(): void {}

  getRecipePage(): void {
    // Use the apiUrl variable instead of '<domain>/recipes'
    const apiUrl = '<dummy-api-url>';
    this.apiService
      .getRecipes(apiUrl, this.currentPageIndex)
      .then((page: Page<RecipeInfo>) => {
        this.currentPage = page;
      })
      .catch((err) => {
        console.log('error ', err);
      });
  }

  loadNextPage(): void {
    this.currentPageIndex++;
    this.getRecipePage();
  }

  loadPreviousPage(): void {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      this.getRecipePage();
    }
  }

  createRecipe(): void {
    if (this.newRecipeName.trim() !== '') {
      // Use the apiUrl variable instead of an empty string
      const apiUrl = '<dummy-api-url>';
      let create = this.apiService
        .createRecipe(apiUrl, { name: this.newRecipeName })
        .subscribe(
          (res: any) => {
            this.newRecipeName = '';
            this.getRecipePage();
          },
          (error) => {
            console.log('Error creating recipe:', error);
          }
        );
      create.unsubscribe();
    }
  }

  renameRecipe(recipeId: number, recipeName: string): void {
    if (recipeId && recipeName) {
      // Use the apiUrl variable instead of an empty string
      const apiUrl = '<dummy-api-url>';
      let rename = this.apiService
        .renameRecipe(apiUrl, recipeId, 'New Recipe Name')
        .pipe(take(1))
        .subscribe(
          (res) => {
            this.getRecipePage();
          },
          (error) => {
            console.log('Error renaming recipe:', error);
          }
        );
      rename.unsubscribe();
    }
  }
}
bootstrapApplication(App);
