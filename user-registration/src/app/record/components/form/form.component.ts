import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  private recordService = inject(RecordService);
  fb = inject(FormBuilder);
  showImageField = false;

  selectedFile: File | null = null;

  showAlert = false;
  isLoading = false;
  alert = {
  type: '',
  message: ''
};

  // Methods to easily access controls in the template
  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get message() { return this.form.get('message'); }
  get receiptType() { return this.form.get('receiptType'); }
  get payMethod() { return this.form.get('payMethod'); }
  get image() { return this.form.get('image'); }

  form = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    ]],
    email: ['', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ]],
    message: ['', [
      Validators.required,
      Validators.minLength(10)
    ]],
    receiptType: ['', Validators.required],
    payMethod: ['', Validators.required],
  });

  constructor() {
    // Watch for changes in the payment method
    this.form.get('payMethod')?.valueChanges.subscribe(method => {
      this.showImageField = method === 'Transferencia';
      const imageControl = this.form.get('image');
      
      if (this.showImageField) {
        imageControl?.setValidators([Validators.required]);
      } else {
        imageControl?.clearValidators();
      }
      imageControl?.updateValueAndValidity();
    });
  }

  HandleSubmit() {
    // Verify if the form is valid
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
   // File validation 
   if (this.form.value.payMethod === 'Transferencia') {
    if (!this.selectedFile || !this.validateFile(this.selectedFile)) {
      return;
    }
  }
  
  // Crear FormData para enviar datos + archivo
  const formData = new FormData();

  // Create FormData to send data + file
  formData.append('nombre', this.form.value.name || '');
  formData.append('email', this.form.value.email || '');
  formData.append('mensaje', this.form.value.message || '');
  formData.append('tipo_comprobante', this.form.value.receiptType || '');
  formData.append('metodo_pago', this.form.value.payMethod || '');

    // Attach the file from selectedFile
    if (this.form.value.payMethod === 'Transferencia' && this.selectedFile) {
      formData.append('comprobante_pago', this.selectedFile);
    }
  
    this.isLoading = true;
  
    this.recordService.createRecord(formData).subscribe({
      next: (data: any) => {
        console.log('Registro exitoso', data);
        this.showAlert = true;
        this.alert = {
          type: 'success',
          message: 'Registro creado exitosamente!'
        };
  
        // Reset the form after 2 seconds
        setTimeout(() => {
          this.showAlert = false;
          this.form.reset();
          this.isLoading = false;
        }, 2000);
      },
      error: (error: any) => {
        console.error('Error al registrar', error);
        this.showAlert = true;
        this.alert = {
          type: 'error',
          message: 'Error al crear el registro. Por favor verifica los datos e intenta nuevamente.'
        };
  
        setTimeout(() => {
          this.showAlert = false;
          this.isLoading = false;
        }, 3000);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file; // Save the file here, not in the FormGroup
  }
  
  private validateFile(file: any): boolean {
    if (!file) return false;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      this.alert = {
        type: 'error',
        message: 'Formato de archivo no válido. Solo JPG, PNG o PDF.'
      };
      this.showAlert = true;
      setTimeout(() => this.showAlert = false, 3000);
      return false;
    }
    
    // Validate size (maximum 2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      this.alert = {
        type: 'error',
        message: 'El archivo es demasiado grande. Máximo 2MB.'
      };
      this.showAlert = true;
      setTimeout(() => this.showAlert = false, 3000);
      return false;
    }
    
    return true;
  }
}