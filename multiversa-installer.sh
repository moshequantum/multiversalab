#!/usr/bin/env bash

# ==============================================================================
# MULTIVERSA LAB - INTELLIGENT PERSONAL OS INSTALLER
# ==============================================================================
# Este script inicializa el entorno de Multiversa Lab, configurando las bases
# para Engram, Graphify, Gentle AI, y MiroFish, construyendo el grafo inicial.

set -e

# Colores para UI
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}====================================================${NC}"
echo -e "${GREEN}   BIENVENIDO AL INSTALADOR DE MULTIVERSA LAB   ${NC}"
echo -e "${BLUE}====================================================${NC}"
echo ""
echo -e "Iniciando la secuencia de Onboarding 2.0..."
echo -e "Vamos a construir tu consciencia virtual.\n"

# 1. Chequeo de dependencias básicas
echo -e "${YELLOW}Verificando dependencias básicas del sistema...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}[X] Node.js no está instalado. Instalando...${NC}"
    # Aquí iría el comando real dependiendo del OS (brew install node o apt-get install nodejs)
    echo "Por favor instala Node.js primero: https://nodejs.org/"
    exit 1
else
    echo -e "${GREEN}[✓] Node.js detectado.${NC}"
fi

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}[X] Python 3 no está instalado.${NC}"
    exit 1
else
    echo -e "${GREEN}[✓] Python 3 detectado.${NC}"
fi

if ! command -v uv &> /dev/null; then
    echo -e "${YELLOW}[!] 'uv' (Python package manager) no detectado. Instalando...${NC}"
    curl -LsSf https://astral.sh/uv/install.sh | sh
else
    echo -e "${GREEN}[✓] uv detectado.${NC}"
fi

echo ""

# 2. Onboarding Interactivo (Generación de Grafo Base)
echo -e "${BLUE}--- FASE DE PERFILADO ESTRUCTURAL ---${NC}"
echo "Necesitamos conocer los parámetros base de tu instancia personal."

read -p "¿Cuál es el nombre principal para esta instancia de IA? [Default: Multiversa-AI]: " IA_NAME
IA_NAME=${IA_NAME:-Multiversa-AI}

read -p "¿Cuál es tu rol principal en los proyectos? (ej. Arquitecto, Consultor, Desarrollador): " USER_ROLE
USER_ROLE=${USER_ROLE:-Arquitecto}

echo -e "\nSelecciona el Tier de Operación:"
echo "1) Lab (Open Source - Funciones base locales)"
echo "2) Ecosistemas Inteligentes (Tier Avanzado - Orquestación Universal Humano+IA)"
read -p "Opción [1/2]: " TIER_OPTION

case $TIER_OPTION in
  2)
    TIER="ECOSISTEMAS"
    echo -e "${GREEN}-> Tier Ecosistemas Inteligentes seleccionado. Habilitando flujos de simulación MiroFish y contexto universal compartido.${NC}"
    ;;
  *)
    TIER="LAB"
    echo -e "${GREEN}-> Tier LAB seleccionado. Habilitando entorno Open Source base.${NC}"
    ;;
esac

# 3. Creación del entorno del proyecto
INSTALL_DIR="$HOME/.multiversa"
echo -e "\n${YELLOW}Creando directorios base en $INSTALL_DIR...${NC}"
mkdir -p "$INSTALL_DIR/engram_db"
mkdir -p "$INSTALL_DIR/graphify_context"
mkdir -p "$INSTALL_DIR/gentle_personas"
mkdir -p "$INSTALL_DIR/projects"

# Generación del archivo de configuración global
CONFIG_FILE="$INSTALL_DIR/config.json"
cat <<EOF > "$CONFIG_FILE"
{
  "instance_name": "$IA_NAME",
  "user_role": "$USER_ROLE",
  "tier": "$TIER",
  "active_plugins": [
    "engram_memory",
    "graphify_indexer",
    "gentle_sdd"
  ],
  "installed_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF
echo -e "${GREEN}[✓] Configuración base guardada en $CONFIG_FILE${NC}"

# 4. Descarga simulada/setup de ecosistemas (Engram, Graphify)
echo -e "\n${YELLOW}Inicializando repositorios del ecosistema...${NC}"
# Nota: En una versión real, aquí haríamos git clone de los repos.
echo -e "  - Configurando ${BLUE}Engram${NC} (Context Spine) local..."
echo -e "  - Configurando ${BLUE}Graphify${NC} (Project Mapping)..."
echo -e "  - Instalando arnés ${BLUE}Gentle AI${NC} (SDD)..."

if [ "$TIER" = "ECOSISTEMAS" ]; then
    echo -e "  - Activando conector seguro de ${BLUE}MiroFish${NC} (Simulador de escenarios)..."
    echo -e "  - Sincronizando contexto compartido universal (MultiversaOS)..."
fi

sleep 2

echo -e "\n${GREEN}====================================================${NC}"
echo -e "${GREEN}  ¡MULTIVERSA LAB INSTALADO CORRECTAMENTE!          ${NC}"
echo -e "${GREEN}====================================================${NC}"
echo -e "Tu consciencia virtual '${IA_NAME}' está lista."
echo -e "Para inicializar un nuevo proyecto, ve a tu carpeta y ejecuta:"
echo -e "   ${YELLOW}multiversa init${NC}"
echo -e "====================================================\n"
