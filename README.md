# App-simple-CRUD-E-Commerce
cd frontend
npm install        # Cài lại node_modules
npm run dev        # Chạy development server


cd backend
composer install          # Cài lại vendor

cp .env.example .env      # Tạo file cấu hình .env (nếu chưa có)
php artisan key:generate  # Tạo app key

# Nếu có dùng database:
php artisan migrate       # Chạy các migration
php artisan serve         # Chạy server backend
