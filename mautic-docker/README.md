# Mautic Local - Thames Sites

Instalación de Mautic en tu PC usando Docker para pruebas.

## 🚀 Inicio Rápido

### 1. Requisitos previos
- Tener Docker Desktop instalado (https://www.docker.com/products/docker-desktop/)
- Git (opcional, para clonar)

### 2. Levantar Mautic

```bash
cd mautic-docker
docker-compose up -d
```

Esto descarga e instala:
- Mautic v5 (última versión estable)
- MySQL 8.0 (base de datos)
- Todo configurado y listo para usar

### 3. Acceder a Mautic

Esperar ~2-3 minutos a que inicie (la primera vez tarda más).

Luego abrir en el navegador:
```
http://localhost:8080
```

### 4. Configuración inicial

La primera vez que entres, te pedirá:

**Base de datos (ya está configurada):**
- Driver: MySQL PDO
- Host: mautic-db
- Port: 3306
- Database: mautic
- User: mautic
- Password: mautic_password

**Admin de Mautic:**
- Username: `admin`
- Password: (elegí uno seguro)
- Email: `claudio@thamesites.store`

**SMTP (para pruebas locales):**
Para testear sin mandar mails reales, usá MailHog (incluido) o dejalo en "PHP Mail" para pruebas.

### 5. Comandos útiles

```bash
# Ver logs
docker-compose logs -f mautic

# Parar Mautic
docker-compose down

# Parar y borrar todo (datos incluidos)
docker-compose down -v

# Backup de datos
docker-compose exec mautic-db mysqldump -u mautic -pmautic_password mautic > backup.sql
```

## ⚠️ Limitaciones de localhost

Como dijimos antes, desde tu PC no podés mandar mails que lleguen bien a Gmail/Outlook porque:
1. Tu IP residencial está en listas negras
2. No tenés SPF/DKIM configurados

**Para testear mails localmente:**
- MailHog captura todos los mails localmente
- Accedés a http://localhost:8025 para ver los mails "enviados"

## 📝 Próximos pasos

Cuando quieras mandar mails de verdad:
1. Comprar VPS ($6/mes en DigitalOcean/Vultr)
2. Migrar este mismo Docker Compose al servidor
3. Configurar SMTP con thamesites.store
4. Empezar a prospectar en serio

## 🔧 Configuración de Claudio (mi integración)

Una vez Mautic esté corriendo, necesito:
1. URL: http://localhost:8080 (o el dominio cuando migres)
2. Usuario: admin
3. Password: (el que elijas)
4. API Key: (la generás en Configuración > API)

Con eso me conecto y automatizo los envíos.

---
Cualquier duda, avisame.
