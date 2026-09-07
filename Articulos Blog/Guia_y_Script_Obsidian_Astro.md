# 🚀 Pack de Automatización: Obsidian + Astro

Este documento contiene la plantilla optimizada, la configuración visual y el script `.bat` para Windows que copia tus artículos e imágenes con un solo doble clic.

---

## 1. La Plantilla de Obsidian (`Plantilla de Poema/Artículo`)
Copiá este código exacto dentro de tu nota de plantilla en Obsidian:

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

### Configuración visual en Obsidian:
* **`tags`**: Cambialo a tipo **Lista (List)** en la interfaz de Obsidian.
* **`popular`**: Cambialo a tipo **Casilla de verificación (Checkbox)**.
* **`pubDate`**: Cambialo a tipo **Fecha (Date)** (Asegúrate de que en *Configuración > Templates > Date format* esté como `YYYY-MM-DD`).

---

## 2. Configuración de Carpetas
Para que el script funcione, mantendremos esta estructura en tu bóveda de Obsidian:
* Creá una carpeta llamada `articulos-blog` (donde escribirás tus posts).
* Creá una carpeta llamada `imagenes-blog` (donde se guardarán tus imágenes automáticamente al arrastrarlas).

*Recordá ir a Configuración > Archivos y enlaces > Ubicación predeterminada para nuevos archivos adjuntos y seleccionar la carpeta `imagenes-blog`.*

---

## 3. Script Automatizado para Windows (`copiar_a_astro.bat`)

Copiá el código de abajo, abrí el **Bloc de notas** de Windows, pegalo y guardá el archivo con el nombre **`copiar_a_astro.bat`** (asegurate de cambiar el tipo de archivo a "Todos los archivos" al guardar para que no quede como `.txt`).

> ⚠️ **IMPORTANTE**: Antes de ejecutarlo, cambiá las rutas de las líneas 5, 6 y 7 por las rutas reales de tu computadora.

```batch
@echo off
title Sincronizador Obsidian a Astro
echo ===================================================
echo   Sincronizando Blog de Obsidian a Proyecto Astro  
echo ===================================================

:: --- CONFIGURA TUS RUTAS ACÁ ---
set "OBSIDIAN_POSTS=C:\Ruta\A\Tu\Vault\articulos-blog"
set "OBSIDIAN_IMG=C:\Ruta\A\Tu\Vault\imagenes-blog"
set "ASTRO_POSTS=C:\Ruta\A\Tu\Proyecto-Astro\src\content\blog"
set "ASTRO_PUBLIC_IMG=C:\Ruta\A\Tu\Proyecto-Astro\public\images\posts"
:: -------------------------------

echo 1. Copiando articulos (.md)...
xcopy "%OBSIDIAN_POSTS%\*.md" "%ASTRO_POSTS%\" /D /Y /I

echo 2. Copiando imagenes...
xcopy "%OBSIDIAN_IMG%\*" "%ASTRO_PUBLIC_IMG%\" /D /Y /I

echo ===================================================
echo   ¡Sincronización completada con éxito!            
echo ===================================================
pause
```

### ¿Qué hace este script?
* `/D`: Solo copia los archivos nuevos o que hayan sido modificados recientemente (no vuelve a copiar todo desde cero).
* `/Y`: Ocurre de forma silenciosa reemplazando los archivos viejos en Astro sin preguntarte uno por uno.
