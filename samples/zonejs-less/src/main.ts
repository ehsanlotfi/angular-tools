import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, Component, inject, signal, computed } from '@angular/core';
import { RouterModule, provideRouter, Routes, Router } from '@angular/router';

const userSignal = signal<string | null>(null);
const tasksSignal = signal<{ id: number; title: string; done: boolean }[]>([]);

// 🔐 Login Component
@Component({
  selector: 'app-login',
  imports: [RouterModule],
  template: `
    <form (ngSubmit)="login()">
      <input #userRef [value]="user()" (input)="user.set(userRef.value)" name="username" placeholder="Username" required>
      <input #passRef [value]="pass()" (input)="pass.set(passRef.value)" name="password" type="password" placeholder="Password" required>
      <button>Login</button>
    </form>
    @if(error()) {  <p style="color:red">Error happend !</p> }
  `,
})
export class LoginComponent {
  user = signal<string>('');
  pass = signal<string>('');

  error = signal<boolean>(false);

  router = inject(Router);

  login() {
    if (this.user() === 'admin' && this.pass() === '1234') {
      userSignal.set(this.user());
      this.router.navigateByUrl('/tasks');
    } else {
      this.error.set(true);
    }
  }
}

// ✅ Task List Component
@Component({
  selector: 'app-task-list',
  standalone: true,
  template: `
    <h2>Task Manager</h2>
    <p>Welcome, {{ user }}</p>
    <input placeholder="New task">
    <button (click)="add()">Add</button>
    <ul>
    @for(task of tasks(); track $index) {
    <li>
        <input type="checkbox" [checked]="task.done" (change)="toggle(task.id)">
        {{ task.title }}
        <button (click)="remove(task.id)">❌</button>
      </li>
    }
    </ul>
    <button (click)="logout()">Logout</button>
  `,
})
export class TaskListComponent {
  user = userSignal();
  newTask = '';
  tasks = computed(() => tasksSignal());
  router = inject(Router);

  add() {
    if (this.newTask.trim()) {
      tasksSignal.update((list) => [
        ...list,
        { id: Date.now(), title: this.newTask, done: false },
      ]);
      this.newTask = '';
    }
  }

  remove(id: number) {
    tasksSignal.update((list) => list.filter((t) => t.id !== id));
  }

  toggle(id: number) {
    tasksSignal.update((list) =>
      list.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  logout() {
    userSignal.set(null);
    this.router.navigateByUrl('/login');
  }
}


@Component({
  selector: 'app-root',
  imports: [RouterModule],
  template: '<router-outlet></router-outlet>'
})
export class App { }

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));



