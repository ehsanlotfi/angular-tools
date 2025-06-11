###### .html 
```
<input #imageUploader type="file" (change)="onFileSelected($event)" accept="image/*" class="d-none">

<img src="{{ model.image || 'assets/img/no-img.jpg' }}" class="pointer"
  (click)="imageUploader.click()">
```

###### .ts
```
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const maxSizeInBytes = 100 * 1024; // 100 kb

    if (file.size <= maxSizeInBytes) {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        this.zaer.image = e.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      this.toastr.error("حجم تصویر حداکثر باید 100 کیلوبایت باشد");
    }
  }
```

###### .service
```
  upload(file: File)
    {
        const formData: FormData = new FormData();
        formData.append('file', file, FileName);
        return this.http.post(ROUTINGAPI.upload, formData)
    }
```
