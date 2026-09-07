# 🚀 Guía Completa de Configuración y Automatización: Obsidian + Astro

Este documento sirve como ayuda memoria de toda nuestra charla para configurar Obsidian como tu entorno profesional de redacción de artículos y sincronizarlo automáticamente con tu blog de Astro en Windows.

---

## 📋 1. La Plantilla Definitiva para Astro
Copiá este código dentro de tu nota de plantilla en Obsidian (por ejemplo, en un archivo llamado `Plantilla de Artículo.md`). 

```markdown
---
title: "{{title}}"
excerpt: ""
type: "article"
pubDate: {{date}}
author: "Tu Nombre"
tags: []
cover: "/images/posts/{{title}}-cover.jpg"
popular: true
---

# {{title}}

Comenzá a escribir tu artículo en Markdown acá...
```

### ⚙️ Ajustes Clave en Obsidian para la Plantilla:
1. **Formato de Fecha:** Ve a `Configuración > Templates (Plantillas) > Date format` y escribe exactamente `YYYY-MM-DD`. Astro necesita este formato estándar para procesar las fechas sin errores de compilación (`new Date(pubDate)`).
2. **Propiedades Visuales (Hacer clics en vez de código):** Al crear una nota con esta plantilla, verás la sección **Propiedades (Properties)** arriba de todo. Haz clic en el icono a la izquierda de cada propiedad para asignar su comportamiento:
   * **`tags`**: Cambialo a tipo **Lista (List)** o **Etiquetas (Tags)** para añadir palabras con un Enter.
   * **`popular`**: Cambialo a tipo **Casilla de verificación (Checkbox)** para activar/desactivar con un clic (`true`/`false`).
   * **`pubDate`**: Cambialo a tipo **Fecha (Date)** para abrir un selector de calendario visual.
   * **`excerpt`** y **`author`**: Déjalos como tipo **Texto (Text)**.

---

## 📁 2. Gestión Automática de Imágenes y Archivos
Para mantener tu espacio limpio y que el script funcione sin problemas, organiza tu bóveda (Vault) de Obsidian con estas dos carpetas en la raíz:
* `articulos-blog`: Carpeta donde escribirás tus posts Markdown.
* `imagenes-blog`: Carpeta donde se guardarán tus imágenes automáticamente al arrastrarlas.

### Activar guardado automático de archivos adjuntos:
1. Ve a `Configuración > Archivos y enlaces (Files and links)`.
2. Busca la opción **Ubicación predeterminada para nuevos archivos adjuntos**.
3. Cámbiala a: **En la carpeta especificada a continuación**.
4. En el campo inferior, selecciona la carpeta `imagenes-blog`.

*De esta forma, cuando arrastres cualquier foto dentro de tu nota, el archivo físico se moverá solo allí, y en Astro la propiedad `cover: "/images/posts/tu-imagen.jpg"` apuntará correctamente a tu directorio público.*

---

## ⚡ 3. Script de Sincronización Automatizada para Windows (`copiar_a_astro.bat`)

Para pasar tus artículos e imágenes a tu proyecto de Astro con **un solo doble clic**, usaremos un script de procesamiento por lotes de Windows.

### Instrucciones de creación:
1. Abre el **Bloc de notas** de Windows.
2. Copia y pega el código que está acá abajo.
3. Modifica las rutas de las líneas 9, 10, 11 y 12 con las ubicaciones reales en tu computadora (Tip: Puedes copiar la ruta haciendo clic derecho sobre la carpeta en el Explorador de Windows y seleccionando "Copiar como ruta").
4. Guarda el archivo con el nombre **`copiar_a_astro.bat`**. Al guardar, asegúrate de cambiar la opción *Tipo* de "Documentos de texto (*.txt)" a **"Todos los archivos (*.*)"**.

```batch
@echo off
title Sincronizador Obsidian a Astro
echo ===================================================
echo   Sincronizando Blog de Obsidian a Proyecto Astro  
echo ===================================================

:: --- CONFIGURA TUS RUTAS REALES ACÁ ---
set "OBSIDIAN_POSTS=C:\Ruta\A\Tu\Vault\articulos-blog"
set "OBSIDIAN_IMG=C:\Ruta\A\Tu\Vault\imagenes-blog"
set "ASTRO_POSTS=C:\Ruta\A\Tu\Proyecto-Astro\src\content\blog"
set "ASTRO_PUBLIC_IMG=C:\Ruta\A\Tu\Proyecto-Astro\public\images\posts"
:: --------------------------------------

echo 1. Copiando articulos (.md)...
xcopy "%OBSIDIAN_POSTS%\*.md" "%ASTRO_POSTS%\" /D /Y /I

echo 2. Copiando imagenes...
xcopy "%OBSIDIAN_IMG%\*" "%ASTRO_PUBLIC_IMG%\" /D /Y /I

echo ===================================================
echo   ¡Sincronización completada con éxito!            
echo ===================================================
pause
```

### 🤔 ¿Qué ventajas tiene este script?
* Usa el comando `xcopy` con el parámetro `/D`, lo que significa que **solo copiará los archivos nuevos o modificados**. No perderás tiempo duplicando lo que ya estaba subido.
* El parámetro `/Y` suprime la confirmación de reemplazo, haciendo todo el proceso transparente y ultra rápido.

---
*¡Listo! Ya tenés un entorno Markdown completamente integrado y automatizado para tu blog.*
