import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { BlogDetailComponent } from './page/blog-detail/blog-detail.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { CreateBlogComponent } from './page/create-blog/create-blog.component';
import { authGuard } from './shared/auth.guard';
import { MyBlogsComponent } from './page/my-blogs/my-blogs.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'blog-detail/:blogId', component:BlogDetailComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user/create-blog', component: CreateBlogComponent, canActivate: [authGuard]},
    {path: 'user/my-posts', component: MyBlogsComponent}
];
