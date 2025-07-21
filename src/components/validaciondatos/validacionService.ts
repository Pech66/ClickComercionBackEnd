import { Injectable } from "@nestjs/common";


@Injectable()
export class ValidacionService {

    //Metodo para valida la contraseña
    validatePassword(contrasena: string): boolean {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(contrasena);
        const hasLowerCase = /[a-z]/.test(contrasena);
        const hasNumbers = /\d/.test(contrasena);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(contrasena);

        if (contrasena.trim() === '') {
            throw new Error("La contraseña no puede estar vacía.");
        }
        if (contrasena.length < minLength) {
            throw new Error(`La contraseña debe tener al menos ${minLength} caracteres.`);
        }
        if (!hasUpperCase) {
            throw new Error("La contraseña debe contener al menos una letra mayúscula.");
        }
        if (!hasLowerCase) {
            throw new Error("La contraseña debe contener al menos una letra minúscula.");
        }
        if (!hasNumbers) {
            throw new Error("La contraseña debe contener al menos un número.");
        }
        if (!hasSpecialChars) {
            throw new Error("La contraseña debe contener al menos un carácter especial.");
        }

        return true;
    }

    //Metodo para validar formato del email 
    validateEmailFormat(email: string): boolean {
        const emailContext = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.trim() == '') {
            throw new Error("El email no puede estar vacío.");
        }

        if (!emailContext.test(email)) {
            throw new Error("El formato del email es incorrecto.");
        }
        return true;
    }

    //Metodo para validar el nombre de usuario
    validateNombreUsuario(nombre: string) {
        const nombreLimpio = nombre.trim();
        const nombreContexto = /^[a-zA-Z-ZáéíóúÁÉÍÓÚñÑ ]+$/;

        if (typeof nombreLimpio !== 'string' || nombreLimpio === '') {
            throw new Error('El nombre de usuario no es válido.');
        }
        if (!nombreContexto.test(nombre)) {
            throw new Error('El nombre de usuario solo puede contener letras.');
        }
        return true;
    }

    //Metodo para validar el formato del imagen y tamaño
    validateImageFormatoTamaño(imagen: Express.Multer.File): boolean {
        const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (!allowedFormats.includes(imagen.mimetype)) {
            throw new Error("El formato de la imagen no es válido. Debe ser JPEG,PNG,JPG O WEBP.");
        }

        if (imagen.size > maxSize) {
            throw new Error("La imagen excede el tamaño máximo permitido de 5 MB.");
        }

        return true;
    }

    validatePrecio(precio: number): boolean {
        if (typeof precio !== 'number' || isNaN(precio)) {
            throw new Error('El precio no es válido.');
        }
        if (precio < 0) {
            throw new Error('El precio no puede ser negativo.');
        }
        if (!Number.isFinite(precio) || precio > 1000000) {
            throw new Error('El precio es demasiado alto.');
        }
        // Validar que tenga máximo dos decimales
        if (!/^\d+(\.\d{1})?$/.test(precio.toString())) {
            throw new Error('El precio debe tener máximo dos decimales.');
        }
        return true;
    }

    validateNombre(nombre: string): boolean {
        const nombreContexto = /^[a-zA-Z\s]+$/;
        if (typeof nombre !== 'string' || nombre.trim() === '') {
            throw new Error('El nombre no es válido.');
        }
        if (nombre.length < 3 || nombre.length > 15) {
            throw new Error('El nombre debe tener entre 3 min y 15 max.');
        }
        return true;
    }

    validateDescripcion(descripcion: string): boolean {

        if (descripcion.length < 10 || descripcion.length > 200) {
            throw new Error('La descripción debe tener entre 10 min y 200 max.');
        }
        return true;
    }

    validateNumeroTelefono(telefono: string): boolean {
        const telefonoContexto = /^\d{10}$/;
        if (typeof telefono !== 'string' || telefono.trim() === '') {
            throw new Error('El número de teléfono no es válido.');
        }
        if (!telefonoContexto.test(telefono)) {
            throw new Error('El número de teléfono debe tener exactamente 10 dígitos.');
        }
        return true;
    }

    validateCodigoBarra(codigoBarra: string): boolean {
        const codigoBarraContexto = /^[0-9A-Za-z]$/; // 12 o 13 dígitos
        if (typeof codigoBarra !== 'string' || codigoBarra.trim() === '') {
            throw new Error('El código de barras no es válido.');
        }

        return true;
    }

}