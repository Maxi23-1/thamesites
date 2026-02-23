#!/bin/bash

echo "🚀 Iniciando Mautic para Thames Sites..."
echo ""

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado."
    echo "Descargalo de: https://www.docker.com/products/docker-desktop/"
    exit 1
fi

# Verificar si docker-compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado."
    echo "Instalalo o actualizá Docker Desktop."
    exit 1
fi

echo "✅ Docker encontrado"
echo "📦 Descargando e iniciando Mautic..."
echo "(Esto puede tardar unos minutos la primera vez)"
echo ""

docker-compose up -d

echo ""
echo "⏳ Esperando a que MySQL esté listo..."
sleep 10

echo ""
echo "✅ Mautic está iniciando!"
echo ""
echo "🌐 Accedé a: http://localhost:8080"
echo ""
echo "⏱️  Esperá 2-3 minutos a que termine de configurarse."
echo ""
echo "📖 Ver README.md para más instrucciones."
echo ""

# Mostrar estado
docker-compose ps
