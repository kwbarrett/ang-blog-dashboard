import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Post } from 'src/app/models/post';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{

  permalink: string = '';
  imgSrc: any = 'http://via.placeholder.com/640x360';
  selectedImage: any;
  categories: Array<Category> = [];
  postForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ){
    this.postForm = this.fb.group({
      title: ['',[ Validators.required, Validators.minLength(10) ]],
      permalink: ['', Validators.required ],
      excerpt: ['', [ Validators.required, Validators.minLength(50) ]],
      category: ['', Validators.required ],
      postImg: ['', Validators.required],
      content: ['', Validators.required ]
    })

    // this.postForm.controls['permalink'].disable();
  }

  ngOnInit(): void {
    this.categoryService.getAll()
      .subscribe( val =>{
        this.categories = val;
      })
  }

  get fc(){
    return this.postForm.controls
  }

  onTitleChanged( $event: any ){
    const title = $event.target.value;
    this.permalink = title.replace( /\s/g, '-' );

  }

  showPreview( $event: any ){
    const reader = new FileReader();
    reader.onload = ( e ) => {
      this.imgSrc = e.target?.result;
    }

    reader.readAsDataURL( $event?.target.files[0] );
    this.selectedImage = $event.target.files[0];
  }

  onSubmit(){
    console.log( this.postForm.value );

    let splitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        id: splitted[0],
        category: splitted[1]
      },
      excerpt: this.postForm.value.excerpt,
      postImgPath: '',
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    console.log( postData );
  }

}
