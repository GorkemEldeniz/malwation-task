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
      * Server bağımlılıklarını indirme pnpm kullanıyorsanız
        ```bash
          pnpm install           
          ```
      * Server bağımlılıklarını indirme npm kullanıyorsanız               
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
      * Client bağımlılıklarını indirme pnpm kullanıyorsanız
        ```bash
          pnpm install           
        ```
      * Client bağımlılıklarını indirme npm kullanıyorsanız               
        ```bash
          npm install           
        ```                          
      * Serverı çalıştırma localhost:5000 portunda çalışmakta
        ```bash
          npm run dev        
        ```