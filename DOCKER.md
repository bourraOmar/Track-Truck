# Track-Truck - Guide Docker

## Déploiement avec Docker et Docker Compose

Cette documentation explique comment containeriser et déployer l'application TrackTruck avec Docker.

---

## 1. Architecture Docker

L'application est composée de 3 services :

```
┌─────────────────────────────────────────────────┐
│           Réseau: tracktruck-network             │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────────────┐  ┌──────────────────┐    │
│  │   Frontend       │  │    Backend       │    │
│  │  (React/Nginx)   │──│  (Node/Express)  │    │
│  │     Port 80      │  │     Port 5000    │    │
│  └──────────────────┘  └──────────────────┘    │
│           │                       │              │
│           └───────────┬───────────┘              │
│                       │                          │
│         ┌─────────────▼─────────────┐           │
│         │   MongoDB                 │           │
│         │   (Base de données)       │           │
│         │   Port 27017              │           │
│         └───────────────────────────┘           │
│                                                  │
└─────────────────────────────────────────────────┘
```

### Services

1. **Frontend** : Application React servie par Nginx
   - Image : Construite à partir du `Dockerfile` du frontend
   - Port : `80` (accessible via `http://localhost`)
   - Communique avec le backend via le réseau Docker

2. **Backend** : API Node.js/Express
   - Image : Construite à partir du `Dockerfile` du backend
   - Port : `5000`
   - Connecté à MongoDB via le nom de service `mongodb:27017`

3. **MongoDB** : Base de données
   - Image : `mongo:7.0-alpine`
   - Port : `27017`
   - Volumes pour la persistance des données

---

## 2. Installation et Démarrage

### Prérequis
- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)

### Étapes

1. Clonez ou naviguez vers le répertoire du projet :
   ```bash
   cd TrackTruck
   ```

2. Créez un fichier `.env` dans le dossier `backend` (si absent) :
   ```bash
   echo "PORT=5000" >> backend/.env
   echo "MONGO_URI=mongodb://mongodb:27017/tracktruck" >> backend/.env
   echo "JWT_SECRET=your_secret_key_change_in_production" >> backend/.env
   ```

3. Démarrez les conteneurs :
   ```bash
   docker-compose up -d
   ```

4. Vérifiez que les services sont actifs :
   ```bash
   docker-compose ps
   ```

   Résultat attendu :
   ```
   NAME                     COMMAND                  SERVICE      STATUS
   tracktruck-backend       npm start                backend       Up
   tracktruck-frontend      nginx -g daemon off      frontend      Up
   tracktruck-mongodb       mongod                   mongodb       Up
   ```

5. Accédez à l'application :
   - **Frontend** : http://localhost
   - **Backend API** : http://localhost/api
   - **MongoDB** : localhost:27017

---

## 3. Commandes Docker Compose

### Démarrage
```bash
# Démarrer tous les services
docker-compose up -d

# Démarrer avec logs en direct
docker-compose up
```

### Arrêt
```bash
# Arrêter tous les services
docker-compose down

# Arrêter et supprimer les volumes
docker-compose down -v
```

### Logs
```bash
# Voir les logs de tous les services
docker-compose logs -f

# Voir les logs d'un service spécifique
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Reconstruction des images
```bash
# Reconstruire les images
docker-compose build

# Démarrer après la reconstruction
docker-compose up -d
```

### Exécuter des commandes dans un conteneur
```bash
# Accéder au shell du backend
docker-compose exec backend sh

# Accéder au shell de MongoDB
docker-compose exec mongodb mongosh
```

---

## 4. Variables d'Environnement

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://mongodb:27017/tracktruck
JWT_SECRET=your_secure_secret_key_here
```

### Docker Compose (docker-compose.yml)
Les variables d'environnement peuvent être définies dans le fichier `docker-compose.yml` ou via un fichier `.env` à la racine du projet.

---

## 5. Volumes et Persistance des Données

### Volumes définis
- `mongodb_data` : Données de la base de données MongoDB
- `mongodb_config` : Configuration MongoDB

### Vérifier les volumes
```bash
docker volume ls
docker volume inspect tracktruck_mongodb_data
```

### Nettoyer les volumes (attention : supprime les données)
```bash
docker-compose down -v
```

---

## 6. Configuration Nginx (Frontend)

Le fichier `nginx.conf` configure :
- **Proxy inverse** : Route les requêtes `/api/*` vers le backend
- **SPA Routing** : Gère le routage React (try_files)
- **Cache** : Optimise le cache des assets statiques
- **CORS** : Gestion des headers de sécurité

---

## 7. Troubleshooting

### Erreur : "Cannot connect to backend"
**Solution** : Assurez-vous que l'URL du backend dans le frontend utilise le nom du service Docker (`http://backend:5000`), pas `localhost`.

### Erreur : "MongoDB connection error"
**Solution** : Vérifiez que le service MongoDB est actif :
```bash
docker-compose logs mongodb
```

### Erreur : "Port 80 already in use"
**Solution** : Changez le port dans `docker-compose.yml` :
```yaml
frontend:
  ports:
    - "8080:80"  # Accès via http://localhost:8080
```

### Effacer les caches et redémarrer
```bash
docker-compose down
docker system prune -a
docker-compose up --build -d
```

---

## 8. Déploiement en Production

Pour un déploiement en production :

1. **Activez HTTPS** : Utilisez un reverse proxy (Traefik, Nginx externe) avec Let's Encrypt
2. **Sécurité** : Changez les variables d'environnement (JWT_SECRET, etc.)
3. **Scalabilité** : Utilisez Kubernetes ou un service de cloud (Docker Swarm, ECS, etc.)
4. **Monitoring** : Intégrez Prometheus, Grafana pour le monitoring
5. **Logs** : Configurez une agrégation des logs (ELK, Loki, etc.)

---

## 9. Notes Importants

- Les Dockerfiles utilisent des images Alpine pour réduire la taille
- Le frontend utilise une compilation multi-étapes pour optimiser la taille de l'image
- MongoDB utilise un volume nommé pour la persistance des données
- Le réseau personnalisé `tracktruck-network` permet la communication inter-conteneurs
- En développement, vous pouvez modifier le code et les changements seront visibles après un redémarrage du conteneur

