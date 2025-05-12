# App-simple-CRUD-E-Commerce

# Install dependencies
cd frontend
npm install

# Install Material UI packages
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material

# Run development server
npm run dev


cd backend
# Install PHP dependencies
composer install

# Create a copy of the .env file
cp .env.example .env

# Generate app encryption key
php artisan key:generate

# Nếu có dùng database:
php artisan migrate       # Chạy các migration
php artisan serve         # Chạy server backend
