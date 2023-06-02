## Malwation Task

  Kullanıcılar tablosuna erişebilen onlarda CRUD operasyonları yapabilen bir site geliştirmek.
  Email password ile giriş yapma
  Kullanıcılar tablosu su şekilde olmalı
    name, email, phone number, role, and account status

  Bir kullanıcının üzerine tıklandıgında ona özel sayfa yönlendirilmeli ve orada update işlemleri yapılmalı

### Login Page

    The login page presents a form where users can enter their email and password. These are the mandatory details required to log into the system.
    
    **Form Fields**
    
    - Email: The email address that the user registered with.
    - Password: The secure password set by the user.
    
    **Functionality**
    
    - Upon correct filling of the email and password fields, clicking on the "Log In" button allows access to the system.
    - If the email or password fields are filled incorrectly, an error message is shown to the user and they are asked to fill out the form again.  


- **User List Page**
    
    The user list displays all the registered users in the system. This list is fetched from the 'Users' table, showing details like each user's name, email address, phone number, role, and account status. Users can also be deleted from this page.
    
    **Functionality**
    
    - Each user entry has a "Delete" button. Upon clicking this button, the corresponding user is deleted from the database.
    - Hovering over a row reveals a link to view more details about the user. This page allows viewing and updating the user's information.

- **User Update Page**
    
    The User Update Page displays all the details of the selected user. Information such as the user's name, email address, phone number, role, and account status can be viewed and updated on this page.
    
    **Functionality**
    
    - Basic information such as the user's name, email address, and phone number can be updated here.
    - The user's role can be changed to "admin" or "user".
    - The user's account status can be toggled between "active" and "inactive".

### Technologies

- Basic knowledge of Redux or Zustand
- Familiarity with Tailwind CSS
- Understanding of React and React Router
- Familiarity with Zod or Yup for schema validation
- Knowledge of TypeScript
- Experience with React Hook Form   


[] Md files yapılacak nasıl ayaga kaldırılacak proje vs anlatılacak