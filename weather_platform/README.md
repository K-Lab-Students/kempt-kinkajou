<div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">  
  <img style="border-radius: 1em; align-self: center;" src="https://git.djft.ru/avatars/9f5343fc9d97fdb7f08afabf3c472334?size=420" width="45">  
  <h1 style="text-align: center; margin-left: 10px; margin-top: 2px;">K-Lab | Cyber Garden Weather</h1>  
</div>  



<div style="display: flex; align-items: center; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">  
  <span style="font-size: 20px; margin-right: 10px;">✨</span>  
  <span style="font-size: 16px;">  
  Processing Platform monorepo  
  </span>  
</div>  


## Описание
https://www.notion.so/sorrythisdomainisnotavailable/CyberGarden-k-Lab-docs-01392e46510e4d5c80c0a198c037d768?pvs=4



## Сервисы
- [frontend (ReactJS)](/apps/crud)
- [frontend e2e](/apps/crud-e2e)

## Dev
### Backend
#### Prisma Types
```bash  
nx g prisma-generator
```  
  
### Frontend  
#### Create a new Layout  
```bash  
nx g @nx/react:component NAME --project site-layouts
```  
#### Create a new Page  
```bash  
nx g @nx/react:component NAME --project site-pages
```  
#### Create a new Component  
Like navbar, footer, login card, delete modal alert and et.  
```bash  
nx g @nx/react:component NAME --project ui-modules
```  
#### Create a new UI Component  
Like nav_link, cta_button, username_input and et.  
```bash  
nx g @nx/react:component NAME --project ui
```  
  
  
## Развертывание  
  
To start the development server run `nx serve frontend`. Open your browser and navigate to http://localhost:4200/. Happy coding!  
```bash  
npm i -g prisma nx
```  
  
```bash  
yarn install
```  
  
```bash  
copy .env.example .env
```  
  
```bash  
docker-compose up -d
```
  
Run all services:  
```bash  
nx run-many --parallel --target=serve --projects=crud,agw,agregators-service,measures-service,sensors-service
```   

```bash  
nx run py-tg-bot-weather-agent:serve
```   


## Структура репозитория
Репозиторий содержит следующие основные каталоги и файлы:
- `apps` - приложения
- `libs` - библиотеки и генераторы
- `tools` - Nx workspaces tools
- `docs` - документация


## Коммиты
Используемые префиксы:
- **feat:** (от "feature") - новая функциональность или добавление нового компонента.
- **fix:** - исправление ошибок или дефектов.
- **docs:** - изменения, связанные с документацией, например, обновление README или документации в коде.
- **style:** - изменения внешнего вида кода, форматирование, пробелы, отступы и т.д., которые не влияют на его поведение.
- **refactor:** - рефакторинг кода без исправления ошибок или добавления новых функций.
- **test:** - добавление или исправление тестов.
- **chore:** - изменения в сборочных скриптах, настройках инструментов, обновление зависимостей и т.д.
- **perf:** - изменения, связанные с оптимизацией производительности.
- **revert:** - отмена предыдущего коммита.
- **merge:** - коммит, созданный при слиянии веток.
- **release:** - коммит, связанный с выпуском новой версии.
- **require:** - коммит, связанный с установкой новой библиотеки
---  
# Any NX comands log
- npx create-nx-workspace@latest --preset=react
- npm install -D @nrwl/nest
- nx g @nrwl/nest:app agw --frontendProject crud
- nx g @nx/react:setup-tailwind --project=crud
- nx g @nx/react:lib ui
- nx g @nx/react:component navbar --project ui
- nx run-many --parallel --target=serve --projects=agw,auth,crud
### Creating Prisma generator tool
- nx g plugin
- prisma-generator
- nx generate @nx/plugin:generator prisma-generator --project=prisma-generator
#### Run
- nx generate prisma-generator
#### Migrations
- prisma db push --schema="./libs/prisma-clients/Agregators/prisma/schema.prisma"
- prisma generate --schema="./libs/prisma-clients/Agregators/prisma/schema.prisma"
- prisma db push --schema="./libs/prisma-clients/Measures/prisma/schema.prisma"
- prisma generate --schema="./libs/prisma-clients/Measures/prisma/schema.prisma"
- prisma db push --schema="./libs/prisma-clients/Sensors/prisma/schema.prisma"
- prisma generate --schema="./libs/prisma-clients/Sensors/prisma/schema.prisma"
### Crud Pages
- nx generate @nrwl/react:lib site-pages --template=typescript
- nx g @nx/react:component NAME --project site-pages
- nx build site-pages
### Crud Layout
- nx generate @nrwl/react:lib site-layouts --template=typescript
- nx g @nx/react:component NAME --project site-layouts
