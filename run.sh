#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------
info()  { echo -e "${CYAN}[INFO]${NC}  $*"; }
success() { echo -e "${GREEN}[OK]${NC}    $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error() { echo -e "${RED}[ERROR]${NC} $*"; exit 1; }

# ---------------------------------------------------------------------------
# Check prerequisites
# ---------------------------------------------------------------------------
check_prerequisites() {
  info "Checking prerequisites..."

  if ! command -v docker &>/dev/null; then
    error "Docker is not installed. Please install Docker Desktop: https://www.docker.com/products/docker-desktop"
  fi

  if ! docker info &>/dev/null; then
    error "Docker is not running. Please start Docker Desktop and try again."
  fi

  if ! docker compose version &>/dev/null; then
    error "Docker Compose is not available. Ensure Docker Desktop is up to date."
  fi

  success "Docker and Docker Compose are ready."
}

# ---------------------------------------------------------------------------
# Ensure .env file exists
# ---------------------------------------------------------------------------
ensure_env() {
  if [ ! -f .env ]; then
    warn ".env file not found. Copying from .env.example ..."
    cp .env.example .env
    success ".env file created. Edit it with your preferred values."
  else
    success ".env file found."
  fi
}

# ---------------------------------------------------------------------------
# Build & start everything
# ---------------------------------------------------------------------------
start() {
  info "Starting the Taxi Backend with Docker Compose..."
  docker compose up -d

  info "Waiting for PostgreSQL to be healthy..."
  docker compose ps | grep postgres || true

  success "Services started. Use the following commands:"
  echo -e "  ${CYAN}docker compose logs -f app${NC}      # View app logs"
  echo -e "  ${CYAN}docker compose logs -f postgres${NC} # View DB logs"
  echo -e "  ${CYAN}docker compose logs -f redis${NC}    # View Redis logs"
  echo ""
  echo -e "  ${CYAN}docker compose exec app npm run start:dev${NC}  # Run app in dev mode"
  echo -e "  ${CYAN}docker compose exec app npm run migration:run${NC}  # Run migrations"
  echo ""
  info "Application URL:   http://localhost:${PORT:-3000}"
  info "PostgreSQL URL:    postgresql://${DB_USERNAME:-postgres}:${DB_PASSWORD:-2521}@localhost:${DB_PORT:-5432}/${DB_DATABASE:-taxi_backend}"
  info "Redis URL:         redis://localhost:${REDIS_PORT:-6379}"
}

# ---------------------------------------------------------------------------
# Stop services
# ---------------------------------------------------------------------------
stop() {
  info "Stopping services..."
  docker compose down
  success "All services stopped."
}

# ---------------------------------------------------------------------------
# Reset (stop + remove volumes — use when switching DB images or clearing data)
# ---------------------------------------------------------------------------
reset() {
  info "Stopping services and removing all data volumes..."
  warn "This will permanently delete all database and Redis data!"
  docker compose down -v
  success "All services and volumes removed. Run './run.sh start' to begin fresh."
}

# ---------------------------------------------------------------------------
# Restart services
# ---------------------------------------------------------------------------
restart() {
  stop
  start
}

# ---------------------------------------------------------------------------
# Show logs
# ---------------------------------------------------------------------------
logs() {
  local service="${1:-all}"
  if [ "$service" = "all" ]; then
    docker compose logs -f
  else
    docker compose logs -f "$service"
  fi
}

# ---------------------------------------------------------------------------
# Run migrations
# ---------------------------------------------------------------------------
migrate() {
  info "Running TypeORM migrations..."
  docker compose exec app npm run migration:run
}

# ---------------------------------------------------------------------------
# Run the app in dev/watch mode inside the container
# ---------------------------------------------------------------------------
dev() {
  info "Starting app in development mode (watch)..."
  docker compose up app
}

# ---------------------------------------------------------------------------
# Usage
# ---------------------------------------------------------------------------
usage() {
  echo ""
  echo -e "${CYAN}Taxi Backend — Docker Startup Script${NC}"
  echo ""
  echo "  ./run.sh start      Start all services (PostgreSQL+PostGIS, Redis, App)"
  echo "  ./run.sh stop       Stop all services"
  echo "  ./run.sh restart    Restart all services"
  echo "  ./run.sh reset      Stop and delete all data volumes (use when switching DB images)"
  echo "  ./run.sh logs [s]   Show logs (all or a specific service)"
  echo "  ./run.sh migrate    Run database migrations"
  echo "  ./run.sh dev        Run app in dev/watch mode inside container"
  echo ""
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
case "${1:-start}" in
  start)
    check_prerequisites
    ensure_env
    start
    ;;
  stop)
    stop
    ;;
  restart)
    check_prerequisites
    ensure_env
    restart
    ;;
  logs)
    logs "${2:-all}"
    ;;
  migrate)
    check_prerequisites
    ensure_env
    migrate
    ;;
  dev)
    check_prerequisites
    ensure_env
    dev
    ;;
  reset)
    check_prerequisites
    reset
    ;;
  help|--help|-h)
    usage
    ;;
  *)
    warn "Unknown command: $1"
    usage
    exit 1
    ;;
esac
