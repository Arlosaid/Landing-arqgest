# Configuración de Emails Personalizados - ArqGest

## ✅ Estado Actual: CONFIGURADO

Los templates de email ya están configurados y funcionando. Solo necesitas hacer **push a GitHub** para que los cambios se reflejen en producción.

## Archivos de Email

| Archivo | Propósito | URL Pública |
|---------|-----------|-------------|
| `email-template.html` | Email que recibes tú cuando alguien contacta | `https://arqgest.com/email-template.html` |
| `autoresponse-template.html` | Email de confirmación que recibe el usuario | `https://arqgest.com/autoresponse-template.html` |
| `gracias.html` | Página de éxito después de enviar el formulario | `https://arqgest.com/gracias.html` |

## Configuración en index.html

```html
<input type="hidden" name="_template" value="https://arqgest.com/email-template.html">
<input type="hidden" name="_autoresponse" value="https://arqgest.com/autoresponse-template.html">
```

## Variables de FormSubmit

Los templates usan estas variables que FormSubmit reemplaza automáticamente:
- `{name}` - Nombre del contacto
- `{email}` - Email del contacto
- `{studio}` - Estudio/Empresa (si está presente)
- `{interest}` - Motivo de contacto
- `{message}` - Mensaje (si está presente)

## Eslogan

> "Simplifica tu arquitectura, potencia tu gestión"

## Para hacer cambios

1. Edita los archivos HTML correspondientes
2. Haz commit y push a GitHub
3. Los cambios se reflejarán automáticamente en los emails

