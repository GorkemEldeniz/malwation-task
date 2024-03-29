# Malwation Frontend Internship Case Study

## Kullanılan Teknolojiler
  1. Server Tarafında
      * Typescript
      * prisma
      * bcrypt
      * cors
      * dotenv
      * express
      * nodemon,eslint,prettier (as Developer dependencies)
  2. Client Tarafında
      * Typescript
      * React
      * Reduxjs/toolkit      
      * Formik
      * React-redux
      * yup
      * eslint,prettier (as Developer dependencies)
      * css module

## Proje Görselleri
  1. Login Page
    ![Login Page](images/login.png)
---    
  2. Register Page
    ![Register Page](images/register.png)  
---
  3. Users Table
    ![Users](images/table.png)
---
  4. Update User Page
    ![Update User](images/update.png)     
---    
## Proje Kurulumu

  1. Projeyi Klonlama
  ```bash
    git clone https://github.com/GorkemEldeniz/malwation-task
  ```
  2. Serverı ayağa kaldırma
      * Server dosyasına erişim
        ```bash
          cd server
        ``` 
      * Server bağımlılıklarını indirmede pnpm kullanıyorsanız
        ```bash
          pnpm install           
          ```
      * Server bağımlılıklarını indirmede npm kullanıyorsanız               
        ```bash
          npm install           
        ```
      * Prismayı etkinleştirme
        ```bash
          npx prisma generate
        ```
      * Serverı çalıştırma localhost:3000 portunda çalışmakta
        ```bash
          npm start
        ```
  3. Client tarafını ayağa kaldırma

      * Client dosyasına erişim
        ```bash
          cd client
        ``` 
      * Client bağımlılıklarını indirmede pnpm kullanıyorsanız
        ```bash
          pnpm install           
        ```
      * Client bağımlılıklarını indirmede npm kullanıyorsanız               
        ```bash
          npm install           
        ```                          
      * Serverı çalıştırma localhost:5000 portunda çalışmakta
        ```bash
          npm run dev        
        ```