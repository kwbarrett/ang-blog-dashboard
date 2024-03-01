import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  formStatus: string = 'Add';
  categories? : Category[];
  formCategory?: string;
  categoryid?: string
  currentCategory: Category = {
    category: ''
  };
  message = '';

  submitted = false;

  constructor( private categoryService: CategoryService ){}

  ngOnInit(): void {
    this.retrieveCategories();
  }

  retrieveCategories(): void{
    this.categoryService.getAll()
    .subscribe({
      next: (data) => {
        this.categories = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  onSubmit( formData: any ): void{
    console.log( formData.value.category );

    if( this.formStatus == "Add" ){
      let categoryData : Category = {
        category : formData.value.category
      }
      this.categoryService.create( categoryData )
        .subscribe({
          next: ( res ) => {
            console.log( res );
            this.submitted = true;
            formData.reset();
            this.refreshList()
        },
        error: (e) => console.error(e)
      });
      console.log( this.formStatus );
    }else if( this.formStatus == 'Edit' ){
      this.currentCategory.category = formData.value.category;
      this.updateCategory();
      this.formStatus = 'Add';
      formData.reset();
    }

  }

  onEdit( category: any, id: any ){
    this.formCategory = category;
    this.formStatus = 'Edit';
    // this.categoryid = id;
    this.currentCategory.category = category;
    this.currentCategory.id = id;
    // console.log( this.formStatus );
  }

  updateCategory(): void {
    this.message = '';
    console.log( this.currentCategory );
    this.categoryService.update(this.currentCategory.id, this.currentCategory)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.message = res.message ? res.message : 'This category was updated successfully!';
          // this.refreshList()
        },
        error: (e) => console.error(e)
      });
  }

  retrieveCategory( id: string ) {
    this.categoryService.get( id )
      .subscribe({
        next: ( data ) =>{
          this.currentCategory = data;
          console.log( data );
        },
        error: (e) => console.error(e)
      });
  }

  getCategory( id: string ){
    this.categoryService.get( id )
      .subscribe({
        next: ( data ) => {
          this.currentCategory = data;
          console.log( data );
        },
        error: (e) => console.error( e )
      });
  }

  refreshList(): void {
    this.retrieveCategories();
  }

}
